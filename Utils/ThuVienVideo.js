const WEB_API = "https://api.scse-vietnam.org/API/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllVideo")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const sortByNewDate = response.sort(function (a, b) {
                a = new Date(a.CreatedByDate);
                b = new Date(b.CreatedByDate);
                return a > b ? -1 : a < b ? 1 : 0;
            })
            const loadMore = $('#loadMore')
            loadMore.on('click',function (e) {
                e.preventDefault();
                var html = sortByNewDate.map(function (response) {
                    let { IDCat, Title, VideoID, Image } = response
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
                            <iframe class="card-img-top my-2 px-2" src="https://www.youtube.com/embed/${VideoID}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                                      
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
                $(".loader-wrapper").fadeOut("slow");
            })
            const get6NewestPostedDate = sortByNewDate.slice(0, 6) 
            var html = get6NewestPostedDate.map(function (response) {
                let { IDCat, Title, VideoID, Image } = response
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
                            <iframe class="card-img-top my-2 px-2" src="https://www.youtube.com/embed/${VideoID}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                                      
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