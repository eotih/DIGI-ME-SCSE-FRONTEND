const WEB_API = "https://api.scse-vietnam.org/API/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Management/ListImageTitle")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
           
            const loadMore = $('#loadMore')
            loadMore.on('click',function (e) {
                e.preventDefault();
                var html = response.map(function (response) {
                    let { IDCat, Title, Slug, Details, Image } = response
                    if (IDCat === 1) {
                        IDCat = 'Tin tức'
                    }
                    if (IDCat === 2) {
                        IDCat = 'Dự án'
                    }
                    if (IDCat === 3) {
                        IDCat = 'Hợp tác nghiên cứu'
                    }
                    return `
                    <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4;">
                            <a href="#">
                                <img src="${Image}"
                                    class="card-img-top my-2 px-2" alt="...">
                            </a>
                            <div class="card-body">
                                <a style="text-decoration: none; color:black" href="#">
                                    <h5 class="card-title">${Title}</h5>
                                </a>

                            </div>
                            <div class="card-footer">
                                <small class="text-muted">${IDCat}</small>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                })
                $('#tbody').html(html);
            })
            const get6NewestPostedDate = response.slice(0, 6) 
            var html = get6NewestPostedDate.map(function (response) {
                let { IDCat, Title, Slug, Details, Image } = response
                if (IDCat === 1) {
                    IDCat = 'Tin tức'
                }
                if (IDCat === 2) {
                    IDCat = 'Dự án'
                }
                if (IDCat === 3) {
                    IDCat = 'Hợp tác nghiên cứu'
                }
                return `
                <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4;">
                            <a href="#">
                                <img src="${Image}"
                                    class="card-img-top my-2 px-2" style="width:350px; height:250px;object-fit:cover" alt="...">
                            </a>
                            <div class="card-body">
                                <a style="text-decoration: none; color:black" href="#">
                                    <h5 class="card-title">${Title}</h5>
                                </a>

                            </div>
                            <div class="card-footer">
                                <small class="text-muted">${IDCat}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            })
            $('#tbody').html(html);
        })
}