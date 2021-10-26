const WEB_API = "https://api.scse-vietnam.org/API/";
window.addEventListener('load', getBySlug)
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
                const { IDPost, Title, Slug, Details, Image } = response
                return `
                <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Title}</h1>
                <section>
                    <div>${Details}</div>
                </section>
            `;                       
            })
            // đây là hàm trả ra tbody
            $('#tbody').html(html);
        })
}
function getBaiViet() {
    fetch(WEB_API + "Management/ShowAllPost")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const tron = response.sort(() => 0.5 - Math.random())
            let random = tron.slice(0, 2)
            var html = random.map(function (response) {
                const { IDPost, Title, Slug, Details, Image } = response
                return `
                    <div class="col-md-6">
                        <div
                            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col-auto d-none d-lg-block">
                                <img src="${Image}" style="max-width:15rem;height:15rem" alt="">
                            </div>
                            <div class="col p-4 d-flex flex-column position-static">
                                <h3 class="mb-0">${Title}</h3>
                                <div class="mb-1 text-muted">Nov 12</div>
                                <p class="mb-auto">${Details.slice(0, 500)}</p>
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">Continue reading</a>
                            </div>

                        </div>
                    </div> `;
            })
            // đây là hàm trả ra tbody
            $('#content').html(html);
        })
}