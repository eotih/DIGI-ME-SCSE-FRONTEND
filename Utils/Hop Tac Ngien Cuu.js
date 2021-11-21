const WEB_API = "https://api.scse-vietnam.org/";
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
                const html = sortByNewDate.map(function (response) {
                    const { IDPost, Title, Slug, Details, Image, CreatedByDate } = response
                    return `
                        <div class="card mb-3" style="width:100%;">
                            <div class="row g-0">
                            <div class="col-md-4">
                                    <img style="width:100%;height:220px;border-radius: 2rem;object-fit:cover" src="${Image}" 
                                            class=" mt-3 px-3" alt="...">
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
                $('#list').pagination({
                    dataSource: html,
                    pageSize: 6,
                    className: 'paginationjs-theme-blue',
                    callback: function (data, pagination) {
                        $(".loader-wrapper").fadeOut("slow");
                        if(data.length === 0) {
                            moi = `
                            <h1 class="text-center font-weight-bold my-3 mx-auto">Chưa có bài đăng...</h1>
                            `   
                        }
                        else { moi = data }
                        $('#tbody').html(moi);

                    }
                })
             
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
                const html = sortByNewDate.map(function (response) {
                    const { IDPostEN, Title, SlugEN, Details, Image, CreatedByDate } = response
                    return `
                    <div class="card mb-3" style="width:100%;">
                    <div class="row g-0">
                    <div class="col-md-4">
                            <img style="width:100%;height:220px;border-radius: 2rem;object-fit:cover" src="${Image}" 
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
                $('#list').pagination({
                    dataSource: html,
                    pageSize: 6,
                    className: 'paginationjs-theme-blue',
                    callback: function (data, pagination) {
                        $(".loader-wrapper").fadeOut("slow");
                        if(data.length === 0) {
                            moi = `
                            <h1 class="text-center font-weight-bold my-3 mx-auto">Chưa có bài đăng...</h1>
                            `   
                        }
                        else { moi = data }
                        $('#tbody').html(moi);

                    }
                })
            })
    }

}
