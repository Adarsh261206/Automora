/* ═══════════════════════════════════════════════════════════
   MOTION SYSTEM — Premium Enhancement Layer
   Non-destructive motion upgrades for existing site
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─── INITIALIZATION ───
  let lenis;
  
  function init() {
    console.log('🎬 Motion System: Initializing...');
    
    // Mark body as loading
    document.body.classList.add('motion-loading');
    
    // Initialize all systems
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    initMagneticButtons();
    initHeroEnhancements();
    
    // Mark as ready after brief delay
    setTimeout(() => {
      document.body.classList.remove('motion-loading');
      document.body.classList.add('motion-ready');
      console.log('✨ Motion System: Ready');
    }, 100);
  }

  // ─── SMOOTH SCROLL (LENIS) ───
  function initSmoothScroll() {
    // Check if Lenis is available
    if (typeof Lenis === 'undefined') {
      console.warn('⚠️ Lenis not loaded, skipping smooth scroll');
      return;
    }

    // Initialize Lenis
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Lenis RAF
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor link smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.5
          });
        }
      });
    });

    console.log('✓ Smooth scroll initialized');
  }

  // ─── SCROLL ANIMATIONS ───
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
    
    console.log(`✓ Scroll animations initialized (${animatedElements.length} elements)`);
  }

  // ─── PARALLAX SYSTEM ───
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Only apply parallax when element is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const distance = scrolled - elementTop + viewportHeight;
          const movement = distance * speed;
          const maxMovement = 40; // Limit movement to prevent layout issues
          const clampedMovement = Math.max(-maxMovement, Math.min(maxMovement, movement));
          
          el.style.transform = `translateY(${clampedMovement}px)`;
        }
      });

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    updateParallax(); // Initial call

    console.log(`✓ Parallax initialized (${parallaxElements.length} elements)`);
  }

  // ─── MAGNETIC BUTTONS ───
  function initMagneticButtons() {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    if (magneticElements.length === 0) return;

    magneticElements.forEach(el => {
      el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const maxDistance = 20;
        const distance = Math.sqrt(x * x + y * y);
        const strength = Math.min(distance / 100, 1);
        
        const moveX = (x / rect.width) * maxDistance * strength;
        const moveY = (y / rect.height) * maxDistance * strength;
        
        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      el.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });

    console.log(`✓ Magnetic buttons initialized (${magneticElements.length} elements)`);
  }

  // ─── HERO ENHANCEMENTS ───
  function initHeroEnhancements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Enhanced mouse parallax for hero blobs
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateHeroParallax() {
      // Smooth lerp
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      const blob = document.querySelector('.hero-blob');
      const blob2 = document.querySelector('.hero-blob2');

      if (blob) {
        const moveX = currentX * 30;
        const moveY = currentY * 20;
        blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      if (blob2) {
        const moveX = currentX * -20;
        const moveY = currentY * -15;
        blob2.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      requestAnimationFrame(animateHeroParallax);
    }

    // Only on desktop
    if (window.innerWidth >= 768) {
      animateHeroParallax();
    }

    console.log('✓ Hero enhancements initialized');
  }

  // ─── PAGE TRANSITION HELPER ───
  function initPageTransitions() {
    // Add transition class to pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.add('page-transition');
      if (page.classList.contains('on')) {
        page.classList.add('active');
      }
    });

    // Listen for page changes (if using existing nav system)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList.contains('on')) {
            setTimeout(() => target.classList.add('active'), 10);
          } else {
            target.classList.remove('active');
          }
        }
      });
    });

    document.querySelectorAll('.page').forEach(page => {
      observer.observe(page, { attributes: true });
    });
  }

  // ─── PERFORMANCE MONITORING ───
  function checkPerformance() {
    // Disable heavy animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.body.classList.add('reduced-motion');
      console.log('⚡ Reduced motion mode enabled (low-end device)');
    }

    // Respect user preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
      console.log('⚡ Reduced motion mode enabled (user preference)');
    }
  }

  // ─── UTILITY: Refresh animations on page change ───
  window.refreshMotionSystem = function() {
    initScrollAnimations();
    console.log('🔄 Motion system refreshed');
  };

  // ─── START ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  checkPerformance();

})();
