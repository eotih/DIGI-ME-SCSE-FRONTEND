const WEB_API = "https://api.scse-vietnam.org/API/";

window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllPorfolio")
        .then(function (response) {
            return response.json();

        })
        .then(function (response) {
            const GiamDoc = response.filter(v => v.Position === "Giám Đốc")
            executeDataInformationGiamDoc(GiamDoc)
            const Slave = response.filter(v => v.Position !== "Phó Giám Đốc" &&  v.Position !== "Giám Đốc")
            executeDataInformationMember(Slave)
            const PhoGiamDoc = response.filter(v => v.Position === "Phó Giám Đốc")
            executeDataInformationPhoGiamDoc(PhoGiamDoc)

        })
}
function executeDataInformationGiamDoc(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position,Hinhanh } = response;
        // Lấy hình ảnh đưa vào slide
        document.getElementById('pic1').src = Hinhanh[0].ImagePortfolio;
        document.getElementById('pic2').src = Hinhanh[1].ImagePortfolio;
        document.getElementById('pic3').src = Hinhanh[2].ImagePortfolio;
        // Lấy dữ liệu ra
        return `
        <div class="col-lg text-lg-right text-center">
                    <div class="ml-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">GIỚI THIỆU</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>${Position}</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:medium;"> ${Details}</p>
                        <a href="#"><img src="../../images/image 19.png"></a>
                        <a href="#"><img src="../../images/image 18.png"></a>
                        <a href="#"><img src="../../images/image 17.png"></a>
                    </div>
                </div>
        `;
    })
    $('#tbody').html(html)
}
function executeDataInformationPhoGiamDoc(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position } = response;
        return `
        <div class="col-lg text-lg-right text-center">
                    <div class="ml-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">GIỚI THIỆU</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>${Position}</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:medium;"> ${Details}</p>
                        <a href="#"><img src="../../images/image 19.png"></a>
                        <a href="#"><img src="../../images/image 18.png"></a>
                        <a href="#"><img src="../../images/image 17.png"></a>
                    </div>
                </div>
        `;
    })
    $('#pgd').html(html)
}

function executeDataInformationMember(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position } = response;
        return `
        <div class="col">
                    <div class="testimonial-item">
                        <div class="card mb-4 rounded-3 shadow-sm"
                            style="background-color: #F6F6F6;border-radius: 1.875rem;">
                            <div class="py-3">
                                <img src="../../images/image 22.png" alt="">
                            </div>
                            <div class="card-body">
                                <h4 class="card-title pricing-card-title">${FullName}</h4>
                                <h5 class="text-blue-scse">P${Position}</h5>
                                <p>${Details}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    })
    $('#members').html(html)
}