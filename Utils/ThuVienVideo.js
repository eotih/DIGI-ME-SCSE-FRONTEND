const NCDT = $('#NCDT');
const KHMT = $('#KHMT');
const GBDG = $('#GBDG');
const TTS = $('#TTS');
const WEB_API = "http://localhost:59360/API/";
let root = [];
const getAllNews = async (url) => {
    return (await fetch(url)).json();
}
// Get all data and filter by checkbox value
async function getData(language) {
    const data = await getAllNews(WEB_API + "Interface/ShowAllVideo");
    const sortByNewDate = data.sort(function (a, b) {
        a = new Date(a.UpdatedByDate);
        b = new Date(b.UpdatedByDate);
        return a > b ? -1 : a < b ? 1 : 0;
    })
    const mapping = sortByNewDate.map(news => news);
    console.log(mapping)
    root.push(mapping);
    if (language === 'VI') {
        renderDataWithPagination("VI", 0);
    }
    else {
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
            const { IDField, Title, VideoID, Image } = response
            const LinhVuc = changeIdField(IDField)
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
                                <small class="text-muted">${LinhVuc}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (data === "EN") {
            const { IDField, TitleEN, VideoID, Image } = response
        const LinhVuc = changeIdFieldEN(IDField)
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
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}