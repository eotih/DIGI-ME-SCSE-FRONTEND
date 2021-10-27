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
        fetch(WEB_API + "Interface/GetPostBySlug?slug=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    const { IDPost, Title, CreatedByDate, Slug, Details, Image } = response
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
        function getBaiViet() {
            fetch(WEB_API + "Management/ShowAllPost")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const tron = response.sort(() => 0.5 - Math.random())
                    let random = tron.slice(0, 2)
                    var html = random.map(function (response) {
                        const { IDPost, Title, Slug, Details, Image,CreatedByDate } = response
                        return `
                                <div class="col-md-6">
                                    <div
                                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                        <div class="col-auto d-none d-lg-block">
                                            <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                                        </div>
                                        <div class="col p-4 d-flex flex-column position-static">
                                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                            <h3 class="mb-0">${Title}</h3>
                                            </a>
                                            <div class="mb-1 text-muted">${convertDate(CreatedByDate)}</div>
                                            <p class="mb-auto">${Details.slice(0, 300)+"..."}</p>
                                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">Continue reading</a>
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
        getBaiVietEN()
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Interface/GetPostBySlugEN?slug=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    const { IDPostEN, Title,  CreatedByDate, Details, Image } = response
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

        function getBaiVietEN() {
            fetch(WEB_API + "Management/ShowAllPostEN")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const tron = response.sort(() => 0.5 - Math.random())
                    let random = tron.slice(0, 2)
                    var html = random.map(function (response) {
                        const { IDPostEN, Title, SlugEN, Details, Image } = response
                        return `
                    <div class="col-md-6">
                        <div
                            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col-auto d-none d-lg-block">
                                <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                            </div>
                            <div class="col p-4 d-flex flex-column position-static">
                                <h3 class="mb-0">${Title}</h3>
                                <p class="mb-auto">${Details.slice(0, 200)}</p>
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">Continue reading</a>
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
        fetch(WEB_API + "Management/GetBySlugPostEN?slugen=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
                fetch(WEB_API + "Management/GetByIdPosts?ID="+response.IDPostEN)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    window.location.href="../Chi-Tiet-Bai-Viet/index.html?slug="+response.Slug
                })
            })
    }
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const slugResult = urlParams.get('slug');
        fetch(WEB_API + "Management/GetBySlugPost?slug=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
                fetch(WEB_API + "Management/GetByIdPostsEN?ID="+response.IDPost)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    if(response === null){
                        alert("Bài viết chưa có bản tiếng anh!")
                        window.location.href = "../Chi-Tiet-Bai-Viet/"
                    }
                    window.location.href="../Chi-Tiet-Bai-Viet/index.html?slug="+response.SlugEN
                })
            })
        
    }

}