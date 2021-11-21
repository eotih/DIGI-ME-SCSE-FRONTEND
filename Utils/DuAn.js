const KHMT = $('#KHMT');
const TTS = $('#TTS');
const NCDT = $('#NCDT');
const GBDG = $('#GBDG');
const WEB_API = "https://api.scse-vietnam.org/";

let root = [];
const getAllNews = async (url) => {
    return (await fetch(url)).json();
}
// Get all data and filter by checkbox value
async function getData(language) {
    if (language === 'VI') {
        const data = await getAllNews(WEB_API + "Management/GetByIdCategory?idcat=1");
        const approvedNews = data.filter(news => news.IDState === 2);
        const sortByNewDate = approvedNews.sort(function (a, b) {
            a = new Date(a.UpdatedByDate);
            b = new Date(b.UpdatedByDate);
            return a > b ? -1 : a < b ? 1 : 0;
        })
        const mapping = sortByNewDate.map(news => news);
        root.push(mapping);
        renderDataWithPagination("VI", 0);
    }
    else {
        const data = await getAllNews(WEB_API + "Management/GetByIdCategoryEN?idcat=1");
        const approvedNews = data.filter(news => news.IDState === 2);
        const sortByNewDate = approvedNews.sort(function (a, b) {
            a = new Date(a.UpdatedByDate);
            b = new Date(b.UpdatedByDate);
            return a > b ? -1 : a < b ? 1 : 0;
        })
        const mapping = sortByNewDate.map(news => news);
        root.push(mapping);
        renderDataWithPagination("EN", 0);
    }
    getFieldBySlug();
}
// click checkbox and sort by checkbox value
NCDT.click(async function () {
    if (NCDT.is(':checked')) {
        checkLanguage("NCDT", 4, 'Nghiên cứu Đào tạo')
        unChecked(KHMT);
        unChecked(TTS);
        unChecked(GBDG);
    }
    else { checkLanguage("NCDT", 0, 'Nghiên cứu Đào tạo') }
})
KHMT.click(async function () {
    if (KHMT.is(':checked')) {
        checkLanguage("KHMT", 2, 'Khí hậu - Môi trường')
        unChecked(TTS);
        unChecked(NCDT);
        unChecked(GBDG);
    }
    else {
        checkLanguage("KHMT", 0, 'Khí hậu - Môi trường')
    }
})
GBDG.click(async function () {
    if (GBDG.is(':checked')) {
        checkLanguage("GBDG", 1, 'Giới và bình đẳng giới')
        unChecked(KHMT);
        unChecked(TTS);
        unChecked(NCDT);
    }
    else {
        checkLanguage("GBDG", 0, 'Giới và bình đẳng giới')
    }
})
TTS.click(async function () {
    if (TTS.is(':checked')) {
        checkLanguage("TTS", 3, 'Thực tập sinh')
        unChecked(KHMT);
        unChecked(NCDT);
        unChecked(GBDG);
    }
    else {
        checkLanguage("TTS", 0, 'Thực tập sinh')
    }
})

const filterByIDField = (idField) => {
    if (idField === 0) {
        return root.map(news => {
            const data = news.filter(news => news);
            return data;
        })
    }
    else {
        return root.map(news => {
            const data = news.filter(news => news.IDField === idField);
            return data;
        })
    }
}
const unChecked = (input) => {
    input.prop('checked', false);
}
const renderDataWithPagination = (data, numb) => {
    const dataFilter = filterByIDField(numb);
    const html = dataFilter[0].map(function (response) {
        if (data === "VI") {
            const { IDField, Title, Slug, Details, Image, CreatedByDate } = response
            const LinhVuc = changeIdField(IDField)
            return `
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="mt-5 mb-5">
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
        }
        else if (data === "EN") {
            const { IDField, Title, SlugEN, Details, Image, CreatedByDate } = response
            const LinhVuc = changeIdFieldEN(IDField)
            return `
            <div class="col-lg-4 d-flex align-items-stretch">
            <div class="mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                    <img style="width:100%;height:220px; border-radius:20px" src="${Image}" 
                    class=" mt-3 px-3" alt="...">
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
        }
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
        return 'Khí hậu - Môi trường'
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
        return 'Gender - Gender Equality'
    }
    if (id === 2) {
        return 'Environment - Climate'
    }
    if (id === 3) {
        return 'Internship'
    }
    if (id === 4) {
        return 'Research - Training'
    }
}
const checkLanguage = (FieldName, IdField, textContent) => {
    var labels = document.getElementById('lbl' + FieldName).textContent;
    if (labels === textContent) {
        renderDataWithPagination("VI", IdField);
    }
    else { renderDataWithPagination("EN", IdField) }
}

const getFieldBySlug = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Field');
    if (slugResult === 'Nghiên cứu - Đào tạo' || slugResult === 'Research - Training') {
        $('#NCDT').prop('checked', true);
        checkLanguage("NCDT", 4, 'Nghiên cứu Đào tạo')
    }
    if (slugResult === 'Thực tập sinh' || slugResult === 'Internship') {
        $('#TTS').prop('checked', true);
        checkLanguage("TTS", 3, 'Thực tập sinh')
    }
    if (slugResult === 'Môi trường' || slugResult === 'Environment') {
        $('#KHMT').prop('checked', true);
        checkLanguage("KHMT", 2, 'Khí hậu - Môi trường')
    }
    if (slugResult === 'Giới và bình đẳng giới' || slugResult === 'Gender - Gender equality') {
        $('#GBDG').prop('checked', true);
        checkLanguage("GBDG", 1, 'Giới và bình đẳng giới')
    }
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