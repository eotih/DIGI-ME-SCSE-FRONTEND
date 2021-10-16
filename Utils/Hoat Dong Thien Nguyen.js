const WEB_API = "http://localhost:59360/";
        window.addEventListener('load', loadData)
        async function loadData() {
            fetch(WEB_API + "API/Management/GetByIdCategory?idcat=2")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    var html = response.map(function (response) {
                        console.table(response)
                        const { IDPost, Title, Slug, Details, Image, CreatedByDate  } = response
                        return `
                        <div class="row">
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
                                style="width: 400px;height: 370px;border-radius: 10px;object-fit: cover;"
                                class="img-fluid my-3" alt="...">
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="card-body">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                            <h3 class="card-title text-muted">${Title}</h3>
                            </a>
                            <p class="card-text"><small class="text-muted">${CreatedByDate}</small></p>
                            <p class="card-text" style="text-align: justify; text-justify: inter-word">.</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="../Dang-Ky-Tinh-Nguyen-Vien/" style="color:#ffffff" type="button"
                                    class="btn bg-red-scse btn-danger lg">Đăng ký</a>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
        <button type="submit" class="btn btn-primary bg-blue-scse btn-user btn-block col-xl-12">Xem thêm</button>`;
                    })
                    $('#tbody').html(html);
                })
        }