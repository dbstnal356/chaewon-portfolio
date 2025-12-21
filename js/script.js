function toggleMenu() {
            const menuToggle = document.querySelector('.menu_toggle');
            const navMenu = document.querySelector('.nav_menu');
            
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        }

        // 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            const navContainer = document.querySelector('.nav-container');
            if (!navContainer.contains(e.target)) {
                document.querySelector('.menu_toggle').classList.remove('active');
                document.querySelector('.nav_menu').classList.remove('active');
            }



        });


/* main의 반짝임 효과 */

        document.addEventListener('DOMContentLoaded', function() {
  let index = 0;
  const interval = 1000;

  const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = (star) => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  }

  for (const star of document.getElementsByClassName("magic-star")) {
    setTimeout(() => {
      animate(star);
      setInterval(() => animate(star), 1000);
    }, index++ * (interval / 3));
            }






         /* about me 사진 효과 */   
   gsap.to(".about .img-reveal", {
  yPercent: -100,
  duration: 1.5,
  ease: "power4.inOut",
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    //      onEnter   onLeave  onEnterBack  onLeaveBack
    toggleActions: "restart   reset   restart     reset",
    // once: false   // 혹시 once:true 써놨으면 꼭 false 또는 제거!
  }
   });
            


            
 // about me 글자 span 분해
function splitToSpans(el){
const text = el.dataset.text || el.textContent;
el.textContent = "";
[...text].forEach((ch, i) => {
const span = document.createElement("span");
span.textContent = ch === " " ? "\u00A0" : ch;
span.style.setProperty("--i", i);
el.appendChild(span);
});
}


const title = document.querySelector('.fancyTitle');
splitToSpans(title);


// 스크롤 진입 시 재생
const io = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting){
title.classList.remove('is-play');
void title.offsetWidth; // reflow
title.classList.add('is-play');
}
});
}, { threshold: 0.4 });


io.observe(title);

            
            gsap.registerPlugin(ScrollTrigger);


// 상단 카드
gsap.to('.tt',{
opacity:1,
y:0,
duration:0.8,
ease:'power2.out',
scrollTrigger:{
trigger:'.sm_box',
start:'top 70%',
toggleActions:'play none none reset'
}
});






// intro 문장
gsap.from('.info_row ',{
opacity:0,
y:10,
duration:0.8,
stagger:0.12,
ease:'power2.out',
scrollTrigger:{
trigger:'.intro_text',
start:'top 75%',
toggleActions:'play none none reset'
}
});
 
/* gsap.from('.txt_box p ', {
opacity:0,
y:10,
duration:2.5,
stagger:0.12,
ease:'power2.out',
scrollTrigger:{
trigger:'.txt_box',
start:'top 75%',
toggleActions:'play none none reset'
}
}); */
            
            
            
            /* 스킬 모션 효과 */
gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".skills .skill_card");
const topRow = cards.slice(0, 4);     // 위 4개
const bottomRow = cards.slice(4, 8);  // 아래 4개

// 초기 상태(살짝 아래 + 투명)
gsap.set(cards, { opacity: 0, y: 14 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".skills",
    start: "top 70%",
    toggleActions: "play none none reset",
    // markers: true
  }
});

// 위 4개: 오른쪽에서 들어오기
tl.fromTo(topRow,
  { x: 90, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.10 },
  0
)

// 아래 4개: 왼쪽에서 들어오기
.fromTo(bottomRow,
  { x: -90, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.10 },
  0.12
);

            
            
            
            gsap.from(["h3.en", ".txt_s"], {
  y: 24,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.15,
  scrollTrigger: {
    trigger: "h3.en",
    start: "top 75%",
    toggleActions: "play none none reset"
  }
});

            




             gsap.registerPlugin(ScrollTrigger);

      let activeImage; //변수선언

      gsap.utils.toArray(".con02 ul li a").forEach((elem) => {
        let image = elem.querySelector("img.fadeImg"),
          //.con02 ul li a를 배열을 forEach문으로  elem매개변수로 반복문실행 ,
          //elem의 하위요소,showImg를 image에 저장

          align = (e) => {
            setX(e.clientX);
            setY(e.clientY);
          },
          /* 이벤트발생시 현재 마우스 위치의 x, y 좌표를 setX, setY 변수에 할당.
            여기서 clientX, clientY값은 스크롤과 상관없이 현재 브라우스의 top 0을 기준으로
            마우스의 좌표값을 구합니다. */

          startPoint = () => document.addEventListener("mousemove", align),
          //startPoint함수는 mousemove이벤트와 align함수가 실행되는 함수

          stopPoint = () => document.removeEventListener("mousemove", align),
          //stopPoint함수는 mousemove와 align함수가 제거되는 함수

          fade = gsap.to(image, { autoAlpha: 0.8, ease: "none", paused: true });
        //변수fade는 이미지가 자동투명도를 0.8되서 일시정지하여 변수 fade에 대입함

        elem.addEventListener("mouseenter", (e) => {
          fade.play();
          startPoint();
          //.con02 ul li a영역에 들어갔을때 fade변수가 실행되고,  startPoint()함수가 호출되라

          //조건식:  activeImage가 있으면 참이되어 gsap바로 세팅
          if (activeImage) {
            gsap.set(image, {
              x: gsap.getProperty(activeImage, "x"),
              y: gsap.getProperty(activeImage, "y"),
            });
          }
          //이미지의 X값는  activeImage의 x값을 가져오고
          //이미지의 y값은  activeImage의 y값을 가져오고
          //gsap.getProperty()는 ( activeImage의 x값, y값)=> 속성을 반환

          activeImage = image; //img.fadeImg값을가진 변수 image가  activeImage에 저장
          (setX = gsap.quickTo(image, "x", { duration: 0.5, ease: Elastic })),
            (setY = gsap.quickTo(image, "y", { duration: 0.5, ease: Elastic }));
          // setX, setY 변수를 gsap.quickTo() 메소드를 사용하여, image 요소의 x, y 위치를 빠르게 변경

          align(e);
          //마우스 위치의 x, y 좌표를 setX, setY 변수에 할당하는 함수 호출
        });
        elem.addEventListener("mouseleave", () => fade.reverse());
        //reverse() =>애니메이션이 뒤로 향하여 재생 반전
      });
      //.reverse() => 애니메이션모든 측면이 뒤로 향하도록 재생 반전






        });



        
