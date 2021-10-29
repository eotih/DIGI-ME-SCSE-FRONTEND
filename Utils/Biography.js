const urlParams = new URLSearchParams(window.location.search);
const fullName = urlParams.get('slug');
fetch("https://api.scse-vietnam.org/API/Interface/GetByNamePortfolios?name=" + fullName)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response)
        const { FullName, Hinhanh, Position, Details } = response
        $('#tbody').html(`
                    <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${FullName}</h1>
                    <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Position}</h1>
                    <h1 class="fw-bolder mb-1 mt-2 font-weight-bold">${Hinhanh[0].ImagePortfolio}</h1>
                <section>
                    <div>${Details}</div>
                </section>
            `)
    })

