const NCDT = $('#NCDT');
const KHMT = $('#KHMT');
const GBDG = $('#GBDG');
const TTS = $('#TTS');
const WEB_API = "https://api.scse-vietnam.org/";
let root = [];
const getAllNews = async (url) => {
    return (await fetch(url)).json();
}
// Get all data and filter by checkbox value
async function getData(language) {
    if (language === 'VI') {
        const data = await getAllNews(WEB_API + "Management/ShowAllNewsVN");
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
        const data = await getAllNews(WEB_API + "Management/ShowAllNewsEN");
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
}
// click checkbox and sort by checkbox value
NCDT.click(async function () {
    if (NCDT.is(':checked')) {
        checkLanguage("NCDT", 4, 'Nghiên cứu đào tạo')
        unChecked(KHMT);
        unChecked(TTS);
        unChecked(GBDG);
    }
    else { checkLanguage("NCDT", 0, 'Nghiên cứu đào tạo') }
})
KHMT.click(async function () {
    if (KHMT.is(':checked')) {
        checkLanguage("KHMT", 2, 'Khí hậu - môi trường')
        unChecked(TTS);
        unChecked(NCDT);
        unChecked(GBDG);
    }
    else {
        checkLanguage("KHMT", 0, 'Khí hậu - môi trường')
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
            const data = news.filter(news => news.IdField === idField);
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
            const { Title, Slug, Image, IdField } = response;
            const LinhVuc = changeIdField(IdField)
            return `
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="mt-5 mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <hr class="mt-0 bg-blue-scse" style="height:1rem">
                    <a href="../Chi-Tiet/index.html?slug=${Slug}">
                        <img style="width:100%;height:155px;object-fit:cover;" src="${Image}"
                            class="card-img-top px-2 img-fluid" style="border-radius: 2rem;" alt="...">
                    </a>
                    <div class="card-body">
                        <a style="text-decoration: none; color:black" href="../Chi-Tiet/index.html?slug=${Slug}">
                            <h5 class="card-title font">${Title}</h5>
                        </a>

                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${LinhVuc}</small>
                    </div>
                </div>
            </div>
        </div>                         
            `;
        }
        else if (data === "EN") {
            const { Title, SlugEN, Image, IdField } = response;
            const LinhVuc = changeIdFieldEN(IdField)
            return `
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="mt-5 mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <hr class="mt-0 bg-blue-scse" style="height:1rem">
                    <a href="../Chi-Tiet/index.html?slug=${SlugEN}">
                        <img style="width:100%;height:155px;object-fit:cover;" src="${Image}"
                            class="card-img-top px-2 img-fluid" style="border-radius: 2rem;" alt="...">
                    </a>
                    <div class="card-body">
                        <a style="text-decoration: none; color:black" href="../Chi-Tiet/index.html?slug=${SlugEN}">
                            <h5 class="card-title font">${Title}</h5>
                        </a>

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
        return 'Khí hậu - môi trường'
    }
    if (id === 3) {
        return 'Thực tập sinh'
    }
    if (id === 4) {
        return 'Nghiên cứu đào tạo'
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