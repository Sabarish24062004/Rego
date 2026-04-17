/* ================================================================
   REGO – PRODUCT DEVSECOPS PAGE JS
   File: js/product-devsecops.js
   Depends on: jQuery (loaded before this file), header.js, footer.js
   Handles: scroll reveal, stat counters, policy tab switching,
            framework bar entrance, code copy, pipeline entrance,
            scan row stagger, smooth scroll
================================================================ */

(function ($) {
  'use strict';

  /* ----------------------------------------------------------------
     1. SCROLL REVEAL
  ---------------------------------------------------------------- */
  function initReveal() {
    var $els = $('.rego_reveal');
    if (!$els.length) return;

    if (!('IntersectionObserver' in window)) {
      $els.addClass('rego_revealed');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('rego_revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

    $els.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     2. ANIMATED STAT COUNTERS
  ---------------------------------------------------------------- */
  function animateCounter($el, target, duration) {
    var isFloat = String(target).indexOf('.') !== -1;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = target * ease;
      var display = isFloat ? current.toFixed(1) : Math.round(current).toString();
      $el.text(display + $el.data('suffix'));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var $stats = $('.rego_dsp_metric_value[data-target]');
    if (!$stats.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        var $el = $(entry.target);
        var target = parseFloat($el.data('target'));
        var suffix = $el.data('suffix') || '';
        $el.data('suffix', suffix);
        animateCounter($el, target, 1600);
      });
    }, { threshold: 0.40 });

    $stats.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     3. POLICY LIBRARY TABS
  ---------------------------------------------------------------- */
  function initTabs() {
    var $tabBtns = $('.rego_dsp_tab_btn');
    if (!$tabBtns.length) return;

    $tabBtns.on('click', function () {
      var $btn  = $(this);
      var tabId = $btn.data('tab');
      if (!tabId) return;

      $tabBtns.removeClass('rego_dsp_tab_btn_active');
      $btn.addClass('rego_dsp_tab_btn_active');

      $('.rego_dsp_tab_content').removeClass('rego_dsp_tab_active');
      $('#' + tabId).addClass('rego_dsp_tab_active');
    });
  }

  /* ----------------------------------------------------------------
     4. FRAMEWORK PROGRESS BARS ENTRANCE
  ---------------------------------------------------------------- */
  function initFrameworkBars() {
    var $fills = $('.rego_dsp_framework_bar_fill');
    if (!$fills.length || !('IntersectionObserver' in window)) return;

    // Store target widths and reset
    $fills.each(function () {
      var w = $(this).css('width') || '';
      var match = w.match(/(\d+)%/) ||
                  ($(this).attr('style') || '').match(/width:\s*(\d+)%/);
      if (match) {
        $(this).data('target-w', match[1] + '%').css('width', '0%');
      }
    });

    var $section = $('.rego_dsp_dashboard_frameworks');
    if (!$section.length) return;

    var triggered = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          $fills.each(function (i) {
            var $f = $(this);
            setTimeout(function () {
              $f.css({ width: $f.data('target-w') || '0%', transition: 'width 0.8s ease' });
            }, i * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.30 });

    observer.observe($section[0]);
  }

  /* ----------------------------------------------------------------
     5. SCAN ROW STAGGER ENTRANCE
  ---------------------------------------------------------------- */
  function initScanRows() {
    var $rows = $('.rego_dsp_scan_row');
    if (!$rows.length || !('IntersectionObserver' in window)) return;

    $rows.css({ opacity: 0, transform: 'translateX(-8px)', transition: 'opacity 0.35s ease, transform 0.35s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $rows.each(function (i) {
            var $r = $(this);
            setTimeout(function () {
              $r.css({ opacity: 1, transform: 'translateX(0)' });
            }, i * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    var $table = $('.rego_dsp_scan_table');
    if ($table.length) observer.observe($table[0]);
  }

  /* ----------------------------------------------------------------
     6. PIPELINE STEP ENTRANCE
  ---------------------------------------------------------------- */
  function initPipelineEntrance() {
    var $steps = $('.rego_dsp_pipeline_step');
    if (!$steps.length || !('IntersectionObserver' in window)) return;

    $steps.css({ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.4s ease, transform 0.4s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $steps.each(function (i) {
            var $s = $(this);
            setTimeout(function () {
              $s.css({ opacity: 1, transform: 'translateY(0)' });
            }, i * 90);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    var $pipeline = $('.rego_dsp_pipeline');
    if ($pipeline.length) observer.observe($pipeline[0]);
  }

  /* ----------------------------------------------------------------
     7. CAPABILITY CARD STAGGER
  ---------------------------------------------------------------- */
  function initCapabilityCards() {
    var $cards = $('.rego_dsp_icon_card');
    if (!$cards.length || !('IntersectionObserver' in window)) return;

    $cards.css({ opacity: 0, transform: 'translateY(14px)', transition: 'opacity 0.4s ease, transform 0.4s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = $cards.index(entry.target);
          var $el = $(entry.target);
          setTimeout(function () {
            $el.css({ opacity: 1, transform: 'translateY(0)' });
          }, idx * 70);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    $cards.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     8. CODE COPY BUTTON
  ---------------------------------------------------------------- */
  function initCopyButton() {
    $(document).on('click', '.rego_dsp_copy_btn', function () {
      var $btn  = $(this);
      var $code = $btn.closest('.rego_dsp_code_card').find('code').first();
      if (!$code.length) return;

      var text = $code.text();

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          $btn.text('Copied!');
          setTimeout(function () { $btn.text('Copy'); }, 2000);
        });
      } else {
        // Fallback
        var $ta = $('<textarea style="position:fixed;left:-9999px">').val(text).appendTo('body');
        $ta[0].select();
        document.execCommand('copy');
        $ta.remove();
        $btn.text('Copied!');
        setTimeout(function () { $btn.text('Copy'); }, 2000);
      }
    });
  }

  /* ----------------------------------------------------------------
     9. HERO BADGE PULSE
     Keeps the floating scan/controls badges alive.
  ---------------------------------------------------------------- */
  function initHeroBadgePulse() {
    var $badges = $('.rego_dsp_hero_badge_scan, .rego_dsp_hero_badge_controls');
    if (!$badges.length) return;

    // Subtle scale pulse every 4s
    setInterval(function () {
      $badges.each(function () {
        var $b = $(this);
        $b.css({ transition: 'transform 0.3s ease', transform: 'scale(1.04)' });
        setTimeout(function () {
          $b.css({ transform: 'scale(1)' });
        }, 300);
      });
    }, 4000);
  }

  /* ----------------------------------------------------------------
     10. INTEGRATION PILL HOVER
  ---------------------------------------------------------------- */
  function initIntegrationPills() {
    $(document).on('mouseenter', '.rego_dsp_integration_pill', function () {
      $(this).css('transform', 'translateY(-2px)');
    }).on('mouseleave', '.rego_dsp_integration_pill', function () {
      $(this).css('transform', '');
    });
  }

  /* ----------------------------------------------------------------
     11. SMOOTH SCROLL
  ---------------------------------------------------------------- */
  function initSmoothScroll() {
    var headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')
    ) || 72;

    $(document).on('click', 'a[href^="#rego_dsp_"]', function (e) {
      var target = $(this).attr('href');
      var $target = $(target);
      if (!$target.length) return;
      e.preventDefault();
      var top = $target.offset().top - headerH - 16;
      $('html, body').animate({ scrollTop: top }, 480, 'swing');
    });
  }

  /* ----------------------------------------------------------------
     INITIALISE
  ---------------------------------------------------------------- */
  $(document).ready(function () {
    initReveal();
    initCounters();
    initTabs();
    initFrameworkBars();
    initScanRows();
    initPipelineEntrance();
    initCapabilityCards();
    initCopyButton();
    initHeroBadgePulse();
    initIntegrationPills();
    initSmoothScroll();
  });

})(jQuery);
