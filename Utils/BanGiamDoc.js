const WEB_API = "https://api.scse-vietnam.org/API/";

window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllPortfolio")
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
                        <a href="https://www.facebook.com/profile.php?id=100054480739834"target="_blank"><img src="../../images/image 18.png"></a>
                        <a href="https://zalo.me/84913817988"target="_blank"><img src="../../images/image 17.png"></a>

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
                        <a href="https://www.facebook.com/nguyenquocgiang1308"target="_blank"><img src="../../images/image 18.png"></a>
                        <a href="https://zalo.me/84977860008"target="_blank"><img src="../../images/image 17.png"></a>
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
        <div class="item">
        <a href="../Biography/index.html?slug=${FullName}">
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
        </a>
    </div>
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
const Volunteers = [
    {
        id: 1,
        name: 'Nguyễn Thị Việt Anh',
        team: 'Team Branding',
        image: 'https://f40-zpg.zdn.vn/6114280782338152239/c49d4aed539e9bc0c28f.jpg'
    },
    {
        id: 2,
        name: 'Nguyễn My Uyên Phương',
        team: 'Team Branding',
        image: 'https://f36-zpg.zdn.vn/3993298337383799840/5d15ad88befb76a52fea.jpg'
    },
    {
        id: 3,
        name: 'Nguyễn Tấn Đạt',
        team: 'Team Branding',
        image: 'https://f41-zpg.zdn.vn/1315755625838798095/49a243865df595abcce4.jpg'
    },
    {
        id: 4,
        name: 'Mai Trịnh Phương Anh',
        team: 'Team Branding',
        image: 'https://f38-zpg.zdn.vn/2081012970956196884/5a6c6c93b1e079be20f1.jpg'
    },
    {
        id: 5,
        name: 'Đào Quốc Bảo',
        team: 'Team Website',
        image: 'https://media.discordapp.net/attachments/866169329987878932/903528129258217513/image1-removebg-preview_1.png'
    },
    {
        id: 6,
        name: 'Trần Thanh Tú',
        team: 'Team Website',
        image: 'https://media.discordapp.net/attachments/866169329987878932/903527941013639179/image0-removebg-preview_4.png'
    },
    {
        id: 7,
        name: 'Lê Trọng Hiếu',
        team: 'Team Website',
        image: 'https://drive.google.com/uc?export=view&id=18pSp_6Fh83ZkS868KZloH6vHjHsWmoFe'
    },
    {
        id: 8,
        name: 'Nguyễn Tân Mỹ',
        team: 'Team Website',
        image: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/96241891_2687675991477300_589109310731059200_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=CsF24aa7u4EAX_WfSYd&_nc_ht=scontent.fsgn5-5.fna&oh=ea0712fb3a227463d44a5e050ca9a2b6&oe=61A0955E'
    },
    {
        id: 9,
        name: 'Nguyễn Duy Thành',
        team: 'Team Website',
        image: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/241252673_1500907220281541_4144601654334096569_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=voC_QLTOtPIAX_fDI0d&_nc_ht=scontent.fsgn5-8.fna&oh=56cdf8bb50bbc81008abfaf862bad243&oe=6180C624'
    },
]
const getThongTin = () => {
    const html = Volunteers.map(volunteer => {
        return `
        <div class="item">
                    <div class="col-lg-4">
                        <div class="card mb-4 rounded-3 shadow-sm"
                            style="background-color: #F6F6F6;border-radius: 1.875rem;width:320px;">
                            <div class="pt-3">
                                <img src="${volunteer.image}"
                                    style="width: 300px;height:400px;border-radius: 1.875rem;margin-left:0.5rem;object-fit:cover;">
                            </div>
                            <div class="card-body">
                                <div class="mb-1"
                                    style="height: 5em;
                                width: 20em;
                                clip-path: polygon(0% 20%, 93% 20%, 93% 0, 100% 20%, 100% 80%, 10% 80%);background-color: #DE4439;">
                                    <h4 class="text-center pt-4 " style="color: #FFFFFF">${volunteer.team}</h4>
                                </div>
                                <h5 class="card-title pricing-card-title text-center">${volunteer.name}</h5>
                                <div class="py-2" style="background-color: #E5E5E5;">
                                    <h5 class="text-blue-scse text-center mt-1">Tình nguyện viên</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }).join('')
    $('#volunteers').html(html)
}
getThongTin()