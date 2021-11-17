const KHMT = $('#KHMT');
const TTS = $('#TTS');
const NCDT = $('#NCDT');
const GBDG = $('#GBDG');
const WEB_API = "http://localhost:59360/API/";
// $(window).on('load',function(){
//     $(".loader-wrapper").fadeOut("slow");
//   });
NCDT.on('click', function (e) {
    if (this.checked) {
        dataNCDT();
    }
    else {
        var labels = document.getElementById('lblGBDG').textContent;
        if (labels === 'Nghiên cứu Đào tạo') { getImagesIdField(4) }
        else { getImagesIdFieldEN(4) }
    }
    unChecked(KHMT);
    unChecked(TTS);
    unChecked(GBDG);
})
KHMT.change(function (e) {
    if (this.checked) {
        dataKHMT();
    }
    else {
        var labels = document.getElementById('lblGBDG').textContent;
       if (labels === 'Khí hậu-môi trường') { getImagesIdField(2) }
        else { getImagesIdFieldEN(2) }
    }
    unChecked(TTS);
    unChecked(NCDT);
    unChecked(GBDG);
})
GBDG.on('click', function (e) {
    if (this.checked) {
        dataGBDG()
    }
    else {
        var labels = document.getElementById('lblGBDG').textContent;
        if (labels === 'Giới và bình đẳng giới') { getImagesIdField(1) }
        else { getImagesIdFieldEN(1) }
    }
    unChecked(KHMT);
    unChecked(TTS);
    unChecked(NCDT);
})
TTS.on('click', function (e) {
    if (this.checked) {
        dataTTS();
    }
    else {
        var labels = document.getElementById('lblGBDG').textContent;
        if (labels === 'Thực tập sinh') { getImagesIdField(3) }
        else { getImagesIdFieldEN(3) }
    }
    unChecked(KHMT);
    unChecked(NCDT);
    unChecked(GBDG);
})
const getFieldBySlug = async (numb) => {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Field');
    if (slugResult === null) {
        if (numb === 1) {
            getImagesIdField(0)
        }
        else {
            getImagesIdFieldEN(0)
        }
    }
    if (slugResult === 'Nghiên cứu - Đào tạo' || slugResult === 'Research - Training') {
        $('#NCDT').prop('checked', true);
        if (slugResult === 'Nghiên cứu - Đào tạo') { getImagesIdField(4) }
        else { getImagesIdFieldEN(4) }
    }
    if (slugResult === 'Thực tập sinh' || slugResult === 'Internship') {
        $('#TTS').prop('checked', true);
        if (slugResult === 'Thực tập sinh') { getImagesIdField(3) }
        else { getImagesIdFieldEN(3) }
    }
    if (slugResult === 'Biến đổi khí hậu môi trường' || slugResult === 'Climate change - Environment') {
        $('#KHMT').prop('checked', true);
        if (slugResult === 'Biến đổi khí hậu môi trường') { getProjectIdField(2) }
        else { getProjectIdFieldEN(2) }
    }
    if (slugResult === 'Giới và bình đẳng giới' || slugResult === 'Gender - Gender equality') {
        $('#GBDG').prop('checked', true);
        if (slugResult === 'Giới và bình đẳng giới') {
            getImagesIdField(1)
        }
        else { getImagesIdFieldEN(1) }
    }
}
const getImagesIdField = (IdField) => {
    fetch(WEB_API + "Interface/ListPhoto")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (IdField === 0) {
                const sortByNewDate = data.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeData(sortByNewDate);
            } else {
                const filterFields = data.filter(e => e.IDField === IdField)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeData(sortByNewDate);
            }
        })
}
const getImagesIdFieldEN = (IdFieldEN) => {
    fetch(WEB_API + "Interface/ListPhoto")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            if (IdFieldEN === 0) {
                const sortByNewDate = data.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeDataEN(sortByNewDate);
            } else {
                const filterFields = data.filter(e => e.IDField === IdFieldEN)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeDataEN(sortByNewDate);
            }
        })
}
// getImagesIdField(0)
const unChecked = (input) => {
    input.prop('checked', false);
}
const executeData = (data) => {
    const html = data.map(function (response) {
        const { IDField, Title, Slug, Details, Image } = response
        const LinhVuc = changeIdField(IDField)
        return `
        <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4;">
                                <img id="ImgAlbum" onclick="getImage('${Slug}')" src="${Image}"
                                    class="card-img-top my-2 px-2" style="width:100%; height:250px;object-fit:cover" alt="...">
                            <div class="card-body">
                                <a style="text-decoration: none; color:black;cursor:pointer" onclick="getImage('${Slug}')">
                                    <h5 class="card-title">${Title}</h5>
                                </a>

                            </div>
                            <div class="card-footer">
                                <small class="text-muted">${LinhVuc}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });
    $('#list').pagination({
        dataSource: html,
        pageSize: 6,
        className: 'paginationjs-theme-blue',
        callback: function (data, pagination) {
            $(".loader-wrapper").fadeOut("slow");
            $('#tbody').html(data);

        }
    })

}
const executeDataEN = (data) => {
    const html = data.map(function (response) {
        const { IDField, TitleEN, Slug, Details, Image } = response
        const LinhVuc = changeIdFieldEN(IDField)
        return `
        <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4;">
                                <img id="ImgAlbum" onclick="getImage('${Slug}')" src="${Image}"
                                    class="card-img-top my-2 px-2" style="width:100%; height:250px;object-fit:cover" alt="...">
                            <div class="card-body">
                                <a style="text-decoration: none; color:black;cursor:pointer" onclick="getImage('${Slug}')">
                                    <h5 class="card-title">${TitleEN}</h5>
                                </a>

                            </div>
                            <div class="card-footer">
                                <small class="text-muted">${LinhVuc}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });
    $('#list').pagination({
        dataSource: html,
        pageSize: 6,
        className: 'paginationjs-theme-blue',
        callback: function (data, pagination) {
            $(".loader-wrapper").fadeOut("slow");
            $('#tbody').html(data);

        }
    })

}

