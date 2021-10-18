const WEB_API = "http://localhost:59360/";
// window.addEventListener('load', loadData)

async function loadHDNC(numb) {
    if (numb == 1) {
        fetch(WEB_API + "API/Management/GetByIdCategory?idcat=2")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response)
                var postApproved = response.filter(e => e.IDState === 2)
                const sortByNewDate = postApproved.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                const loadMore = $('#loadMore')
                loadMore.on('click', function (e) {
                    e.preventDefault();
                    var html = sortByNewDate.map(function (response) {
                        const { IDPost, Title, Slug, Details, Image } = response
                        return `
                <div class="card mb-3" style="width:100%;">
                <div class="row g-0">
                    <div class="col-md-8">
                        <div class="card-body">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                            <h5 class="card-title font-weight-bold">${Title}</h5>
                        </a>
                            <p class="card-text"><small class="text-muted">Tháng 8 năm 2021</small></p>
                            <p class="card-text">${Details.slice(0, 500)}</p>

                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}"><button class="btn bg-blue-scse btn-primary lg">Chi Tiet</button></a>
                        </a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <img src="${Image}" 
                                class="card-img-top mt-3 px-3" style="border-radius: 2rem;" alt="...">
                    </div>
                </div>
            </div>
            `;
                    })
                    $('#tbody').html(html);
                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                var html = get6NewestPostedDate.map(function (response) {
                    const { IDPost, Title, Slug, Details, Image } = response
                    return `
            <div class="card mb-3" style="width:100%;">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                        <h5 class="card-title font-weight-bold">${Title}</h5>
                    </a>
                        <p class="card-text"><small class="text-muted">Tháng 8 năm 2021</small></p>
                        <p class="card-text">${Details.slice(0, 500)}</p>

                        <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}"><button class="btn bg-blue-scse btn-primary lg">Chi Tiet</button></a>
                    </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="${Image}" 
                            class="card-img-top mt-3 px-3" style="border-radius: 2rem;" alt="...">
                </div>
            </div>
        </div>
            `;
                })
                $('#tbody').html(html);
            })
    }
    else {
        fetch(WEB_API + "API/Management/GetByIdCategoryEN?idcat=2")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response)
                var postApproved = response.filter(e => e.IDState === 2)
                const sortByNewDate = postApproved.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                const loadMore = $('#loadMore')
                loadMore.on('click', function (e) {
                    e.preventDefault();
                    var html = sortByNewDate.map(function (response) {
                        const { IDPostEN, Title, SlugEN, Details, Image } = response
                        return `
                    <div class="card mb-3" style="width:100%;">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                            </a>
                                <h5 class="card-title font-weight-bold">${Title}</h5>
                                <p class="card-text"><small class="text-muted">Tháng 8 năm 2021</small></p>
                                <p class="card-text">${Details.slice(0, 500)}</p>
    
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}"><button class="btn bg-blue-scse btn-primary lg">Chi Tiet</button></a>
                            </a>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <img src="${Image}" 
                                    class="card-img-top mt-3 px-3" style="border-radius: 2rem;" alt="...">
                        </div>
                    </div>
                </div>
                `;
                    })
                    $('#tbody').html(html);
                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                var html = get6NewestPostedDate.map(function (response) {
                    const { IDPostEN, Title, SlugEN, Details, Image, CreatedByDate } = response
                    return `
                <div class="card mb-3" style="width:100%;">
                <div class="row g-0">
                    <div class="col-md-8">
                        <div class="card-body">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                            <h5 class="card-title font-weight-bold">${Title}</h5>
                            </a>
                            <p class="card-text"><small class="text-muted">Tháng 8 năm 2021</small></p>
                            <p class="card-text">${Details.slice(0, 500)}</p>

                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                            <button class="btn bg-blue-scse btn-primary lg">Details</button>
                            </a>
                        </a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <img src="${Image}" 
                                class="card-img-top mt-3 px-3" style="border-radius: 2rem;" alt="...">
                    </div>
                </div>
            </div>
                `;
                })
                $('#tbody').html(html);
            })
    }

}
