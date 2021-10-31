const WEB_API = "https://api.scse-vietnam.org/API/";
window.addEventListener('load', getBySlug)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
function getBySlug() {
    getBaiViet()
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('slug');
    fetch(WEB_API + "Interface/GetBySlugDocument?slug=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { IDPost, Title, Slug, Details, Image,CreatedByDate } = response
                return `
                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                <h5 class="mt-1">${convertDate(CreatedByDate)}</h5>
                <section>
                    <div>${Details}</div>
                </section>
            `;                       
            })
            // đây là hàm trả ra tbody
            $('#tbody').html(html);
            $(".loader-wrapper").fadeOut("slow");
        })
}
function getBaiViet() {
    fetch(WEB_API + "Interface/ListDocument")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const tron = response.sort(() => 0.5 - Math.random())
            let random = tron.slice(0, 2)
            var html = random.map(function (response) {
                const { IDPost, Title, Slug, Details, Image, CreatedByDate } = response
                return `
                    <div class="col-md-6">
                        <div
                            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col-auto d-none d-lg-block">
                                <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                            </div>
                            <div class="col p-4 d-flex flex-column position-static">
                                <h3 class="mb-0">${Title}</h3>
                                <div class="mb-1 text-muted">${convertDate(CreatedByDate)}</div>
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">Continue reading</a>
                            </div>

                        </div>
                    </div> `;
            })
            // đây là hàm trả ra tbody
            $('#content').html(html);
        })
}