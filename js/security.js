/* ================================================================
   REGO – SECURITY PAGE JAVASCRIPT
   File: js/security.js
   Purpose: Interactive features for the Security page.
================================================================ */

(function($) {
  'use strict';

  /* ================================================================
     1. SCROLL REVEAL WITH INTERSECTION OBSERVER
  ================================================================ */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.rego_reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rego_revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => {
      observer.observe(el);
    });
  }

  /* ================================================================
     2. FAQ ACCORDION
  ================================================================ */
  function initFAQAccordion() {
    $('.rego_sec_faq_trigger').on('click', function() {
      const $item = $(this).closest('.rego_sec_faq_item');
      const $body = $item.find('.rego_sec_faq_body');
      const isOpen = $item.hasClass('rego_sec_faq_open');

      // Close all other items
      $('.rego_sec_faq_item').each(function() {
        const $otherItem = $(this);
        if ($otherItem.not($item).hasClass('rego_sec_faq_open')) {
          $otherItem.removeClass('rego_sec_faq_open');
          $otherItem.find('.rego_sec_faq_body').slideUp(300);
        }
      });

      // Toggle current item
      if (isOpen) {
        $item.removeClass('rego_sec_faq_open');
        $body.slideUp(300);
      } else {
        $item.addClass('rego_sec_faq_open');
        $body.slideDown(300);
      }
    });
  }

  /* ================================================================
     3. CERTIFICATION CARD STAGGER ENTRANCE
  ================================================================ */
  function initCertCardStagger() {
    const cards = document.querySelectorAll('.rego_sec_cert_card');
    cards.forEach((card, index) => {
      // Staggered animation delays are handled by CSS classes
      // This function could add additional timing logic if needed
    });
  }

  /* ================================================================
     4. INFRASTRUCTURE TERMINAL TYPEWRITER EFFECT
  ================================================================ */
  function initTerminalTypewriter() {
    const terminal = document.querySelector('.rego_sec_infra_terminal');

    // Detect when terminal enters viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add class to trigger animations via CSS
          entry.target.classList.add('rego_sec_terminal_active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    if (terminal) {
      observer.observe(terminal);
    }
  }

  /* ================================================================
     5. SMOOTH SCROLL FOR ANCHOR LINKS
  ================================================================ */
  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      const href = $(this).attr('href');

      // Skip if href is just "#"
      if (href === '#') {
        return;
      }

      const $target = $(href);

      if ($target.length) {
        e.preventDefault();

        // Account for fixed header
        const headerHeight = $('#rego_header').outerHeight() || 72;
        const targetTop = $target.offset().top - headerHeight;

        $('html, body').animate({
          scrollTop: targetTop
        }, 800, 'swing');
      }
    });
  }

  /* ================================================================
     6. COPY-ON-CLICK FOR CODE/CONFIG SNIPPETS
  ================================================================ */
  function initCopyOnClick() {
    // Add copy functionality to terminal/code blocks if needed
    $(document).on('click', '.rego_sec_copy_btn', function() {
      const $btn = $(this);
      const $codeBlock = $btn.closest('.rego_sec_code_block');
      const $codeText = $codeBlock.find('code');
      const text = $codeText.text();

      // Copy to clipboard
      const temp = $('<textarea>');
      $('body').append(temp);
      temp.val(text).select();
      document.execCommand('copy');
      temp.remove();

      // Show feedback
      const originalText = $btn.text();
      $btn.text('Copied!');

      setTimeout(() => {
        $btn.text(originalText);
      }, 2000);
    });
  }

  /* ================================================================
     7. CERT STATUS PILL ANIMATION
  ================================================================ */
  function initCertStatusPills() {
    const pills = document.querySelectorAll('.rego_status_pill');

    pills.forEach((pill) => {
      // Add subtle pulse animation on page load
      pill.style.animation = 'none';
      setTimeout(() => {
        pill.style.animation = '';
      }, 100);
    });
  }

  /* ================================================================
     8. FAQ KEYBOARD NAVIGATION
  ================================================================ */
  function initFAQKeyboardNav() {
    $('.rego_sec_faq_trigger').on('keydown', function(e) {
      // Enter or Space to expand/collapse
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).click();
      }

      // Arrow Down to next item
      if (e.key === 'ArrowDown') {
        const $nextItem = $(this).closest('.rego_sec_faq_item').next();
        if ($nextItem.length) {
          $nextItem.find('.rego_sec_faq_trigger').focus();
        }
      }

      // Arrow Up to previous item
      if (e.key === 'ArrowUp') {
        const $prevItem = $(this).closest('.rego_sec_faq_item').prev();
        if ($prevItem.length) {
          $prevItem.find('.rego_sec_faq_trigger').focus();
        }
      }
    });

    // Ensure triggers are keyboard accessible
    $('.rego_sec_faq_trigger').attr('role', 'button').attr('tabindex', '0');
  }

  /* ================================================================
     9. DOCUMENT READY - INITIALIZE ALL FEATURES
  ================================================================ */
  $(document).ready(function() {
    initScrollReveal();
    initFAQAccordion();
    initCertCardStagger();
    initTerminalTypewriter();
    initSmoothScroll();
    initCopyOnClick();
    initCertStatusPills();
    initFAQKeyboardNav();

    // Log initialization (optional, for debugging)
    if (window.console && window.console.log) {
      console.log('Security page initialized');
    }
  });

  /* ================================================================
     10. WINDOW RESIZE - RESPONSIVE ADJUSTMENTS
  ================================================================ */
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Add any resize-specific logic here
    }, 250);
  });

})(jQuery);
