window.addEventListener('load',multilang)
        function multilang() {
            // Configuration
            // Add options
            i18n.init({
                resGetPath: '../../js/languages/__lng__.json',
                debug: true,
                fallbackLng: false,
                load: 'unspecific'
            },function () {
                    $('body').i18n();
                //$('body').i18n();
            });
            // English
            if(i18n.lng() === "en") {
                // Set active class
                $('li').removeClass('active');
                $('.english').parent().addClass('active');
                document.getElementById("LogoFooterEN").src = "../../images/LogoSCSE_Horizontal_English_Transparent.png";
                document.getElementById("LogoNav").src = "../../images/LogoSCSE_Horizontal_English_Transparent_white.png";
                document.getElementById("donateimg").src = "../../images/Donate.png";
                // Change language in dropdown
                document.title = "SCSE - Donate";
            }
            // Vietnam
            if(i18n.lng() === "vi") {
                // Set active class
                $('li').removeClass('active');
                $('.vietnam').parent().addClass('active');  
                // Change language in dropdown
                document.getElementById("LogoFooterEN").src = "../../images/LogoSCSE_Horizontal_Vietnamese.png";
                document.getElementById("LogoNav").src = "../../images/LogoSCSE_Horizontal_Vietnamese_white.png";
                document.getElementById("donateimg").src = "../../images/Group_399.png";
                document.title = "SCSE - Ủng Hộ";
            }
            
            // Change languages when click
            // English
            $('.english').on('click', function () {
                // Set language
                $.i18n.setLng('en', function() {
                    $('body').i18n();
                });
                // Set active class
                $('li').removeClass('active');
                $('.english').parent().addClass('active');
                document.getElementById("LogoFooterEN").src = "../../images/LogoSCSE_Horizontal_English_Transparent.png";
                document.getElementById("LogoNav").src = "../../images/LogoSCSE_Horizontal_English_Transparent_white.png";
                document.getElementById("donateimg").src = "../../images/Donate.png";
                document.title = "SCSE - Donate";
                // Change name language in dropdown
            });
            // Vietnam
            $('.vietnam').on('click', function () {
                // Set language
                $.i18n.setLng('vi', function() {
                    $('body').i18n();
                });
                // Set active class
                $('li').removeClass('active');
                $('.vietnam').parent().addClass('active');
                // Change name language in dropdown
                document.getElementById("LogoFooterEN").src = "../../images/LogoSCSE_Horizontal_Vietnamese.png";
                document.getElementById("LogoNav").src = "../../images/LogoSCSE_Horizontal_Vietnamese_white.png";
                document.getElementById("donateimg").src = "../../images/Group_399.png";
                document.title = "SCSE - Ủng Hộ";
            });
        };
        