const WEB_API = "https://api.scse-vietnam.org/API/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Management/ShowAllNewsVN")
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
                    const { IDPost, Title, Slug, Details, Image } = response
                    return `
                    <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                <img src="${Image}" 
                                    class="card-img-top mt-3 px-3" style="border-radius: 2rem;" alt="...">
                            </a>
                            <div class="card-body">
                                <a style="text-decoration: none; color:black;" href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                    <h4 class="card-title font-weight-bold" style="text-align: justify; text-justify: inter-word font-size:24px">${Title}</h4>
                                </a>
                                <p class="card-text" style="text-align: justify; text-justify: inter-word">${Details.slice(0, 300)}</p>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <a style="text-decoration: none; color:white; padding-left:2rem;padding-right:2rem; padding-top:0.5rem;padding-bottom:0.5rem"
                                        class="bg-red-scse btn btn-danger me-md-2 font-weight-bold" type="button">Ủng
                                        hộ</a>
                                </div>
                            </div>
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
                <div class="col-md-4 d-flex align-items-stretch">
                <div class="mt-5 mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <hr class="mt-0 bg-blue-scse" style="height:1rem">
                    <a href="#">
                        <img src="${Image}"
                            class="card-img-top px-2" style="border-radius: 2rem;" alt="...">
                    </a>
                    <div class="card-body">
                        <a style="text-decoration: none; color:black" href="../Bai-Dang/index.html">
                            <h5 class="card-title font">${Title}</h5>
                        </a>

                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Từ thiện</small>
                    </div>
                </div>
            </div>
        </div>                        
            `;
            })
            $('#tbody').html(html);
        })
}