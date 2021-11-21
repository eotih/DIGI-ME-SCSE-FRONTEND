const WEB_API = "https://api.scse-vietnam.org/";
// window.addEventListener('load', getBySlug)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
function convertCategory(category) {
    if (category === 1) {
        return '<a class="my-auto" href="../Du-An/" style="color: #FFFFFF">Dự Án</a> '
    }
    else if (category === 2) {
        return '<a class="my-auto" href="../Hop-Tac-Nghien-Cuu/" style="color: #FFFFFF">Hợp Tác Ngiên Cứu</a> '
    }
    else if (category === 3) {
        return '<a class="my-auto" href="../Hoat-Dong-Thien-Nguyen/" style="color: #FFFFFF">Hoạt Động Thiện Nguyện</a> '
    }
}
function convertCategoryEN(id) {
    if (id === 1) {
        return '<a class="my-auto" href="../Du-An/" style="color: #FFFFFF">Project</a> '
    }
    if (id === 2) {
        return '<a class="my-auto" href="../Hop-Tac-Nghien-Cuu/" style="color: #FFFFFF">Cooperation for research</a> '
    }
    if (id === 3) {
        return '<a class="my-auto" href="../Hoat-Dong-Thien-Nguyen/" style="color: #FFFFFF">Voluntary Activities</a> '
    }
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
                    const {IDCat, IDPost, Title, CreatedByDate, Slug, Details, Image, IDState } = response
                    if (IDState === 2) {
                        return `
                        <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb d-flex justify-content-start" style="background-color: #1A94D0;margin-top:0; padding:0.5rem 0">
                      <li class="breadcrumb-item mb-2"><a class="my-auto" href="../../index.html" style="color: #FFFFFF;margin-left: 1rem;"
                        data-i18n="ThanhMauXanh.DA.Home">Trang chủ</a></li>
                        <li class="breadcrumb-item active font-weight-bold" data-i18n="News.News" aria-current="page"><a class="my-auto"style="color: #FFFFFF">${convertCategory(IDCat)}</a></li>
                      <li class="breadcrumb-item font-weight-bold" style="color: #FFFFFF" data-i18n="News.News" aria-current="page">${Title}</li>
                    </ol>
                </nav>    
            </div>
                                                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                                                <p>${convertDate(CreatedByDate)}</p>
                                            <section>
                                                <div>${Details}</div>
                                            </section>
                                        `;
                    }
                    else {
                        Alert("Bài viết chưa có bản tiếng anh!")
                    }
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
                        const { IDPost, Title, Slug, Details, Image, CreatedByDate, IDState } = response
                        if (IDState === 2) {
                            return `
                                <div class="col-md-6 d-flex align-items-stretch">
                                    <div
                                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                        <div class="col-auto d-none d-lg-block">
                                            <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                                            </br></br>
                                            <a class="m-auto" href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">Continue reading</a>
                                        </div>
                                        <div class="col p-4 d-flex flex-column position-static">
                                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                            <h3 class="mb-0">${Title}</h3>
                                            </a>
                                            <div class="mb-1 text-muted">${convertDate(CreatedByDate)}</div>
                                            <p class="mb-auto">${Details.slice(0, 300) + "..."}</p>
                                        </div>
                                    </div>
                                </div> `;
                        }
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
        fetch(WEB_API + "Management/GetBySlugPostEN?slugen=" + slugResult)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    const {IDCat, IDPostEN, Title, CreatedByDate, Details, Image, IDState } = response
                    if (IDState === 2) {
                        return `
                        <div>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb d-flex justify-content-start" style="background-color: #1A94D0;margin-top:0;">
                              <li class="breadcrumb-item mb-2"><a class="my-auto" href="../../index.html" style="color: #FFFFFF;margin-left: 1rem;"
                                data-i18n="ThanhMauXanh.DA.Home">Trang chủ</a></li>
                              <li class="breadcrumb-item active font-weight-bold" style="color: #FFFFFF" data-i18n="ThanhMauXanh.DA.Project" aria-current="page">${convertCategoryEN(IDCat)}</li>
                              <li class="breadcrumb-item active font-weight-bold" style="color: #FFFFFF" data-i18n="News.News" aria-current="page">${Title}</li>
                            </ol>
                        </nav>    
                    </div>
                                                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                                                <p>${CreatedByDate}</p>
                                            <section>
                                                <div>${Details}</div>
                                            </section>
                                        `;
                    }
                    else {
                        alert("Bài viết chưa có bản tiếng anh!")
                    }
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
                        const { IDPostEN, Title, SlugEN, Details, Image, IDState } = response
                        if (IDState === 2) {
                            return `
                    <div class="col-md-6 d-flex align-items-stretch">
                        <div
                            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col-auto d-none d-lg-block">
                                <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                                </br></br>
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">Continue reading</a>
                            </div>
                            <div class="col p-4 d-flex flex-column position-static">
                                <h3 class="mb-0">${Title}</h3>
                                <p class="mb-auto">${Details.slice(0, 200)}</p>
                            </div>

                        </div>
                    </div> `;
                        }
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
                fetch(WEB_API + "Management/GetByIdPosts?ID=" + response[0].IDPostEN)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        window.location.href = "../Chi-Tiet-Bai-Viet/index.html?slug=" + response.Slug
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
                fetch(WEB_API + "Management/GetByIdPostsEN?ID=" + response[0].IDPost)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        if (response === null) {
                            alert("Bài viết chưa có bản tiếng anh!")
                            window.location.href = "../Chi-Tiet-Bai-Viet/"
                        }
                        window.location.href = "../Chi-Tiet-Bai-Viet/index.html?slug=" + response.SlugEN
                    })
            })

    }

}