/* scroll animation */
$(function () {

    $('.animate').scrolla({
        mobile: true,
        once: false //스크롤할때 마다 작동할때 false
    });

});

$(function () {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        '(min-width:1024px)': function () {
        
            /* 02.가로스크롤 */
            let list = gsap.utils.toArray('.work ul li');
            let scrollTween = gsap.to(list, {
                xPercent: -100 * (list.length - 1),
                //원래 리스트의 갯수보다 1을 빼서 길이를 구한 후 에 가로로 이동
                ease: 'none',
                scrollTrigger: {
                    trigger: '.work',
                    pin: true,
                    scrub: 1,
                    start: 'center center',
                    end: '300%', //뷰포트 높이의 300% -> 숫자가 클수록 느려진다
                    //markers:true
                }
            });

            //imgBox 모션
            gsap.utils.toArray('.imgBox').forEach(function (imgBox) {
                
                //imgBox 커지는 애니메이션 => 화면 오른쪽에서 커지기 시작해서 중앙에서 끝내는 애니
                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        //containerAnimation 가로 스크롤 시점에서 트리거 잡아주는 옵션
                        containerAnimation: scrollTween,
                        start: 'center right',
                        end: 'center center',
                        scrub: true,
                        // markers:true
                    }
                })
                    .to(imgBox, { 'clip-path': 'inset(0%)', ease: 'none', duration: 1 }, 0)

                //imgBox 작아지는 애니메이션 => 화면 중앙에서 작아져서 시작해서 왼쪽서 끝내는 애니
                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        //containerAnimation 가로 스크롤 시점에서 트리거 잡아주는 옵션
                        containerAnimation: scrollTween,
                        start: 'center center',
                        end: 'center left',
                        scrub: true,
                        //markers: true
                    }
                })
                    .to(imgBox, { 'clip-path': 'inset(30%)', ease: 'none', duration: 1 }, 0)
            }); //imgBox end

            //textBox 모션
            gsap.utils.toArray('.work ul li .textBox').forEach(function (textBox) {
                
                //textBox 커지는 애니메이션 => 화면 오른쪽에서 커지기 시작해서 중앙에서 끝내는 애니
                gsap.timeline({
                    scrollTrigger: {
                        trigger: textBox,
                        //containerAnimation 가로 스크롤 시점에서 트리거 잡아주는 옵션
                        containerAnimation: scrollTween,
                        start: 'center 70%',
                        end: 'center 40%',
                        scrub: true,
                        // markers:true
                    }
                })
                    .to(textBox, { 'opacity': '1', 'x':-100 }, 0)

                //textBox 작아지는 애니메이션 => 화면 중앙에서 작아져서 시작해서 왼쪽서 끝내는 애니
                gsap.timeline({
                    scrollTrigger: {
                        trigger: textBox,
                        //containerAnimation 가로 스크롤 시점에서 트리거 잡아주는 옵션
                        containerAnimation: scrollTween,
                        start: 'center 30%',
                        end: 'center 20%',
                        scrub: true,
                        //markers: true
                    }
                })
                    .to(textBox, { 'opacity': '0' }, 0)
                
                //counter 텍스트 변경
                gsap.utils.toArray('.num').forEach(function (text) {
                    let num = text.getAttribute('data-text')
                    let counter = document.querySelector('.counter .now');

                    ScrollTrigger.create({
                        trigger: text,
                        start: '0% center',
                        end: '100% center',
                        scrub: true,
                        containerAnimation: scrollTween,
                        onEnter: self => counter.innerText = num,
                        //스크롤위치가 start를 지나 앞으로 이동할때 .counter .now에 적어준다
                        onEnterBack: self => counter.innerText = num,
                        //스크롤위치가 end를 지나 뒤로 이동할때 .counter .now에 적어준다
                        //markers: true
                    })

                })
                
                
            }); //textBox end




        }
    })




  
    // process 애니메이션
const processSection = document.querySelector('.process');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 화면에 보이면 → 애니메이션 실행
            entry.target.classList.add('animate');
        } else {
            // 화면에서 벗어나면 → 초기화 (다시 숨김)
            entry.target.classList.remove('animate');
        }
    });
}, {
    threshold: 0.3
});

  observer.observe(processSection);
  





  // footer 애니메이션
const footerInner = document.querySelector('.footer .inner');

const observers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, {
    threshold: 0.3
});

observers.observe(footerInner);




});



        