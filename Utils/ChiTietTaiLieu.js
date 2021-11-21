const WEB_API = "https://api.scse-vietnam.org/";
// window.addEventListener('load', getBySlug)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
async function getBySlug(numb) {
    if (numb == 1) {
        getTaiLieu()
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Interface/GetBySlugDocument?slug=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    const { ID, Title, CreatedByDate, Slug, Details } = response
                        return `
                                                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                                                <p>${convertDate(CreatedByDate)}</p>
                                            <section>
                                                <div>${Details}</div>
                                            </section>
                                        `;
                    
                })
                // đây là hàm trả ra tbody
                $('#tbody').html(html);
                $(".loader-wrapper").fadeOut("slow");
            })
        function getTaiLieu() {
            fetch(WEB_API + "Interface/ListDocument")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const tron = response.sort(() => 0.5 - Math.random())
                    let random = tron.slice(0, 2)
                    var html = random.map(function (response) {
                        const { ID, Title, Slug, Details, CreatedByDate } = response
                            return `
                                <div class="col-md-6 d-flex align-items-stretch">
                                    <div
                                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                        <div class="col-auto d-none d-lg-block">
                                            </br></br>
                                            <a class="m-auto" href="../Chi-Tiet-Bai-Viet/tailieu.html?slug=${Slug}">Continue reading</a>
                                        </div>
                                        <div class="col p-4 d-flex flex-column position-static">
                                            <a href="../Chi-Tiet-Bai-Viet/tailieu.html?slug=${Slug}">
                                            <h3 class="mb-0">${Title}</h3>
                                            </a>
                                            <div class="mb-1 text-muted">${convertDate(CreatedByDate)}</div>
                                            <p class="mb-auto">${Details.slice(0, 300) + "..."}</p>
                                        </div>
                                    </div>
                                </div> `;
                    })
                    // đây là hàm trả ra tbody
                    $('#content').html(html);

                })
        }
    }
    else {
        getTaiLieuEN()
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Interface/GetBySlugDocumentEN?slugen=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    const { IDEN, Title, CreatedByDate, Details } = response
                        return `
                                                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                                                <p>${CreatedByDate}</p>
                                            <section>
                                                <div>${Details}</div>
                                            </section>
                                        `;
                })
                // đây là hàm trả ra tbody
                $('#tbody').html(html);
                $(".loader-wrapper").fadeOut("slow");
            })
        function getTaiLieuEN() {
            fetch(WEB_API + "Interface/ListDocumentEN")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const tron = response.sort(() => 0.5 - Math.random())
                    let random = tron.slice(0, 2)
                    var html = random.map(function (response) {
                        const { IDEN, Title, SlugEN, Details } = response
                            return `
                    <div class="col-md-6 d-flex align-items-stretch">
                        <div
                            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col-auto d-none d-lg-block">
                                <a href="../Chi-Tiet-Bai-Viet/tailieu.html?slug=${SlugEN}">Continue reading</a>
                            </div>
                            <div class="col p-4 d-flex flex-column position-static">
                                <h3 class="mb-0">${Title}</h3>
                                <p class="mb-auto">${Details.slice(0, 200)}</p>
                            </div>

                        </div>
                    </div> `;
                    })
                    // đây là hàm trả ra tbody
                    $('#content').html(html);

                })
        }
    }
}
function getslug(numb) {
    if (numb == 1) {
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Interface/GetBySlugDocumentEN?slugen=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                fetch(WEB_API + "Interface/GetByIDDocument?ID=" + response[0].IDEN)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        window.location.href = "../Chi-Tiet-Bai-Viet/tailieu.html?slug=" + response.Slug
                    })
            })
    }
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Interface/GetBySlugDocument?slug=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                fetch(WEB_API + "Interface/GetByIDDocumentEN?IDEN=" + response[0].ID)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        if (response === null) {
                            alert("Tài liệu chưa có bản tiếng anh!")
                            window.location.href = "../Chi-Tiet-Bai-Viet/"
                        }
                        window.location.href = "../Chi-Tiet-Bai-Viet/tailieu.html?slug=" + response.SlugEN
                    })
            })

    }

}