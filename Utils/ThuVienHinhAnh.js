const WEB_API = "https://api.scse-vietnam.org/API/";
// $(window).on('load',function(){
//     $(".loader-wrapper").fadeOut("slow");
//   });
window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Management/ListImageTitle")
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
                let { IDCat, Title, Slug, Details, Image } = response
                let Category = changeIdCat(IDCat)
                return `
                <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4;">
                                <img id="ImgAlbum" onclick="getImage('${Slug}')" src="${Image}"
                                    class="card-img-top my-2 px-2" style="width:350px; height:250px;object-fit:cover" alt="...">
                            <div class="card-body">
                                <a style="text-decoration: none; color:black;cursor:pointer" onclick="getImage('${Slug}')">
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
function getImage(Slug) {
    var modal = document.getElementById('myModal');
    const loadImage = async () => {
        const res = await fetch(WEB_API + "Interface/GetBySlugPhotoGallery?slug=" + Slug)
        const json = await res.json();
        const filterData = json.filter(v => v.Image)
        const data = filterData.slice(0, filterData.length - 1).map(function (response) {
            return `
                <div class="carousel-item">
                            <img class="d-block w-50 mx-auto" src="${response.Image}">
                        </div>
                `;
        })
        const html = filterData.slice(filterData.length - 1).map(function (response) {
            return `
                <div class="carousel-item active">
                            <img class="d-block w-50 mx-auto" src="${response.Image}">
                        </div>
                `;
        })
        const arr = await Promise.all([html, data])
        $('#tImg').html(arr)
    }
    loadImage()
    modal.style.opacity = 1;
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.opacity = 0;
        modal.style.display = "none";
    }
}