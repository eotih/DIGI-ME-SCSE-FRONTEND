const WEB_API = "http://localhost:59360/API/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Interface/ListDocument")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const sortByNewDate = response.sort(function (a, b) {
                a = new Date(a.UpdatedByDate);
                b = new Date(b.UpdatedByDate);
                return a > b ? -1 : a < b ? 1 : 0;
            })
            const loadMore = $('#loadMore')
            loadMore.on('click',function (e) {
                e.preventDefault();
                var html = sortByNewDate.map(function (response) {
                    const {Title, Slug} = response
                    return `
                    <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4">
                            <div class="card-body">
                                <a href="#">
                                    <img src="../../../images/PDF.jpg"
                                        class="card-img-top my-1 px-1" alt="...">
                                </a>
                                <a style="text-decoration: none; color:black" href="../../Chi-Tiet-Bai-Viet/tailieu.html?slug=${Slug}">
                                    <h5 class="card-title" style="font-size:16px">${Title}</h5>
                                </a>

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
                const {Title, Slug} = response
                return `
                <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4">
                            <div class="card-body">
                                <a href="#">
                                    <img src="../../../images/PDF.jpg"
                                        class="card-img-top my-1 px-1" alt="...">
                                </a>
                                <a style="text-decoration: none; color:black" href="../../Chi-Tiet-Bai-Viet/tailieu.html?slug=${Slug}">
                                    <h5 class="card-title" style="font-size:16px">${Title}</h5>
                                </a>

                            </div>
                           
                        </div>
                    </div>
                </div>
            `;
            })
            $('#tbody').html(html);
        })
}