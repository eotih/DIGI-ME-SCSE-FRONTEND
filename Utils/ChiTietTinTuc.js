const WEB_API = "https://api.scse-vietnam.org/";
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
                    <div>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb d-flex justify-content-start" style="background-color: #1A94D0;margin-top:0;">
                                            <li class="breadcrumb-item mb-2"><a class="my-auto" href="../Tin-Tuc/" style="color: #FFFFFF;margin-left: 1rem;"
                                                data-i18n="News.Home">Trang chủ</a></li>
                                            <li class="breadcrumb-item active font-weight-bold" data-i18n="News.News" aria-current="page"><a class="my-auto" href="../../index.html" style="color: #FFFFFF">Tin tức</a></li>
                                            <li class="breadcrumb-item active font-weight-bold" style="color: #FFFFFF" data-i18n="News.News" aria-current="page">${Title}</li>
                                        </ol>
                                    </nav>    
                                </div>
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
                        const { Title, Slug, Details, Image, IDState, CreatedByDate } = response
                        if (IDState === 2) {
                            return `
                            <div class="col-md-6 d-flex align-items-stretch">
                                
                                    <div
                                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                        <div class="col-auto d-none d-lg-block">
                                            <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                                            </br></br>
                                            <a href="../Chi-Tiet/index.html?slug=${Slug}">Continue reading</a>
                                        </div>
                                        <div class="col p-4 d-flex flex-column position-static">
                                            <a href="../Chi-Tiet/index.html?slug=${Slug}">
                                            <h4 class="mb-0">${Title}</h4>
                                            </a>
                                            <div class="mb-1 text-muted">${convertDate(CreatedByDate)}</div>
                                            <p class="mb-auto">${Details.slice(0, 500) + "..."}</p>
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
                    <div>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb d-flex justify-content-start" style="background-color: #1A94D0;margin-top:0;">
                                            <li class="breadcrumb-item mb-2"><a class="my-auto" href="../../index.html" style="color: #FFFFFF;margin-left: 1rem;"
                                                data-i18n="News.Home">Trang chủ</a></li>
                                            <li class="breadcrumb-item active font-weight-bold" data-i18n="News.News" aria-current="page"><a class="my-auto" href="../Tin-Tuc/" style="color: #FFFFFF">News</a></li>
                                            <li class="breadcrumb-item active font-weight-bold" style="color: #FFFFFF" data-i18n="News.News" aria-current="page">${Title}</li>
                                        </ol>
                                    </nav>    
                                </div>
                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                <p>${convertDate(CreatedByDate)}</p>
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
                        const { Title, SlugEN, Details, Image, IDState, CreatedByDate } = response
                        if (IDState === 2) {
                            return `
                    <div class="col-md-6 d-flex align-items-stretch">
                        <div
                            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col-auto d-none d-lg-block">
                                <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                                </br></br>
                                <a href="../Chi-Tiet/index.html?slug=${SlugEN}">Continue reading</a>
                            </div>
                            <div class="col p-4 d-flex flex-column position-static">
                                <h4 class="mb-0">${Title}</h4>
                                <div class="mb-1 text-muted">${convertDate(CreatedByDate)}</div>
                                <p class="mb-auto">${Details.slice(0, 200)}</p>
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