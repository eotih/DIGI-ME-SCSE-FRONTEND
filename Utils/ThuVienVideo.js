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
            var html = sortByNewDate.map(function (response) {
                let { IDCat, Title, VideoID, Image } = response
                let Category = changeIdCat(IDCat)
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
                                <small class="text-muted">${Category}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            })
            $('#list').pagination({
                dataSource: html,
                pageSize: 6,
                callback: function (data, pagination) {
                    $(".loader-wrapper").fadeOut("slow");
                    $('#tbody').html(data);

                }
            })
        })
}
const changeIdCat = (id) => {
    if (id === 1) {
        return 'Tin tức'
    }
    if (id === 2) {
        return 'Dự án'
    }
    if (id === 3) {
        return 'Hợp tác nghiên cứu'
    }
}