const changeIdField = (id) => {
    if (id === 1) {
        return 'Giới và bình đẳng giới'
    }
    if (id === 2) {
        return 'Biến đổi khí hậu môi trường'
    }
    if (id === 3) {
        return 'Thực tập sinh'
    }
    if (id === 4) {
        return 'Nghiên cứu Đào tạo'
    }
}
function changeIdFieldEN(id) {
    if (id === 1) {
        return 'Gender and gender equality'
    }
    if (id === 2) {
        return 'Climate change - Environment'
    }
    if (id === 3) {
        return 'Internship'
    }
    if (id === 4) {
        return 'Research - Training'
    }
}

const dataNCDT = () => {
    var labels = document.getElementById('lblNCDT').textContent;
    if (labels === 'Nghiên cứu Đào tạo') { getImagesIdField(4) }
    else { getImagesIdFieldEN(4) }
}
const dataTTS = () => {
    var labels = document.getElementById('lblTTS').textContent;
    if (labels === 'Thực tập sinh') { getImagesIdField(3) }
    else { getImagesIdFieldEN(3) }
}
const dataKHMT = () => {
    var labels = document.getElementById('lblKHMT').textContent;
   if (labels === 'Khí hậu-môi trường') { getImagesIdField(2) }
    else { getImagesIdFieldEN(2) }
}
const dataGBDG = () => {
    var labels = document.getElementById('lblGBDG').textContent;
    if (labels === 'Giới và bình đẳng giới') {
        getImagesIdField(1)
    }
    else { getImagesIdFieldEN(1) }
}
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}
function loadURL() {
    var originalURL = window.location.href;
    var alteredURL = removeParam("Field", originalURL);
    window.location.href = alteredURL;
}

function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
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