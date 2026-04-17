/* ================================================================
   REGO – ABOUT US PAGE SCRIPTS
   File: js/about-us.js
   Purpose: Interactivity for About Us page sections.
================================================================ */

(function($) {
  'use strict';

  /* ================================================================
     1. SCROLL REVEAL (IntersectionObserver)
  ================================================================ */
  function initScrollReveal() {
    // Get all reveal elements
    const revealElements = document.querySelectorAll('.rego_reveal');

    if (!revealElements.length) {
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rego_revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe each element
    revealElements.forEach((el) => {
      observer.observe(el);
    });
  }

  /* ================================================================
     2. ANIMATED STAT COUNTERS
  ================================================================ */
  function initStatCounters() {
    const statValues = document.querySelectorAll('.rego_about_stat_value[data-target]');

    if (!statValues.length) {
      return;
    }

    let countersStarted = false;

    const startCounters = () => {
      if (countersStarted) return;
      countersStarted = true;

      statValues.forEach((element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * easeProgress);

          element.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      });
    };

    // Start counters when section comes into view
    const statsSection = document.querySelector('.rego_about_stats');
    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(statsSection);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(statsSection);
    }
  }

  /* ================================================================
     3. TIMELINE MILESTONE ENTRANCE ANIMATION
  ================================================================ */
  function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.rego_about_timeline_item');

    if (!timelineItems.length) {
      return;
    }

    timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = `opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s,
                                transform 0.55s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    });

    const timelineSection = document.querySelector('.rego_about_story');
    if (timelineSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            timelineItems.forEach((item) => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            });
            observer.unobserve(timelineSection);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(timelineSection);
    }
  }

  /* ================================================================
     4. TEAM CARD HOVER EFFECTS
  ================================================================ */
  function initTeamCardHover() {
    const teamAvatars = document.querySelectorAll('.rego_about_team_avatar');

    teamAvatars.forEach((avatar) => {
      avatar.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.12)';
      });

      avatar.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }

  /* ================================================================
     5. PRESS CARD GLOW EFFECT
  ================================================================ */
  function initPressCardGlow() {
    const pressCards = document.querySelectorAll('.rego_about_press_card');

    pressCards.forEach((card) => {
      card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 16px 48px rgba(74, 86, 158, 0.25)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
      });
    });
  }

  /* ================================================================
     6. SMOOTH SCROLL TO TEAM SECTION
  ================================================================ */
  function initSmoothScroll() {
    $('a[href="#rego_about_team"]').on('click', function(e) {
      e.preventDefault();
      const target = $('#rego_about_team');

      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 80
          },
          800,
          'easeInOutCubic'
        );
      }
    });
  }

  /* ================================================================
     7. AWARD BADGE COUNTER ANIMATION
  ================================================================ */
  function initAwardBadgeAnimation() {
    const awardBadges = document.querySelectorAll('.rego_about_award_badge');

    awardBadges.forEach((badge, index) => {
      badge.style.opacity = '0';
      badge.style.transform = 'scale(0.8)';
      badge.style.transition = `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s,
                                 transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
    });

    const awardsSection = document.querySelector('.rego_about_awards');
    if (awardsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            awardBadges.forEach((badge) => {
              badge.style.opacity = '1';
              badge.style.transform = 'scale(1)';
            });
            observer.unobserve(awardsSection);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(awardsSection);
    }
  }

  /* ================================================================
     8. INITIALIZATION
  ================================================================ */
  function init() {
    initScrollReveal();
    initStatCounters();
    initTimelineAnimation();
    initTeamCardHover();
    initPressCardGlow();
    initSmoothScroll();
    initAwardBadgeAnimation();
  }

  // Initialize on document ready
  $(document).ready(function() {
    init();
  });

})(jQuery);
