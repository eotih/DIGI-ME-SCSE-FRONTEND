const KHMT = $('#KHMT');
const TTS = $('#TTS');
const NCDT = $('#NCDT');
const GBDG = $('#GBDG');
const WEB_API = "https://api.scse-vietnam.org/API/";

KHMT.on('click', function (e) {
    unChecked(TTS);
    unChecked(NCDT);
    unChecked(GBDG);
})
TTS.on('click', function (e) {
    unChecked(KHMT);
    unChecked(NCDT);
    unChecked(GBDG);
})
NCDT.on('click', function (e) {
    getNewsIdField(1);
    unChecked(KHMT);
    unChecked(TTS);
    unChecked(GBDG);
})
GBDG.on('click', function (e) {
    unChecked(KHMT);
    unChecked(TTS);
    unChecked(NCDT);
})

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
        pageSize: 3,
        callback: function(data, pagination) {
            $(".loader-wrapper").fadeOut("slow");
            $('#tbody').html(data);
            
        }
    })
    
}
const changeIdField = (id) =>{
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