const WEB_API = "https://api.scse-vietnam.org/";
// window.addEventListener('load', loadData)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
async function loadHDTN(numb) {
    if (numb == 1) {
        fetch(WEB_API + "API/Management/GetByIdCategory?idcat=3")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                const postApproved = response.filter(e => e.IDState === 2)
                const sortByNewDate = postApproved.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                const html = sortByNewDate.map(function (response) {
                    const { IDPost, Title, Slug, Details, Image, CreatedByDate } = response
                    return `
                <div class="card mb-3" style="width:100%; border-radius: 10px">
                        <div class="row g-0" style="background-color: #F0F0F0">
                            <div class="col-lg-4 p-0">
                                <div class="d-flex justify-content">
                                    <div class="bg-red-scse" style="
                                    padding-right:20px;
                                        height: 400px;
                                    "></div>
                                    <img src="${Image}"
                                        style="width: 350px;height: 370px;border-radius: 10px;object-fit: cover;"
                                        class="img-fluid my-3" alt="...">
                                </div>
                            </div>
        
                            <div class="col-lg-8">
                                <div class="card-body">
                                    <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                    <h3 class="card-title text-muted">${Title}</h3>
                                    </a>
                                    <p class="card-text"><small class="text-muted">${convertDate(CreatedByDate)}</small></p>
                                    <p class="card-text" style="text-align: justify; text-justify: inter-word">${Details.slice(0, 300)}...</p>
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <a href="../Dang-Ky-Tinh-Nguyen-Vien/" style="color:#ffffff" type="button"
                                            class="btn bg-red-scse btn-danger lg">Đăng ký</a>
        
                                    </div>
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
        fetch(WEB_API + "API/Management/GetByIdCategoryEN?idcat=3")
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
                var html = sortByNewDate.map(function (response) {
                    const { IDPostEN, Title, SlugEN, Details, Image, CreatedByDate } = response
                    return `
                <div class="card mb-3" style="width:100%; border-radius: 10px">
                <div class="row g-0" style="background-color: #F0F0F0">
                    <div class="col-lg-4 p-0">
                        <div class="d-flex justify-content">
                            <div class="bg-red-scse" style="
                            margin-right:30px;
                                height: 400px;
                                width: 30px;
                            "></div>
                            <img src="${Image}"
                                style="margin-left: 20px;width: 350px;height: 370px;border-radius: 10px;object-fit: cover;"
                                class="img-fluid my-3" alt="...">
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="card-body">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                            <h3 class="card-title text-muted">${Title}</h3>
                            </a>
                            <p class="card-text"><small class="text-muted">${convertDate(CreatedByDate)}</small></p>
                            <p class="card-text" style="text-align: justify; text-justify: inter-word">.</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="../Dang-Ky-Tinh-Nguyen-Vien/" style="color:#ffffff" type="button"
                                    class="btn bg-red-scse btn-danger lg">Đăng ký</a>

                            </div>
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