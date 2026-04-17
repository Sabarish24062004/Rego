/* ================================================================
   REGO – CONTINUOUS COMPLIANCE FOR DEVSECOPS PAGE JS
   File: js/continuous-compliance-for-devsecops.js
   Depends on: jQuery (loaded before this file), header.js, footer.js
   Handles: scroll reveal, animated counters, pipeline card animation,
            score bar entrance, tool list interactions, hero badge loop
================================================================ */

(function ($) {
  'use strict';

  /* ----------------------------------------------------------------
     1. SCROLL REVEAL (global .rego_reveal → .rego_revealed)
     Shared pattern; runs on all pages — but defined locally here
     so this page doesn't need main.js to be loaded.
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
     Looks for .rego_dso_stat_value[data-target] and animates the
     numeric content from 0 to the target value using rAF.
  ---------------------------------------------------------------- */
  function animateCounter($el, target, duration, isFloat, suffix) {
    var start    = null;
    var startVal = 0;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current  = startVal + (target - startVal) * ease;

      var display = isFloat
        ? current.toFixed(1)
        : Math.round(current).toString();

      $el.find('.rego_dso_stat_unit').length
        ? $el.contents().filter(function() { return this.nodeType === 3; }).first().replaceWith(display)
        : $el.text(display + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var $stats = $('.rego_dso_stat_value[data-target]');
    if (!$stats.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        var $el     = $(entry.target);
        var target  = parseFloat($el.data('target'));
        var text    = $el.text();
        var isFloat = String(target).indexOf('.') !== -1;
        var suffix  = text.replace(/[\d.]+/, '').trim();

        animateCounter($el, target, 1800, isFloat, suffix);
      });
    }, { threshold: 0.40 });

    $stats.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     3. SCORE BAR ENTRANCE ANIMATION
     Score bars start at 0% width and animate to their data-score
     value when the monitoring card enters the viewport.
  ---------------------------------------------------------------- */
  function initScoreBars() {
    var $bars = $('.rego_dso_score_fill');
    if (!$bars.length) return;

    // Store original widths and reset to 0
    $bars.each(function () {
      var w = $(this).css('width') || $(this).attr('style');
      var match = (w || '').match(/(\d+)%/);
      if (match) {
        $(this).data('target-width', match[1] + '%').css('width', '0%');
      }
    });

    if (!('IntersectionObserver' in window)) {
      $bars.each(function () {
        $(this).css('width', $(this).data('target-width') || '0%');
      });
      return;
    }

    var triggered = false;
    var $card = $('.rego_dso_monitor_card');
    if (!$card.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          observer.unobserve(entry.target);
          $bars.each(function () {
            var $b = $(this);
            setTimeout(function () {
              $b.css('width', $b.data('target-width') || '0%');
            }, 150);
          });
        }
      });
    }, { threshold: 0.40 });

    observer.observe($card[0]);
  }

  /* ----------------------------------------------------------------
     4. PIPELINE CARD STAGE PULSE
     Pulses the "active" stage icon to give a scanning effect.
  ---------------------------------------------------------------- */
  function initPipelinePulse() {
    var $activeStage = $('.rego_dso_stage_active .rego_dso_stage_icon');
    if (!$activeStage.length) return;

    function pulse() {
      $activeStage
        .animate({ opacity: 0.40 }, 600)
        .animate({ opacity: 1.00 }, 600, pulse);
    }

    pulse();
  }

  /* ----------------------------------------------------------------
     5. HERO BADGE AUTO-ROTATE
     Cycles through several framework names in the hero tag group
     to keep the visual alive on page load.
  ---------------------------------------------------------------- */
  function initHeroTagHighlight() {
    var $tags = $('.rego_dso_hero_tags .rego_tag');
    if ($tags.length < 2) return;

    var current = 0;

    function highlight() {
      $tags.removeClass('rego_tag_active_highlight');
      $tags.eq(current).addClass('rego_tag_active_highlight');
      current = (current + 1) % $tags.length;
    }

    highlight();
    setInterval(highlight, 1800);
  }

  /* ----------------------------------------------------------------
     6. COMPARISON BANNER ENTRANCE
     Slides in the two columns from left/right once in viewport.
  ---------------------------------------------------------------- */
  function initCompareBanner() {
    var $banner = $('.rego_dso_compare_banner');
    if (!$banner.length || !('IntersectionObserver' in window)) return;

    var $left  = $banner.find('.rego_dso_compare_col:first-child');
    var $right = $banner.find('.rego_dso_compare_col:last-child');

    $left.css({ opacity: 0, transform: 'translateX(-24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' });
    $right.css({ opacity: 0, transform: 'translateX(24px)',  transition: 'opacity 0.5s ease, transform 0.5s ease 0.1s' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $left.css({ opacity: 1, transform: 'translateX(0)' });
          $right.css({ opacity: 1, transform: 'translateX(0)' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe($banner[0]);
  }

  /* ----------------------------------------------------------------
     7. FRAMEWORK CARD HOVER GLOW
     Adds a gradient border glow on hover using a pseudo-element
     trick via box-shadow so we don't need extra DOM.
  ---------------------------------------------------------------- */
  function initFrameworkCardGlow() {
    $(document).on('mouseenter', '.rego_dso_fw_card', function () {
      var $badge = $(this).find('.rego_dso_fw_badge');
      var bg     = $badge.css('background') || '';
      // extract first colour from gradient or solid for shadow tint
      var match  = bg.match(/rgb[a]?\([^)]+\)/);
      if (match) {
        $(this).css('box-shadow', '0 12px 36px ' + match[0].replace(')', ', 0.20)').replace('rgb', 'rgba'));
      }
    }).on('mouseleave', '.rego_dso_fw_card', function () {
      $(this).css('box-shadow', '');
    });
  }

  /* ----------------------------------------------------------------
     8. TOOL CHIP INTERACTIVE RIPPLE
     Quick ripple on tool chip click.
  ---------------------------------------------------------------- */
  function initToolChipRipple() {
    $(document).on('click', '.rego_dso_tool', function () {
      var $t = $(this);
      $t.addClass('rego_chip_clicked');
      setTimeout(function () { $t.removeClass('rego_chip_clicked'); }, 350);
    });
  }

  /* ----------------------------------------------------------------
     9. EVIDENCE ROW STAGGER ENTRANCE
     Animates evidence rows sliding in when card enters viewport.
  ---------------------------------------------------------------- */
  function initEvidenceRows() {
    var $rows = $('.rego_dso_evidence_row');
    if (!$rows.length || !('IntersectionObserver' in window)) return;

    $rows.css({ opacity: 0, transform: 'translateX(-12px)', transition: 'opacity 0.4s ease, transform 0.4s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var $parent = $(entry.target).find('.rego_dso_evidence_row');
          $parent.each(function (i) {
            var $row = $(this);
            setTimeout(function () {
              $row.css({ opacity: 1, transform: 'translateX(0)' });
            }, i * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.30 });

    var $card = $('.rego_dso_evidence_card');
    if ($card.length) observer.observe($card[0]);
  }

  /* ----------------------------------------------------------------
     10. PR CHECK ROWS STAGGER
     Animates PR check rows sliding in from below.
  ---------------------------------------------------------------- */
  function initPrRows() {
    var $card = $('.rego_dso_pr_check');
    if (!$card.length || !('IntersectionObserver' in window)) return;

    var $rows = $card.find('.rego_dso_pr_row');
    $rows.css({ opacity: 0, transform: 'translateY(8px)', transition: 'opacity 0.35s ease, transform 0.35s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $rows.each(function (i) {
            var $r = $(this);
            setTimeout(function () {
              $r.css({ opacity: 1, transform: 'translateY(0)' });
            }, i * 90);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.30 });

    observer.observe($card[0]);
  }

  /* ----------------------------------------------------------------
     11. SMOOTH SCROLL FOR IN-PAGE LINKS
     Provides scroll-with-header offset for #rego_dso_how etc.
  ---------------------------------------------------------------- */
  function initSmoothScroll() {
    var headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')
    ) || 72;

    $(document).on('click', 'a[href^="#rego_dso_"]', function (e) {
      var target = $(this).attr('href');
      var $target = $(target);
      if (!$target.length) return;
      e.preventDefault();
      var top = $target.offset().top - headerH - 16;
      $('html, body').animate({ scrollTop: top }, 480, 'swing');
    });
  }

  /* ----------------------------------------------------------------
     12. ACTIVE NAV HIGHLIGHT
     Marks the "Solutions" nav item as active on this page.
  ---------------------------------------------------------------- */
  function initActiveNav() {
    // Already set in HTML via .rego_nav_active; nothing else needed.
    // But ensure mobile "Solutions" section is open by default.
    // (optional UX improvement — skip if not desired)
  }

  /* ----------------------------------------------------------------
     INITIALISE
  ---------------------------------------------------------------- */
  $(document).ready(function () {
    initReveal();
    initCounters();
    initScoreBars();
    initPipelinePulse();
    initHeroTagHighlight();
    initCompareBanner();
    initFrameworkCardGlow();
    initToolChipRipple();
    initEvidenceRows();
    initPrRows();
    initSmoothScroll();
    initActiveNav();
  });

})(jQuery);
