const WEB_API = "https://api.scse-vietnam.org/API/";
// window.addEventListener('load', getBySlug)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
async function getBySlug(numb) {
    if (numb == 1) {
        getBaiViet()
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Management/GetBySlugNewsVN?slug=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                const { Title, Slug, CreatedByDate, Details, Image, IDState } = response
                if (IDState === 2) {
                    $('#tbody').html(`
                    <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                    <p>${convertDate(CreatedByDate)}<p>
                <section>
                    <div>${Details}</div>
                </section>
            `)
                }
                else {
                    alert("Bài viết chưa có bản tiếng anh!")
                }
            })
        // đây là hàm trả ra tbody
        function getBaiViet() {
            fetch(WEB_API + "Management/ShowAllNewsVN")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const tron = response.sort(() => 0.5 - Math.random())
                    let random = tron.slice(0, 2)
                    var html = random.map(function (response) {
                        const { Title, Slug, Details, Image, IDState } = response
                        if (IDState === 2) {
                            return `
                                <div class="col-md-6">
                                    <div
                                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                        <div class="col-auto d-none d-lg-block">
                                            <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                                        </div>
                                        <div class="col p-4 d-flex flex-column position-static">
                                            <a href="../Chi-Tiet/index.html?slug=${Slug}">
                                            <h3 class="mb-0">${Title}</h3>
                                            </a>
                                            <div class="mb-1 text-muted">Nov 12</div>
                                            <p class="mb-auto">${Details.slice(0, 500) + "..."}</p>
                                            <a href="../Chi-Tiet/index.html?slug=${Slug}">Continue reading</a>
                                        </div>
                                    </div>
                                </div> `;
                        }
                    })
                    // đây là hàm trả ra tbody
                    $('#content').html(html);
                    $(".loader-wrapper").fadeOut("slow");
                })
        }
    }
    else {
        getBaiVietEN()
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Management/GetBySlugNewsEN?slugEN=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                const { Title, Details, CreatedByDate, Image, IDState } = response
                if (IDState === 2) {
                    $('#tbody').html(`
                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                <p>${CreatedByDate}</p>
            <section>
                <div>${Details}</div>
            </section>
        `);
                }
                else {
                    alert("Bải viết chưa có bản tiếng anh!")
                }
            })
        // đây là hàm trả ra tbody
        function getBaiVietEN() {
            fetch(WEB_API + "Management/ShowAllNewsEN")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const tron = response.sort(() => 0.5 - Math.random())
                    let random = tron.slice(0, 2)
                    var html = random.map(function (response) {
                        const { Title, SlugEN, Details, Image, IDState } = response
                        if (IDState === 2) {
                            return `
                    <div class="col-md-6">
                        <div
                            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col-auto d-none d-lg-block">
                                <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                            </div>
                            <div class="col p-4 d-flex flex-column position-static">
                                <h3 class="mb-0">${Title}</h3>
                                <div class="mb-1 text-muted">Nov 12</div>
                                <p class="mb-auto">${Details.slice(0, 200)}</p>
                                <a href="../Chi-Tiet/index.html?slug=${SlugEN}">Continue reading</a>
                            </div>

                        </div>
                    </div> `;
                        }
                    })
                    // đây là hàm trả ra tbody
                    $('#content').html(html);
                    $(".loader-wrapper").fadeOut("slow");
                })
        }
    }
}
function getslug(numb) {
    if (numb == 1) {
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Management/GetBySlugNewsEN?slugEN=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                fetch(WEB_API + "Management/GetByIdNewsVN?ID=" + response.IDNewsEN)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        if (response === null) {
                            alert("Bài viết chưa có bản tiếng anh!")
                            window.location.href = "../Tin-Tuc/"
                        }
                        window.location.href = "../Chi-Tiet/index.html?slug=" + response.Slug

                    })
            })
    }
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Management/GetBySlugNewsVN?slug=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                fetch(WEB_API + "Management/GetByIdNewsEN?ID=" + response.IDNews)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        if (response === null) {
                            alert("Bài viết chưa có bản tiếng anh!")
                            window.location.href = "../Tin-Tuc/"
                        }
                        window.location.href = "../Chi-Tiet/index.html?slug=" + response.SlugEN
                    })
            })

    }

}