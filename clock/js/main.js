$(function () {
    let ht = $(window).height();
    $(window).resize(function () { 
        ht = $(window).height();
        $('section').height(ht);
    });
    /* 스크롤 이벤트 = 메뉴 on clss */
    $(window).on('scroll', function () {
        let sct = $(window).scrollTop();
        let sectionLength = $('#wrap section').length;
        for (let i = 0; i < sectionLength; i++) {
            if (sct >= ht * i && sct < ht * (i + 1)) {
                $('ul#menu li').removeClass().eq(i).addClass('on');
            }
        }
    });

    let isScrolling = false; //스크롤 중복 방지
    $('section').on('wheel mousewheel DOMMouseScroll', function (e) {
        if (isScrolling) return; //스크롤 중이라면 중복 실행 방지
        e.preventDefault();
        let delta = e.originalEvent.deltaY || -e.originalEvent.wheelDelta || e.originalEvent.detail;
        let nav = delta >0 ? $(this).next() : $(this).prev();

        if (nav.length) {
            isScrolling = true;
            let moveTop = nav.offset().top;
            $('html,body').stop().animate({
                scrollTop :moveTop
            },400, function () { 
                isScrolling = false;//스크롤 완료 후 다시 허용
            })
        }
    });


    //마우스 무브 이벤트
    $('section').on('mousemove', function (e) {
        let posX = e.pageX;
        let posY = e.pageY;
        /* .p11{position: absolute; bottom: 20px; right: 20px;}
        .p12{position: absolute; bottom: -40px; right: 130px;}
        .p13{position: absolute; top:180px; right: 60px;} */
        // console.log(posX, posY);
        $('.p11').css({
            bottom: 20 - (posY / 30),
            right: 20 - (posX / 30)
        });
        $('.p12').css({
            bottom: -400 + (posY / 20),
            right: 130 + (posX / 20)
        });
        $('.p13').css({
            top: 180 + (posY / 50),
            right: 60 + (posX / 50)
        });
        /* .p21{position: absolute; bottom: -480px; right: -180px;}
        .p22{position: absolute; bottom: -40px; right: 130px;} */
        $('.p21').css({
            bottom: 480 - (posX / 30), 
            right :180 -(posY/30)
        });
        $('.p22').css({
            bottom: 40 - (posX / 50), 
            right : -130 -(posY/50)
        });
        /* .p31{position: absolute;bottom: 30px; right: 180px;}
        .p32{position: absolute;bottom: -270px; right: 110px;}
        .p33{position: absolute; bottom: -130px; right: -70px;} */
        $('.p31').css({
            bottom: -40 - (posX / 50), 
            right : -180 -(posY/50)
        });
        $('.p32').css({
            bottom: -270 - (posX / 30), 
            right : -110 -(posY/50)
        });
        $('.p33').css({
            bottom: 140 - (posX / 50), 
            right : 80 -(posY/50)
        });
        /* .p41{position: absolute; bottom: -120px; right: 20px;}
.p42{position: absolute;bottom: -180px; right: 0;} */
        
$('.p41').css({
    bottom: 140 - (posX / 50), 
    right : 80 -(posY/50)
});
$('.p42').css({
    bottom: 140 - (posX / 50), 
    right : 80 -(posY/50)
});
    });

});