
function loadData(language) {
    const urlParams = new URLSearchParams(window.location.search);
    const fullName = urlParams.get('slug');
    fetch("https://api.scse-vietnam.org/Interface/GetByNamePortfolios?name=" + fullName)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { FullName, Image1, Position, Details,PositionEN, DetailsEN } = response
            if(language === "VI"){
                $('#tbody').html(`
                <div class="d-flex flex-row">
                    <img src="${Image1}" style="width:300px; height:300px;border-radius:50%;z-index:2;object-fit:cover">
                    <div class="d-flex flex-column ml-5">
                        <div style="width:60rem;clip-path: polygon(80% 0%, 75% 50%, 80% 100%, 25% 100%, 25% 0%);background-color: #DE4439;margin-left:-440px">
                            <h1 class="font-weight-bold mt-1" style="color:#ffffff;margin-left:440px">Giới Thiệu<h1>
                        </div>
                        <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${FullName}</h1>
                        <h5 class="fw-bolder mb-1 mt-2 font-weight-bold">${Position}</h5>
                    </div>
                </div>
                <section class="mt-3">
                    <div>${Details}</div>
                </section>
            `)
            }
            else {
                $('#tbody').html(`
                <div class="d-flex flex-row">
                    <img src="${Image1}" style="width:300px; height:300px;border-radius:50%;z-index:2;object-fit:cover">
                    <div class="d-flex flex-column ml-5">
                        <div style="width:60rem;clip-path: polygon(80% 0%, 75% 50%, 80% 100%, 25% 100%, 25% 0%);background-color: #DE4439;margin-left:-440px">
                            <h1 class="font-weight-bold mt-1" style="color:#ffffff;margin-left:440px">Giới Thiệu<h1>
                        </div>
                        <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${FullName}</h1>
                        <h5 class="fw-bolder mb-1 mt-2 font-weight-bold">${PositionEN}</h5>
                    </div>
                </div>
                <section class="mt-3">
                    <div>${DetailsEN}</div>
                </section>
            `)
            }
            
            $(".loader-wrapper").fadeOut("slow");
        })
}
