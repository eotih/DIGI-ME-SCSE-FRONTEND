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
            const Slave = response.filter(v => v.Position !== "Phó Giám Đốc" && v.Position !== "Giám Đốc")
            executeDataInformationMember(Slave)
            const PhoGiamDoc = response.filter(v => v.Position === "Phó Giám Đốc")
            executeDataInformationPhoGiamDoc(PhoGiamDoc)

        })
}
function executeDataInformationGiamDoc(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh } = response;
        // Lấy hình ảnh đưa vào slide
        document.getElementById('picgd1').src = Hinhanh[0].ImagePortfolio;
        document.getElementById('picgd2').src = Hinhanh[1].ImagePortfolio;
        document.getElementById('picgd3').src = Hinhanh[2].ImagePortfolio;
        // Chỉnh sửa link của ban giám đôc chỉnh trực tiếp trong đây 
        return `
       
        <div class="text-lg-right text-center">
                    <div class="ml-5 mb-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">GIỚI THIỆU</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>${Position}</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:1rem;">${Details}</p>
                        <a href="#"><img src="../../images/image 18.png"></a>
                        <a href="#"><img src="../../images/image 17.png"></a>
                    </div>
                </div>
        `;
    })
    $('#tbody').html(html)
    $(".loader-wrapper").fadeOut("slow");
}
function executeDataInformationPhoGiamDoc(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh } = response;
        document.getElementById('pic01').src = Hinhanh[0].ImagePortfolio;
        document.getElementById('pic02').src = Hinhanh[1].ImagePortfolio;
        document.getElementById('pic03').src = Hinhanh[2].ImagePortfolio;
        return `
        <div class="text-lg-right text-center">
                    <div class="mr-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">GIỚI THIỆU</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>${Position}</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:1rem;"> ${Details}</p>
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
        const { Details, FullName, Position, Hinhanh } = response;
        return `
    <a href="#">
    <div class="item">
        <div class="col-lg-4">
            <div class="card mb-4 rounded-3 shadow-sm"
                style="background-color: #F6F6F6;border-radius: 1.875rem;width:320px;">
                <div class="py-3">
                    <img src="${Hinhanh[0].ImagePortfolio}"
                        style="width: 300px;height:300px;border-radius: 1.875rem;margin-left:0.5rem;object-fit:contain">
                </div>
                <div class="card-body">
                    <h4 class="card-title pricing-card-title text-center">${FullName}</h4>
                    <h5 class="text-blue-scse text-center">${Position}</h5>
                </div>
            </div>
        </div>
    </div>
    </a>
        `;
    })
    $('#members').html(html)
    var $owl = $('#members');
    $owl.trigger('destroy.owl.carousel');
    $owl.find('.owl-stage-outer').children().unwrap();
    $owl.removeClass("owl-center owl-loaded owl-text-select-on");

    $owl.owlCarousel({
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 },
        }
    });
}