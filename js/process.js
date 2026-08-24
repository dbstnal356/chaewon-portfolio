// ================================
// 네비게이션 메뉴
// ================================
function toggleMenu() {
  const menuToggle = document.querySelector('.menu_toggle');
  const navMenu = document.querySelector('.nav_menu');
  
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// 메뉴 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
  const navContainer = document.querySelector('.nav_container');
  const menuToggle = document.querySelector('.menu_toggle');
  const navMenu = document.querySelector('.nav_menu');
  
  if (navContainer && !navContainer.contains(e.target)) {
    menuToggle?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
});





gsap.registerPlugin(ScrollTrigger);

$(function(){
    /* 01.circle */
    gsap.timeline({
        scrollTrigger:{
            trigger:'.con6',
            start:'0% 50%',
            end:'30% 0%',
            scrub:1,
        }
    })
    .fromTo('.circle',
        {'width':'0','height':'0','duration':'10','ease':'elastic','top':'3%'},
        {'width':'2500px','height':'2500px','duration':'10','top':'30%'},0
    )

    /* textBox */
    gsap.timeline({
        scrollTrigger:{
            trigger:'.con6 .textBox',
            start:'0% 80%',
            end:'100% 80%',
            scrub:1,
        }
    })
    .fromTo('.textBox',
        {'top':'50%','duration':'5','ease':'elastic','opacity':'0'},
        {'duration':'5','ease':'none','opacity':'1','top':'40%'}
    )

    /* ========== Q1 모션 ========== */
    
    // Q1 질문 박스
    gsap.from('.qa-item .qa-box', {
        scrollTrigger: {
            trigger: '.qa-item',
            start: 'top 80%',
            toggleActions: 'play none none reset',
        },
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
    });
// 화살표 선 - 그려지는 효과
gsap.from('.qa-arrow line', {
    scrollTrigger: {
        trigger: '.qa-arrow',
        start: 'top 85%',
        toggleActions: 'play none none reset',
    },
    attr: { x2: 50 },  // 선 끝점이 50에서 시작 → 750으로
    duration: 1.2,
    ease: 'power2.out'
});

// 화살표 머리(삼각형) - 나중에 나타남
gsap.from('.qa-arrow polygon', {
    scrollTrigger: {
        trigger: '.qa-arrow',
        start: 'top 85%',
        toggleActions: 'play none none reset',
    },
    opacity: 0,
    scale: 0,
    duration: 0.3,
    delay: 1,  // 선이 다 그려진 후 나타남
    ease: 'back.out(2)'
});
    // Q1 설명 텍스트
    gsap.from('.qa-item .qa-description p', {
        scrollTrigger: {
            trigger: '.qa-item .qa-description',
            start: 'top 85%',
            toggleActions: 'play none none reset',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out'
    });

    /* ========== Q2 모션 ========== */
    
    gsap.from('.qa-box2', {
        scrollTrigger: {
            trigger: '.qa-item2',
            start: 'top 80%',
            toggleActions: 'play none none reset',
        },
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.qa-item2 .qa-description p', {
        scrollTrigger: {
            trigger: '.qa-item2 .qa-description',
            start: 'top 85%',
            toggleActions: 'play none none reset',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    });

    /* ========== Q3 모션 ========== */
    
    gsap.from('.qa-box3', {
        scrollTrigger: {
            trigger: '.qa-item3',
            start: 'top 80%',
            toggleActions: 'play none none reset',
        },
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.qa-item3 .qa-description p', {
        scrollTrigger: {
            trigger: '.qa-item3 .qa-description',
            start: 'top 85%',
            toggleActions: 'play none none reset',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    });

   
    gsap.from('.qimg_box', {  
        scrollTrigger: {
            trigger: '.qa-card-item', 
            start: 'top 75%',
            toggleActions: 'play none none reset',
        },
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.out'
    });

});