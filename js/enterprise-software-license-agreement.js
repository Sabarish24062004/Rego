/* ================================================================
   REGO – ENTERPRISE SOFTWARE LICENSE AGREEMENT PAGE JS
   File: js/enterprise-software-license-agreement.js
   Depends on: jQuery (loaded before this file), header.js, footer.js
   Handles: TOC scroll spy, reading progress bar, smooth scroll,
            print button, mobile TOC toggle
================================================================ */

(function ($) {
  'use strict';

  /* ----------------------------------------------------------------
     CONFIG
  ---------------------------------------------------------------- */
  var HEADER_H      = 72;          // matches --rego-header-h in CSS
  var SCROLL_OFFSET = HEADER_H + 24;

  /* ----------------------------------------------------------------
     1. READING PROGRESS BAR
     Updates the width of .rego_eula_progress_fill as the user
     scrolls through the article content.
  ---------------------------------------------------------------- */
  function initReadingProgress() {
    var $fill    = $('.rego_eula_progress_fill');
    var $body    = $('.rego_eula_body');

    if (!$fill.length || !$body.length) return;

    function updateProgress() {
      var bodyTop    = $body.offset().top;
      var bodyBottom = bodyTop + $body.outerHeight();
      var viewBottom = $(window).scrollTop() + $(window).height();
      var scrolled   = viewBottom - bodyTop;
      var total      = bodyBottom - bodyTop;
      var pct        = Math.min(Math.max((scrolled / total) * 100, 0), 100);
      $fill.css('width', pct + '%');
    }

    $(window).on('scroll.eulaProgress resize.eulaProgress', updateProgress);
    updateProgress();
  }

  /* ----------------------------------------------------------------
     2. TOC SCROLL SPY
     Highlights the active .rego_eula_toc_link based on which
     section anchor is currently closest to the top of the viewport.
  ---------------------------------------------------------------- */
  function initTocScrollSpy() {
    var $tocLinks = $('.rego_eula_toc_link[href^="#"]');
    if (!$tocLinks.length) return;

    // Build array of { id, $el, $link }
    var sections = [];
    $tocLinks.each(function () {
      var id  = $(this).attr('href').replace('#', '');
      var $el = $('#' + id);
      if ($el.length) {
        sections.push({ id: id, $el: $el, $link: $(this) });
      }
    });

    function getActiveIndex() {
      var scrollTop = $(window).scrollTop() + SCROLL_OFFSET + 10;
      var active    = -1;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].$el.offset().top <= scrollTop) {
          active = i;
        }
      }
      return active;
    }

    function highlightActive() {
      var idx = getActiveIndex();
      $tocLinks.removeClass('rego_toc_active');
      if (idx >= 0) {
        sections[idx].$link.addClass('rego_toc_active');
      }
    }

    $(window).on('scroll.eulaspy resize.eulaspy', highlightActive);
    highlightActive();
  }

  /* ----------------------------------------------------------------
     3. SMOOTH SCROLL FOR TOC LINKS
     Overrides native anchor behaviour to account for fixed header.
  ---------------------------------------------------------------- */
  function initTocSmoothScroll() {
    $(document).on('click', '.rego_eula_toc_link[href^="#"], .rego_eula_notice_btn[href^="#"]', function (e) {
      var target = $(this).attr('href');
      var $target = $(target);
      if (!$target.length) return;

      e.preventDefault();

      var top = $target.offset().top - SCROLL_OFFSET;
      $('html, body').animate({ scrollTop: top }, 400, 'swing');

      // Close mobile TOC drawer if open
      closeMobileToc();
    });
  }

  /* ----------------------------------------------------------------
     4. MOBILE TOC TOGGLE
     Shows/hides the sidebar TOC in a slide-down panel on small screens.
  ---------------------------------------------------------------- */
  var $mobileTocBtn, $mobileTocPanel;

  function initMobileToc() {
    // Only inject the toggle button once
    if ($('.rego_eula_toc_mobile_btn').length) return;

    var $toc = $('.rego_eula_toc');
    if (!$toc.length) return;

    // Insert a floating "Jump to section" button above the TOC on mobile
    var $btn = $('<button class="rego_eula_toc_mobile_btn" aria-expanded="false">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<line x1="8" y1="6" x2="21" y2="6"/>' +
        '<line x1="8" y1="12" x2="21" y2="12"/>' +
        '<line x1="8" y1="18" x2="21" y2="18"/>' +
        '<polyline points="3 6 4 7 6 5"/>' +
        '<polyline points="3 12 4 13 6 11"/>' +
        '<polyline points="3 18 4 19 6 17"/>' +
      '</svg>' +
      'Jump to section' +
      '<svg class="rego_toc_mobile_chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<polyline points="6 9 12 15 18 9"/>' +
      '</svg>' +
    '</button>');

    $toc.before($btn);
    $mobileTocBtn   = $btn;
    $mobileTocPanel = $toc;

    $btn.on('click', function () {
      var open = $toc.hasClass('rego_toc_mobile_open');
      if (open) {
        closeMobileToc();
      } else {
        openMobileToc();
      }
    });
  }

  function openMobileToc() {
    if (!$mobileTocPanel) return;
    $mobileTocPanel.addClass('rego_toc_mobile_open');
    $mobileTocBtn && $mobileTocBtn.attr('aria-expanded', 'true').addClass('rego_is_open');
  }

  function closeMobileToc() {
    if (!$mobileTocPanel) return;
    $mobileTocPanel.removeClass('rego_toc_mobile_open');
    $mobileTocBtn && $mobileTocBtn.attr('aria-expanded', 'false').removeClass('rego_is_open');
  }

  /* ----------------------------------------------------------------
     5. PRINT BUTTON HANDLER
  ---------------------------------------------------------------- */
  function initPrintButton() {
    $(document).on('click', '.rego_eula_print_btn, [data-action="print"]', function (e) {
      e.preventDefault();
      window.print();
    });
  }

  /* ----------------------------------------------------------------
     6. DOWNLOAD BUTTON HANDLER
     Simulates a "save as PDF" prompt (or triggers browser print-to-PDF)
  ---------------------------------------------------------------- */
  function initDownloadButton() {
    $(document).on('click', '[data-action="download-pdf"]', function (e) {
      e.preventDefault();
      // In a real deployment this would point to a server-generated PDF.
      // For static demo: open print dialog with PDF preset messaging.
      var $btn  = $(this);
      var orig  = $btn.html();
      $btn.html('Preparing PDF…').prop('disabled', true);
      setTimeout(function () {
        $btn.html(orig).prop('disabled', false);
        window.print();
      }, 800);
    });
  }

  /* ----------------------------------------------------------------
     7. DEFINITION TERM TOOLTIPS
     Highlights dt terms inside .rego_eula_body with a subtle
     "defined term" indicator on hover.
  ---------------------------------------------------------------- */
  function initDefinitionHighlights() {
    var $dts = $('.rego_eula_body dt');
    if (!$dts.length) return;

    // Build lookup of defined terms
    var terms = [];
    $dts.each(function () {
      var text = $(this).text().replace(/['"]/g, '').trim();
      if (text.length > 2) terms.push(text);
    });

    // Highlight occurrences in body paragraphs (first occurrence only)
    if (!terms.length) return;
    var $body = $('.rego_eula_body');
    // Only mark inside <p> tags for performance
    $body.find('p').each(function () {
      var $p   = $(this);
      var html = $p.html();
      var changed = false;
      terms.forEach(function (term) {
        // Skip if already wrapped
        var safeRe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var re = new RegExp('(?<![<">])\\b(' + safeRe + ')\\b(?![^<]*>)', 'g');
        if (re.test(html) && html.indexOf('rego_defined_term') === -1) {
          html    = html.replace(re, '<span class="rego_defined_term">$1</span>');
          changed = true;
        }
      });
      if (changed) $p.html(html);
    });
  }

  /* ----------------------------------------------------------------
     8. STICKY TOC – SHRINK HEADER COMPENSATION
     Recalculate sticky top on resize in case header height changes
  ---------------------------------------------------------------- */
  function initStickyTocResize() {
    var $toc = $('.rego_eula_toc');
    if (!$toc.length) return;

    function setTop() {
      var h = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--rego-header-h')) || HEADER_H;
      $toc.css('top', (h + 24) + 'px');
    }

    $(window).on('resize.eulaToc', setTop);
    setTop();
  }

  /* ----------------------------------------------------------------
     9. SECTION ENTRANCE ANIMATIONS
     Re-uses the global .rego_reveal / .rego_revealed pattern.
  ---------------------------------------------------------------- */
  function initReveal() {
    var $els = $('.rego_eula_layout, .rego_eula_section, .rego_eula_related_card');
    if (!$els.length || !('IntersectionObserver' in window)) {
      // Fallback: show immediately
      $els.addClass('rego_revealed');
      return;
    }

    $els.addClass('rego_reveal');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('rego_revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    $els.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     10. KEYBOARD ACCESSIBILITY FOR TOC
  ---------------------------------------------------------------- */
  function initTocKeyboard() {
    $(document).on('keydown', '.rego_eula_toc_link', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });
  }

  /* ----------------------------------------------------------------
     INITIALISE
  ---------------------------------------------------------------- */
  $(document).ready(function () {
    initReadingProgress();
    initTocScrollSpy();
    initTocSmoothScroll();
    initMobileToc();
    initPrintButton();
    initDownloadButton();
    initDefinitionHighlights();
    initStickyTocResize();
    initReveal();
    initTocKeyboard();
  });

})(jQuery);
