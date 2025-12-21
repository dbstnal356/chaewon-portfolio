
document.addEventListener('DOMContentLoaded', function() {
    
    // 커서 요소 가져오기
    const cursor = document.getElementById('cursor');
    
    if (cursor) {
        // 마우스 움직임 따라가기
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // 클릭 효과
        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicking');
        });
        
        // 트레일 효과
        let lastX = 0, lastY = 0;

        document.addEventListener('mousemove', (e) => {
            const speed = Math.sqrt(
                Math.pow(e.clientX - lastX, 2) + 
                Math.pow(e.clientY - lastY, 2)
            );
            
            // 빠르게 움직일 때만 트레일 생성
            if (speed > 25) {
                createTrail(e.clientX, e.clientY);
            }
            
            lastX = e.clientX;
            lastY = e.clientY;
        });

        function createTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'neon-trail';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            
            trail.innerHTML = `
                <svg width="15" height="15" viewBox="0 0 100 100">
                    <path d="M50 5 L61 35 L95 35 L68 55 L79 90 
                             L50 70 L21 90 L32 55 L5 35 L39 35 Z" 
                          fill="#FFCF51" opacity="0.6"/>
                </svg>
            `;
            
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 500);
        }
    }
    
    /* main의 반짝임 효과 */
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
            toggleActions: "restart reset restart reset",
        }
    });

    // about me 글자 span 분해
    function splitToSpans(el) {
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
    if (title) {
        splitToSpans(title);

        // 스크롤 진입 시 재생
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    title.classList.remove('is-play');
                    void title.offsetWidth;
                    title.classList.add('is-play');
                }
            });
        }, { threshold: 0.4 });

        io.observe(title);
    }

    gsap.registerPlugin(ScrollTrigger);

    // 상단 카드
    gsap.to('.tt', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.sm_box',
            start: 'top 70%',
            toggleActions: 'play none none reset'
        }
    });

    // intro 문장
    gsap.from('.info_row ', {
        opacity: 0,
        y: 10,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.intro_text',
            start: 'top 75%',
            toggleActions: 'play none none reset'
        }
    });

    /* 스킬 모션 효과 */
    const cards = gsap.utils.toArray(".skills .skill_card");
    const topRow = cards.slice(0, 4);
    const bottomRow = cards.slice(4, 8);

    gsap.set(cards, { opacity: 0, y: 14 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".skills",
            start: "top 70%",
            toggleActions: "play none none reset",
        }
    });

    tl.fromTo(topRow,
        { x: 90, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.10 },
        0
    )
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

    let activeImage;

    gsap.utils.toArray(".con02 ul li a").forEach((elem) => {
        let image = elem.querySelector("img.fadeImg"),
            align = (e) => {
                setX(e.clientX);
                setY(e.clientY);
            },
            startPoint = () => document.addEventListener("mousemove", align),
            stopPoint = () => document.removeEventListener("mousemove", align),
            fade = gsap.to(image, { autoAlpha: 0.8, ease: "none", paused: true });

        elem.addEventListener("mouseenter", (e) => {
            fade.play();
            startPoint();

            if (activeImage) {
                gsap.set(image, {
                    x: gsap.getProperty(activeImage, "x"),
                    y: gsap.getProperty(activeImage, "y"),
                });
            }

            activeImage = image;
            setX = gsap.quickTo(image, "x", { duration: 0.5, ease: "elastic" });
            setY = gsap.quickTo(image, "y", { duration: 0.5, ease: "elastic" });

            align(e);
        });
        elem.addEventListener("mouseleave", () => fade.reverse());
    });

}); // DOMContentLoaded 끝


// 메뉴 토글 함수 (전역)
function toggleMenu() {
    const menuToggle = document.querySelector('.menu_toggle');
    const navMenu = document.querySelector('.nav_menu');
    
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// 메뉴 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
    const navContainer = document.querySelector('.nav_container');
    if (navContainer && !navContainer.contains(e.target)) {
        const menuToggle = document.querySelector('.menu_toggle');
        const navMenu = document.querySelector('.nav_menu');
        if (menuToggle) menuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
});


/* scroll animation */
$(function () {
    $('.animate').scrolla({
        mobile: true,
        once: false
    });
});

$(function () {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        '(min-width:1024px)': function () {
            /* 가로스크롤 */
            let list = gsap.utils.toArray('.work ul li');
            let scrollTween = gsap.to(list, {
                xPercent: -100 * (list.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.work',
                    pin: true,
                    scrub: 1,
                    start: 'center center',
                    end: '300%',
                }
            });

            gsap.utils.toArray('.imgBox').forEach(function (imgBox) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        containerAnimation: scrollTween,
                        start: 'center right',
                        end: 'center center',
                        scrub: true,
                    }
                })
                .to(imgBox, { 'clip-path': 'inset(0%)', ease: 'none', duration: 1 }, 0)

                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        containerAnimation: scrollTween,
                        start: 'center center',
                        end: 'center left',
                        scrub: true,
                    }
                })
                .to(imgBox, { 'clip-path': 'inset(30%)', ease: 'none', duration: 1 }, 0)
            });

            gsap.utils.toArray('.work ul li .textBox').forEach(function (textBox) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: textBox,
                        containerAnimation: scrollTween,
                        start: 'center 70%',
                        end: 'center 40%',
                        scrub: true,
                    }
                })
                .to(textBox, { 'opacity': '1', 'x': -100 }, 0)

                gsap.timeline({
                    scrollTrigger: {
                        trigger: textBox,
                        containerAnimation: scrollTween,
                        start: 'center 30%',
                        end: 'center 20%',
                        scrub: true,
                    }
                })
                .to(textBox, { 'opacity': '0' }, 0)

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
                        onEnterBack: self => counter.innerText = num,
                    })
                })
            });
        }
    })

    // process 애니메이션
    const processSection = document.querySelector('.process');
    if (processSection) {
        const observer = new IntersectionObserver((entries) => {
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

        observer.observe(processSection);
    }

    // footer 애니메이션
    const footerInner = document.querySelector('.footer .inner');
    if (footerInner) {
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
    }
});
