/**
 * REGO – Main JavaScript
 * File: js/main.js
 * Handles:
 *  - Slick carousel: trust-bar logo ticker + testimonials
 *  - Platform tabs
 *  - Animated counter stats
 *  - Scroll-reveal animations via IntersectionObserver
 *  - Framework bar animations
 */

$(function () {
  'use strict';

  /* ================================================================
     1. TRUST BAR – Infinite logo ticker (Slick)
  ================================================================ */
  if ($('.rego_trust_carousel').length) {
    $('.rego_trust_carousel').slick({
      slidesToShow:   6,
      slidesToScroll: 1,
      autoplay:       true,
      autoplaySpeed:  0,
      speed:          3500,
      cssEase:        'linear',
      infinite:       true,
      arrows:         false,
      dots:           false,
      pauseOnHover:   true,
      swipe:          false,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 5 }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 4 }
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 3 }
        }
      ]
    });
  }

  /* ================================================================
     2. TESTIMONIALS – Standard slider with dots + arrows (Slick)
  ================================================================ */
  if ($('.rego_testimonials_carousel').length) {
    $('.rego_testimonials_carousel').slick({
      slidesToShow:   3,
      slidesToScroll: 1,
      autoplay:       true,
      autoplaySpeed:  5000,
      speed:          600,
      cssEase:        'cubic-bezier(0.4, 0, 0.2, 1)',
      infinite:       true,
      arrows:         true,
      dots:           true,
      pauseOnHover:   true,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow:   1,
            arrows:         false,
            dots:           true
          }
        }
      ]
    });
  }

  /* ================================================================
     3. PLATFORM TABS
  ================================================================ */
  var $tabBtns   = $('.rego_tab_btn');
  var $tabPanels = $('.rego_tab_panel');

  $tabBtns.on('click.regoTabs', function () {
    var $btn    = $(this);
    var tabId   = $btn.data('tab');
    var $target = $('#rego_tab_' + tabId);

    if ($btn.hasClass('active')) return;

    /* Deactivate all */
    $tabBtns.removeClass('active');
    $tabPanels.removeClass('active').hide();

    /* Activate selected */
    $btn.addClass('active');
    $target.addClass('active').hide().fadeIn(250);
  });

  /* ================================================================
     4. ANIMATED STAT COUNTERS
     Triggers when .rego_stats section enters viewport
  ================================================================ */
  var statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;
    statsAnimated = true;

    $('.rego_stat_num').each(function () {
      var $el     = $(this);
      var target  = parseFloat($el.data('target'));
      var isFloat = target % 1 !== 0;
      var suffix  = $el.find('span').text(); // % or +
      var start   = 0;
      var duration = 1800;
      var startTime = null;

      function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var current  = easeOut(progress) * target;

        if (isFloat) {
          $el.html(current.toFixed(1) + '<span>' + suffix + '</span>');
        } else {
          $el.html(Math.floor(current) + '<span>' + suffix + '</span>');
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          /* Ensure exact final value */
          if (isFloat) {
            $el.html(target.toFixed(1) + '<span>' + suffix + '</span>');
          } else {
            $el.html(Math.floor(target) + '<span>' + suffix + '</span>');
          }
        }
      }

      requestAnimationFrame(step);
    });
  }

  /* ================================================================
     5. SCROLL REVEAL ANIMATIONS
     Uses IntersectionObserver for performant on-scroll reveals
  ================================================================ */

  /* Inject reveal styles */
  if (!$('#rego_reveal_style').length) {
    $('<style id="rego_reveal_style">' +
      '.rego_reveal{opacity:0;transform:translateY(28px);transition:opacity 0.55s cubic-bezier(0.4,0,0.2,1),transform 0.55s cubic-bezier(0.4,0,0.2,1);}' +
      '.rego_reveal.rego_revealed{opacity:1;transform:translateY(0);}' +
      '.rego_reveal_delay_1{transition-delay:0.1s}' +
      '.rego_reveal_delay_2{transition-delay:0.2s}' +
      '.rego_reveal_delay_3{transition-delay:0.3s}' +
      '.rego_reveal_delay_4{transition-delay:0.4s}' +
    '</style>').appendTo('head');
  }

  /* Add reveal classes to target elements */
  var revealTargets = [
    '.rego_feature_card',
    '.rego_howit_step',
    '.rego_framework_badge_card',
    '.rego_stat_card',
    '.rego_integration_item',
    '.rego_usecase_card',
    '.rego_resource_card',
    '.rego_problem_list li',
    '.rego_section_header',
    '.rego_tab_panel_text',
    '.rego_tab_panel_visual'
  ];

  $(revealTargets.join(',')).addClass('rego_reveal');

  /* Add staggered delays to grid children */
  [
    '.rego_features_grid',
    '.rego_frameworks_grid',
    '.rego_integrations_grid',
    '.rego_usecases_grid',
    '.rego_resources_grid',
    '.rego_stats_grid'
  ].forEach(function (gridSel) {
    $(gridSel + ' > *').each(function (i) {
      var delay = Math.min(i + 1, 4);
      $(this).addClass('rego_reveal_delay_' + delay);
    });
  });

  /* Observe */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('rego_revealed');

          /* Trigger stat counters when stats section enters view */
          if (entry.target.classList.contains('rego_stats')) {
            animateCounters();
          }

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold:  0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    /* Observe reveal elements */
    document.querySelectorAll('.rego_reveal').forEach(function (el) {
      observer.observe(el);
    });

    /* Observe stats section separately */
    var statsSection = document.querySelector('.rego_stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  } else {
    /* Fallback for browsers without IO */
    $('.rego_reveal').addClass('rego_revealed');
    animateCounters();
  }

  /* ================================================================
     6. FRAMEWORK BAR ANIMATIONS
     Animates progress bar fills inside the dashboard mockup
  ================================================================ */
  function animateDashboardBars() {
    $('.rego_dashboard_mockup .rego_fw_fill').each(function () {
      var $bar      = $(this);
      var targetW   = $bar.attr('style').match(/width:\s*([\d.]+)%/);
      if (!targetW) return;

      $bar.css('width', '0%').delay(300).animate({ width: targetW[1] + '%' }, {
        duration: 1200,
        easing:   'swing'
      });
    });
  }

  /* Run immediately if visible on load, else observe */
  if ($('.rego_dashboard_mockup').length) {
    if ('IntersectionObserver' in window) {
      var barObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          animateDashboardBars();
          barObserver.disconnect();
        }
      }, { threshold: 0.3 });
      barObserver.observe(document.querySelector('.rego_dashboard_mockup'));
    } else {
      animateDashboardBars();
    }
  }

  /* ================================================================
     7. FRAMEWORK BADGE CARDS – Hover ripple effect
  ================================================================ */
  $('.rego_framework_badge_card').on('mouseenter.regoFramework', function () {
    var $card = $(this);
    $card.find('.rego_fw_card_name').css('color', 'var(--rego-primary)');
  }).on('mouseleave.regoFramework', function () {
    $(this).find('.rego_fw_card_name').css('color', '');
  });

  /* ================================================================
     8. HERO ACTION BUTTON – Pulse after 3 seconds for CTA attention
  ================================================================ */
  setTimeout(function () {
    var $demoBtns = $('.rego_hero_actions .rego_btn_primary');
    if (!$('#rego_pulse_btn_style').length) {
      $('<style id="rego_pulse_btn_style">' +
        '@keyframes rego_btn_pulse {' +
          '0%   { box-shadow: 0 4px 16px rgba(74,86,158,0.30); }' +
          '50%  { box-shadow: 0 4px 40px rgba(74,86,158,0.65), 0 0 0 8px rgba(74,86,158,0.10); }' +
          '100% { box-shadow: 0 4px 16px rgba(74,86,158,0.30); }' +
        '}' +
        '.rego_btn_pulse_anim { animation: rego_btn_pulse 1.8s ease 3; }' +
      '</style>').appendTo('head');
    }
    $demoBtns.addClass('rego_btn_pulse_anim');
    setTimeout(function () {
      $demoBtns.removeClass('rego_btn_pulse_anim');
    }, 5500);
  }, 3000);

  /* ================================================================
     9. CTA BANNER – Scroll-triggered gradient animation
  ================================================================ */
  if ($('.rego_cta_banner').length) {
    if (!$('#rego_cta_anim_style').length) {
      $('<style id="rego_cta_anim_style">' +
        '@keyframes rego_cta_shift {' +
          '0%   { background-position: 0% 50%; }' +
          '50%  { background-position: 100% 50%; }' +
          '100% { background-position: 0% 50%; }' +
        '}' +
        '.rego_cta_banner_animated .rego_cta_banner_bg {' +
          'background: linear-gradient(270deg, #4a569e, #842573, #3a4588, #6d1d5f) !important;' +
          'background-size: 400% 400% !important;' +
          'opacity: 0.25 !important;' +
          'animation: rego_cta_shift 8s ease infinite;' +
        '}' +
      '</style>').appendTo('head');
    }

    if ('IntersectionObserver' in window) {
      var ctaObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          $('.rego_cta_banner').addClass('rego_cta_banner_animated');
          ctaObserver.disconnect();
        }
      }, { threshold: 0.3 });
      ctaObserver.observe(document.querySelector('.rego_cta_banner'));
    }
  }

  /* ================================================================
     10. DASHBOARD LIVE INDICATOR – Random counter increments
         Simulates live data to make the dashboard look alive
  ================================================================ */
  function tickDashboard() {
    /* Occasionally change the "updated" timestamp */
    var $updated = $('.rego_dash_updated');
    if ($updated.length) {
      var msgs = ['Updated just now', 'Updated 1 min ago', 'Syncing...', 'Updated just now'];
      var idx  = Math.floor(Math.random() * msgs.length);
      $updated.fadeOut(200, function () {
        $(this).text(msgs[idx]).fadeIn(200);
      });
    }
  }

  setInterval(tickDashboard, 8000);

});
