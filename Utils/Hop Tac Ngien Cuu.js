const WEB_API = "https://api.scse-vietnam.org/API/";
// window.addEventListener('load', loadData)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
async function loadHDNC(numb) {
    if (numb == 1) {
        fetch(WEB_API + "Management/GetByIdCategory?idcat=2")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
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
                        const { IDPost, Title, Slug, Details, Image, CreatedByDate } = response
                        return `
                        <div class="card mb-3" style="width:100%;">
                        <div class="row g-0">
                        <div class="col-md-4">
                                <img style="width:300px;height:220px;border-radius: 2rem;" src="${Image}" 
                                        class=" mt-3 mx-3" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                        <h5 class="card-title font-weight-bold">${Title}</h5>
                                    </a>
                                    <p class="card-text"><small class="text-muted">${convertDate(CreatedByDate)}</small></p>
                                    <p class="card-text">${Details.slice(0, 500)}</p>
        
                                    <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                    <button class="btn bg-blue-scse btn-primary lg">Chi tiết</button></a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    `;
                    })
                    $('#tbody').html(html);
                    $(".loader-wrapper").fadeOut("slow");
                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                var html = get6NewestPostedDate.map(function (response) {
                    const { IDPost, Title, Slug, Details, Image, CreatedByDate } = response
                    return `
            <div class="card mb-3" style="width:100%;">
                <div class="row g-0">
                <div class="col-md-4">
                        <img style="width:300px;height:220px;border-radius: 2rem;" src="${Image}" 
                                class=" mt-3 mx-3" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                <h5 class="card-title font-weight-bold">${Title}</h5>
                            </a>
                            <p class="card-text"><small class="text-muted">${convertDate(CreatedByDate)}</small></p>
                            <p class="card-text">${Details.slice(0, 300)}...</p>

                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                            <button class="btn bg-blue-scse btn-primary lg">Chi tiết</button></a>
                        </div>
                    </div>
                    
                </div>
            </div>
            `;
                })
                $('#tbody').html(html);
            })
    }
    else {
        fetch(WEB_API + "Management/GetByIdCategoryEN?idcat=2")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
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
                        const { IDPostEN, Title, SlugEN, Details, Image, CreatedByDate } = response
                        return `
                <div class="card mb-3" style="width:100%;">
                    <div class="row g-0">
                    <div class="col-md-4">
                            <img style="width:300px;height:220px" src="${Image}" 
                                    class=" mt-3 mx-3" style="border-radius: 2rem;" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                                <h5 class="card-title font-weight-bold">${Title}</h5>
                                </a>
                                <p class="card-text"><small class="text-muted">${CreatedByDate}</small></p>
                                <p class="card-text">${Details.slice(0, 300)}...</p>
    
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}"><button class="btn bg-blue-scse btn-primary lg">Chi Tiet</button></a>
                            </div>
                        </div>
                        
                    </div>
                </div>
                `;
                    })
                    $('#tbody').html(html);
                    $(".loader-wrapper").fadeOut("slow");
                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                var html = get6NewestPostedDate.map(function (response) {
                    const { IDPostEN, Title, SlugEN, Details, Image, CreatedByDate } = response
                    return `
                    <div class="card mb-3" style="width:100%;">
                    <div class="row g-0">
                    <div class="col-md-4">
                            <img style="width:300px;height:220px" src="${Image}" 
                                    class=" mt-3 mx-3" style="border-radius: 2rem;" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                                <h5 class="card-title font-weight-bold">${Title}</h5>
                                </a>
                                <p class="card-text"><small class="text-muted">${convertDate(CreatedByDate)}</small></p>
                                <p class="card-text">${Details.slice(0, 300)}...</p>
    
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}"><button class="btn bg-blue-scse btn-primary lg">Chi Tiet</button></a>
                            </div>
                        </div>
                        
                    </div>
                </div>
                `;
                })
                $('#tbody').html(html);
            })
    }

}
