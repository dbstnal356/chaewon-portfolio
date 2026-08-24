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


// ================================
// 타임라인 스크롤 애니메이션
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const topProgress = document.getElementById('topProgress');
  const timelineFill = document.getElementById('timelineFill');
  const timelineSection = document.getElementById('timelineSection');
  const currentYearDisplay = document.getElementById('currentYear');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - windowHeight;

    // 프로그레스 바
    if (topProgress) {
      topProgress.style.width = (scrollY / docHeight) * 100 + '%';
    }

    // 타임라인 계산
    if (!timelineSection || !timelineFill || timelineItems.length === 0) return;

    const sectionRect = timelineSection.getBoundingClientRect();
    const sectionTop = sectionRect.top + scrollY;

    // 마지막 아이템
    const lastItem = timelineItems[timelineItems.length - 1];
    const maxHeight = lastItem.offsetTop + 50;
    const lastItemRect = lastItem.getBoundingClientRect();

    // 타임라인 채우기
    const scrollInSection = scrollY - sectionTop + windowHeight * 0.5;
    timelineFill.style.height = (scrollInSection > 0)
      ? Math.min(scrollInSection, maxHeight) + 'px'
      : '0px';

    // 타임라인 아이템 나타남
    let activeYear = '1996';
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const dot = item.querySelector('.timeline-dot');
      const content = item.querySelector('.timeline-content');

      if (rect.top < windowHeight * 0.6) {
        dot?.classList.add('active');
        content?.classList.add('visible');
        activeYear = item.dataset.year;
      } else {
        dot?.classList.remove('active');
      }
    });

    // 현재 연도 표시
    if (currentYearDisplay) {
      if (scrollY >= sectionTop - windowHeight * 0.5 && lastItemRect.top > -lastItemRect.height) {
        currentYearDisplay.classList.add('show');
        currentYearDisplay.textContent = activeYear;
      } else {
        currentYearDisplay.classList.remove('show');
      }
    }
  }

  // 스크롤 최적화
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  onScroll();
});


// ================================
// jQuery + GSAP 애니메이션
// ================================
$(function () {
  gsap.registerPlugin(ScrollTrigger);

  // --------------------------------
  // con02 GSAP 애니메이션
  // --------------------------------
  
  // title 글자 애니메이션
  gsap.timeline({
    scrollTrigger: {
      trigger: '.con02',
      start: '0% 100%',
      end: '0% 20%',
      scrub: 1,
    }
  })
  .fromTo('.con02 .title .a', { x: '-100%' }, { x: '0%', ease: 'none', duration: 5 }, 0)
  .fromTo('.con02 .title .b', { x: '100%' }, { x: '0%', ease: 'none', duration: 5 }, 0);

  // workList 배경색 변경
  gsap.timeline({
    scrollTrigger: {
      trigger: '.workList',
      start: '0% 100%',
      end: '0% 100%',
      scrub: 1,
    }
  })
  .to('.wrap', { backgroundColor: '#000', color: '#fff', ease: 'none', duration: 5 }, 0)
  .to('.con02 .title', { position: 'fixed', ease: 'none', left: '0', top: '0', width: '100%', duration: 5 }, 0)
  .fromTo('.workList', 
    { margin: '0 auto' }, 
    { margin: '100vh auto 0', position: 'relative', zIndex: '10', duration: 1 }, 0
  );

  // workList 끝날 때 title 사라짐
  gsap.timeline({
    scrollTrigger: {
      trigger: '.workList',
      start: '100% 50%',
      end: '100% 0%',
      scrub: 1,
    }
  })
  .to('.con02 .title .a', { x: '-100%', ease: 'none', duration: 5 }, 0)
  .to('.con02 .title .b', { x: '100%', ease: 'none', duration: 5 }, 0);


  // --------------------------------
  // Strength 아코디언
  // --------------------------------
  document.querySelectorAll('.strength-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      
      // 다른 열린 항목 닫기
      document.querySelectorAll('.strength-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
        }
      });
      
      // 현재 항목 토글
      item.classList.toggle('active');
    });
  });


  // --------------------------------
  // Story & Hobby 헤더 애니메이션 (공통)
  // --------------------------------
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // story와 hobby 모두 같은 클래스 패턴 사용
      const selectors = [
        '.story-chapter', '.story-title', '.story-desc', '.story-big-number',
        '.hobby-chapter', '.hobby-title', '.hobby-desc', '.hobby-big-number'
      ];
      
      const elements = entry.target.querySelectorAll(selectors.join(', '));
      
      if (entry.isIntersecting) {
        elements.forEach(el => el.classList.add('animate'));
      } else {
        elements.forEach(el => el.classList.remove('animate'));
      }
    });
  }, { 
    threshold: 0.3 
  });

  // story-header와 hobby-header 모두 관찰
  document.querySelectorAll('.story-header, .hobby-header').forEach(el => {
    headerObserver.observe(el);
  });


  // --------------------------------
  // 일반 텍스트 효과 (effect-text)
  // --------------------------------
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px'
  });

  document.querySelectorAll('.effect-text').forEach(el => {
    textObserver.observe(el);
  });

});
