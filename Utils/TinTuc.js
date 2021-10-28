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
        if (labels === 'Nghiên cứu - Đào tạo') { getNewsIdField(0) }
        else { getNewsIdFieldEN(0) }
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
        if (labels === 'Biến đổi khí hậu - Môi trường') { getNewsIdField(0) }
        else { getNewsIdFieldEN(0) }
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
        if (labels === 'Giới - Bình đẳng giới') { getNewsIdField(0) }
        else { getNewsIdFieldEN(0) }
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
        if (labels === 'Thực tập sinh') { getNewsIdField(0) }
        else { getNewsIdFieldEN(0) }
    }
    unChecked(KHMT);
    unChecked(NCDT);
    unChecked(GBDG);
})

const getFieldBySlug = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Field');
    if (slugResult === 'Nghiên cứu - Đào tạo') {
        $('#NCDT').prop('checked', true);
        dataNCDT();
    }
    if (slugResult === 'Thực tập sinh') {
        $('#TTS').prop('checked', true);
        dataTTS();
    }
    if (slugResult === 'Biến đổi khí hậu - Môi trường') {
        $('#KHMT').prop('checked', true);
        dataKHMT();
    }
    if (slugResult === 'Giới và bình đăng giới') {
        $('#GBDG').prop('checked', true);
        dataGBDG();
    }
}
function checkdata(){
    return 
}
const getNewsIdField = (IdField) => {
    fetch(WEB_API + "Management/ShowAllNewsVN")
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
                const filterFields = postApproved.filter(e => e.IdField === IdField)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeData(sortByNewDate);
            }
        })
}

const getNewsIdFieldEN = (IdFieldEN) => {
    fetch(WEB_API + "Management/ShowAllNewsEN")
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
                const filterFields = postApproved.filter(e => e.IdField === IdFieldEN)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                executeDataEN(sortByNewDate);
            }
        })
}
// getNewsIdField(0)
const unChecked = (input) => {
    input.prop('checked', false);
}
const executeData = (data) => {
    const html = data.map(function (response) {
        const { Title, Slug, Image, IdField } = response;
        const LinhVuc = changeIdField(IdField)
        return `
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="mt-5 mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <hr class="mt-0 bg-blue-scse" style="height:1rem">
                    <a href="../Chi-Tiet/index.html?slug=${Slug}">
                        <img style="width:275px;height:155px;object-fit:cover;" src="${Image}"
                            class="card-img-top px-2" style="border-radius: 2rem;" alt="...">
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
    });
    $('#list').pagination({
        dataSource: html,
        pageSize: 6,
        className: 'paginationjs-theme-blue',
<<<<<<< HEAD
=======
        callback: function (data, pagination) {
            $(".loader-wrapper").fadeOut("slow");
            $('#tbody').html(data);

        }
    })

}

const executeDataEN = (data) => {
    const html = data.map(function (response) {
        const { Title, SlugEN, Image, IdField } = response;
        const LinhVuc = changeIdField(IdField)
        return `
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="mt-5 mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <hr class="mt-0 bg-blue-scse" style="height:1rem">
                    <a href="../Chi-Tiet/index.html?slug=${SlugEN}">
                        <img style="width:275px;height:155px;object-fit:cover;" src="${Image}"
                            class="card-img-top px-2" style="border-radius: 2rem;" alt="...">
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
    });
    $('#list').pagination({
        dataSource: html,
        pageSize: 6,
>>>>>>> 2934c878a0c2df6f0c4dc728bce6f5865ded72d4
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

const dataNCDT = () => {
    var labels = document.getElementById('lblNCDT').textContent;
        if (labels === 'Đào Tạo - Nghiên Cứu') { getNewsIdField(4) }
        else { getNewsIdFieldEN(4) }
}
const dataTTS = () => {
    var labels = document.getElementById('lblTTS').textContent;
        if (labels === 'Thực tập sinh') { getNewsIdField(3) }
        else { getNewsIdFieldEN(3) }
}
const dataKHMT = () => {
    var labels = document.getElementById('lblKHMT').textContent;
        if (labels === 'Khí hậu - Môi trường') { getNewsIdField(2) }
        else { getNewsIdFieldEN(2) }
}
const dataGBDG = () => {
    var labels = document.getElementById('lblGBDG').textContent;
    if (labels === 'Giới - Bình đẳng giới') { getNewsIdField(1) }
    else { getNewsIdFieldEN(1) }
}