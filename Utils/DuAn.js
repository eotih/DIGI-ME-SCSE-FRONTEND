const KHMT = $('#KHMT');
const TTS = $('#TTS');
const NCDT = $('#NCDT');
const GBDG = $('#GBDG');
const WEB_API = "https://api.scse-vietnam.org/API/";

NCDT.on('click', function (e) {
    if (this.checked) {
        dataNCDT();
    }
    else {
        var labels = document.getElementById('lblGBDG').textContent;
        if (labels === 'Nghiên cứu Đào tạo') { getProjectIdField(0) }
        else { getProjectIdFieldEN(0) }
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
       if (labels === 'Khí hậu-môi trường') { getProjectIdField(0) }
        else { getProjectIdFieldEN(0) }
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
        if (labels === 'Giới và bình đẳng giới') { getProjectIdField(0) }
        else { getProjectIdFieldEN(0) }
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
        if (labels === 'Thực tập sinh') { getProjectIdField(0) }
        else { getProjectIdFieldEN(0) }
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
            getProjectIdField(0)
        }
        else {
            getProjectIdFieldEN(0)
        }
    }
    if (slugResult === 'Nghiên cứu - Đào tạo' || slugResult === 'Research - Training') {
        $('#NCDT').prop('checked', true);
        if (slugResult === 'Nghiên cứu - Đào tạo') { getProjectIdField(4) }
        else { getProjectIdFieldEN(4) }
    }
    if (slugResult === 'Thực tập sinh' || slugResult === 'Internship') {
        $('#TTS').prop('checked', true);
        if (slugResult === 'Thực tập sinh') { getProjectIdField(3) }
        else { getProjectIdFieldEN(3) }
    }
    if (slugResult === 'Biến đổi khí hậu môi trường' || slugResult === 'Climate change - Environment') {
        $('#KHMT').prop('checked', true);
        if (slugResult === 'Biến đổi khí hậu môi trường') { getProjectIdField(2) }
        else { getProjectIdFieldEN(2) }
    }
    if (slugResult === 'Giới và bình đẳng giới' || slugResult === 'Gender - Gender equality') {
        $('#GBDG').prop('checked', true);
        if (slugResult === 'Giới và bình đẳng giới') {
            getProjectIdField(1)
        }
        else { getProjectIdFieldEN(1) }
    }
}
const getProjectIdField = (IdField) => {
    fetch(WEB_API + "Management/GetByIdCategory?idcat=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const postApproved = data.filter(item => item.IDState === 2)
            if (IdField === 0) {
                const sortByNewDate = postApproved.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeData(sortByNewDate);
            } else {
                const filterFields = postApproved.filter(e => e.IDField === IdField)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeData(sortByNewDate);
            }
        })
}

const getProjectIdFieldEN = (IdFieldEN) => {
    fetch(WEB_API + "Management/GetByIdCategoryEN?idcat=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const postApproved = data.filter(item => item.IDState === 2)
            if (IdFieldEN === 0) {
                const sortByNewDate = postApproved.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeDataEN(sortByNewDate);
            } else {
                const filterFields = postApproved.filter(e => e.IDField === IdFieldEN)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeDataEN(sortByNewDate);
            }
        })
}
// getProjectIdField(0)
const unChecked = (input) => {
    input.prop('checked', false);
}
const executeData = (data) => {
    const html = data.map(function (response) {
        const { IDField, Title, Slug, Details, Image, CreatedByDate } = response
        console.log(IDField)
        const LinhVuc = changeIdField(IDField)
        return `
        <div class="col-lg-4 d-flex align-items-stretch">
                <div class="mb-5">
                    <div class="card" style="width:100%; height:100%;">
                        <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                        <img style="width:100%;height:220px; border-radius:20px" src="${Image}" 
                                class=" mt-3 px-3" alt="...">
                        </a>
                        <div class="card-body">
                            <a style="text-decoration: none; color:black;" href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                <h4 class="card-title font-weight-bold" style="text-align: justify; text-justify: inter-word font-size:24px">${Title}</h4>
                            </a>
                            <p>${convertDate(CreatedByDate)}</p>
                            <p class="card-text" style="text-align: justify; text-justify: inter-word">${Details.slice(0, 300)}...</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="../Donate" style="text-decoration: none; color:white; padding-left:2rem;padding-right:2rem; padding-top:0.5rem;padding-bottom:0.5rem"
                                    class="bg-red-scse btn btn-danger me-md-2 font-weight-bold" type="button">Ủng
                                    hộ</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${LinhVuc}</small>
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
        const { IDField, Title, SlugEN, Details, Image, CreatedByDate } = response
        const LinhVuc = changeIdFieldEN(IDField)
        return `
        <div class="col-lg-4 d-flex align-items-stretch">
                <div class="mb-5">
                    <div class="card" style="width:100%; height:100%;">
                        <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                        <img style="width:100%;height:220px;" src="${Image}" 
                                class=" mt-3 px-3" style="border-radius: 2rem;" alt="...">
                        </a>
                        <div class="card-body">
                            <a style="text-decoration: none; color:black;" href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                                <h4 class="card-title font-weight-bold" style="text-align: justify; text-justify: inter-word font-size:24px">${Title}</h4>
                            </a>
                            <p>${convertDate(CreatedByDate)}</p>
                            <p class="card-text" style="text-align: justify; text-justify: inter-word">${Details.slice(0, 300)}...</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="../Donate" style="text-decoration: none; color:white; padding-left:2rem;padding-right:2rem; padding-top:0.5rem;padding-bottom:0.5rem"
                                    class="bg-red-scse btn btn-danger me-md-2 font-weight-bold" type="button">Donate</a>
                            </div>
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
    if (labels === 'Nghiên cứu Đào tạo') { getProjectIdField(4) }
    else { getProjectIdFieldEN(4) }
}
const dataTTS = () => {
    var labels = document.getElementById('lblTTS').textContent;
    if (labels === 'Thực tập sinh') { getProjectIdField(3) }
    else { getProjectIdFieldEN(3) }
}
const dataKHMT = () => {
    var labels = document.getElementById('lblKHMT').textContent;
   if (labels === 'Khí hậu-môi trường') { getProjectIdField(2) }
    else { getProjectIdFieldEN(2) }
}
const dataGBDG = () => {
    var labels = document.getElementById('lblGBDG').textContent;
    if (labels === 'Giới và bình đẳng giới') {
        getProjectIdField(1)
    }
    else { getProjectIdFieldEN(1) }
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