/* ================================================================
   REGO – THIRD-PARTY RISK MANAGEMENT PRODUCT PAGE JS
   File: js/product-third-party-risk-management.js
   Depends on: jQuery (loaded before this file), header.js, footer.js
   Handles: scroll reveal, stat counters, monitoring ticker,
            questionnaire progress bars, risk tier hover, smooth scroll
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
      $el.find('.rego_tprm_stat_num').text(display);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var $stats = $('.rego_tprm_stat_value[data-target], .rego_stat_block[data-target]');
    if (!$stats.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        var $el = $(entry.target);
        var target = parseFloat($el.data('target'));
        animateCounter($el, target, 1800);
      });
    }, { threshold: 0.40 });

    $stats.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     3. LIVE MONITORING EVENT TICKER
     Rotates through monitoring events in the hero dashboard card.
  ---------------------------------------------------------------- */
  function initMonitoringTicker() {
    var $events = $('.rego_tprm_monitoring_event');
    if ($events.length < 2) return;

    var events = [
      { dot: 'rego_tprm_monitor_green', text: 'Acme Corp – Questionnaire completed', time: 'Just now' },
      { dot: 'rego_tprm_monitor_yellow', text: 'BetaSys – SOC 2 report expired', time: '2m ago' },
      { dot: 'rego_tprm_monitor_red',    text: 'GammaTech – Critical CVE detected', time: '5m ago' },
      { dot: 'rego_tprm_monitor_green',  text: 'DeltaCo – Risk score improved: 71→84', time: '12m ago' },
      { dot: 'rego_tprm_monitor_yellow', text: 'EpsilonLtd – Incomplete controls (3)', time: '18m ago' },
      { dot: 'rego_tprm_monitor_green',  text: 'ZetaCloud – Annual review approved', time: '31m ago' }
    ];

    var $list = $('.rego_tprm_monitoring_list');
    if (!$list.length) return;

    function updateTop() {
      var shifted = events.shift();
      events.push(shifted);

      $events.each(function (i) {
        var ev = events[i];
        if (!ev) return;
        var $ev = $(this);
        $ev.find('.rego_tprm_monitor_dot')
           .removeClass('rego_tprm_monitor_green rego_tprm_monitor_yellow rego_tprm_monitor_red')
           .addClass(ev.dot);
        $ev.find('.rego_tprm_monitor_text').text(ev.text);
        if ($ev.find('.rego_tprm_monitor_time').length) {
          $ev.find('.rego_tprm_monitor_time').text(ev.time);
        }
      });
    }

    setInterval(updateTop, 3800);
  }

  /* ----------------------------------------------------------------
     4. QUESTIONNAIRE PROGRESS BARS
     Animates the progress bars in the dashboard when in view.
  ---------------------------------------------------------------- */
  function initQuestionnaireBars() {
    var $bars = $('.rego_tprm_q_bar');
    if (!$bars.length || !('IntersectionObserver' in window)) return;

    $bars.each(function () {
      var pct = $(this).data('pct') || $(this).attr('style') || '';
      var match = String(pct).match(/(\d+)%/) ||
                  $(this).css('width').match(/(\d+)%/);
      if (match) {
        $(this).data('target-pct', match[1]).css('width', '0%');
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).find('.rego_tprm_q_bar').each(function (i) {
            var $b = $(this);
            setTimeout(function () {
              $b.css({ width: ($b.data('target-pct') || '0') + '%', transition: 'width 0.7s ease' });
            }, i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.30 });

    var $card = $('.rego_tprm_dashboard_card');
    if ($card.length) observer.observe($card[0]);
  }

  /* ----------------------------------------------------------------
     5. RISK TIER CARD HOVER GLOW
  ---------------------------------------------------------------- */
  function initTierHover() {
    $(document).on('mouseenter', '.rego_tprm_tier_card', function () {
      $(this).css('box-shadow', '0 16px 48px rgba(74,86,158,0.18)');
    }).on('mouseleave', '.rego_tprm_tier_card', function () {
      $(this).css('box-shadow', '');
    });
  }

  /* ----------------------------------------------------------------
     6. COMPARISON SECTION ENTRANCE
     Slides before/after columns from opposite sides.
  ---------------------------------------------------------------- */
  function initComparisonEntrance() {
    var $comp = $('.rego_tprm_comparison');
    if (!$comp.length || !('IntersectionObserver' in window)) return;

    var $bad  = $comp.find('.rego_tprm_comparison_bad');
    var $good = $comp.find('.rego_tprm_comparison_good');

    $bad.css({  opacity: 0, transform: 'translateX(-20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' });
    $good.css({ opacity: 0, transform: 'translateX(20px)',  transition: 'opacity 0.5s ease, transform 0.5s ease 0.1s' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $bad.css({  opacity: 1, transform: 'translateX(0)' });
          $good.css({ opacity: 1, transform: 'translateX(0)' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe($comp[0]);
  }

  /* ----------------------------------------------------------------
     7. FRAMEWORK CARD STAGGER ENTRANCE
  ---------------------------------------------------------------- */
  function initFrameworkCards() {
    var $cards = $('.rego_tprm_framework_item');
    if (!$cards.length || !('IntersectionObserver' in window)) return;

    $cards.css({ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.4s ease, transform 0.4s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = $cards.index(entry.target);
          var $el = $(entry.target);
          setTimeout(function () {
            $el.css({ opacity: 1, transform: 'translateY(0)' });
          }, idx * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    $cards.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     8. ALERT BAR DISMISS
  ---------------------------------------------------------------- */
  function initAlertBar() {
    var $bar = $('.rego_tprm_alert_bar');
    if (!$bar.length) return;

    $bar.find('.rego_tprm_alert_close').on('click', function () {
      $bar.slideUp(200);
    });
  }

  /* ----------------------------------------------------------------
     9. SMOOTH SCROLL FOR IN-PAGE LINKS
  ---------------------------------------------------------------- */
  function initSmoothScroll() {
    var headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')
    ) || 72;

    $(document).on('click', 'a[href^="#rego_tprm_"]', function (e) {
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
    initMonitoringTicker();
    initQuestionnaireBars();
    initTierHover();
    initComparisonEntrance();
    initFrameworkCards();
    initAlertBar();
    initSmoothScroll();
  });

})(jQuery);
