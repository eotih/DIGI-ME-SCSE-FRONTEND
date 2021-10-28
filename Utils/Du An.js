const WEB_API = "https://api.scse-vietnam.org/";
// window.addEventListener('load', loadData)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
async function loadDA(numb) {
    if(numb == 1)
    {
        fetch(WEB_API + "API/Management/GetByIdCategory?idcat=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var postApproved = response.filter(e => e.IDState === 2)
            const sortByNewDate = postApproved.sort(function (a, b) {
                a = new Date(a.UpdatedByDate);
                b = new Date(b.UpdatedByDate);
                return a > b ? -1 : a < b ? 1 : 0;
            })
            const loadMore = $('#loadMore')
            loadMore.on('click',function (e) {
                e.preventDefault();
                var html = sortByNewDate.map(function (response) {
                    const { IDPost, Title, Slug, Details, Image,CreatedByDate } = response
                    return `
                    <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                                <img style="width:320px;height:220px; border-radius:20px" src="${Image}" 
                                    class=" mt-3 mx-3" alt="...">
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
                    </div>
                </div>
                `;
                })
                $('#tbody').html(html);
                $(".loader-wrapper").fadeOut("slow");
            })
            const get6NewestPostedDate = sortByNewDate.slice(0, 6)
            var html = get6NewestPostedDate.map(function (response) {
                const { IDPost, Title, Slug, Details, Image,CreatedByDate } = response
                return `
                <div class="col-lg-4 d-flex align-items-stretch">
                <div class="mb-5">
                    <div class="card" style="width:100%; height:100%;">
                        <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                        <img style="width:320px;height:220px; border-radius:20px" src="${Image}" 
                                class=" mt-3 mx-3" alt="...">
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
                </div>
            </div>
            `;
            })
            $('#tbody').html(html);
        })
    }
    else{
        fetch(WEB_API + "API/Management/GetByIdCategoryEN?idcat=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var postApproved = response.filter(e => e.IDState === 2)
            const sortByNewDate = postApproved.sort(function (a, b) {
                a = new Date(a.UpdatedByDate);
                b = new Date(b.UpdatedByDate);
                return a > b ? -1 : a < b ? 1 : 0;
            })
            const loadMore = $('#loadMore')
            loadMore.on('click',function (e) {
                e.preventDefault();
                var html = sortByNewDate.map(function (response) {
                    const { IDPost, Title, SlugEN, Details, Image,CreatedByDate } = response
                    return `
                    <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;">
                            <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                            <img style="width:320px;height:220px; border-radius:20px" src="${Image}" 
                                    class=" mt-3 mx-3" alt="...">
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
                const { IDPostEN, Title, SlugEN, Details, Image,CreatedByDate } = response
                return `
                <div class="col-lg-4 d-flex align-items-stretch">
                <div class="mb-5">
                    <div class="card" style="width:100%; height:100%;">
                        <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                        <img style="width:320px;height:220px;" src="${Image}" 
                                class=" mt-3 mx-3" style="border-radius: 2rem;" alt="...">
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
                    </div>
                </div>
            </div>
            `;
            })
            $('#tbody').html(html);
        })
    }
}