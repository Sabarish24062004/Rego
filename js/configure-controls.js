(function ($) {
  'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $('.rego_cc_hero_text, .rego_cc_hero_visual, .rego_cc_trusted, .rego_cc_build, .rego_cc_regs_visual, .rego_cc_regs_text, .rego_cc_mapping_text, .rego_cc_mapping_visual, .rego_cc_streamline_card, .rego_cc_wizard_text, .rego_cc_wizard_visual, .rego_cc_ai_visual, .rego_cc_ai_text, .rego_cc_case_card, .rego_cc_cta_text, .rego_cc_cta_visual');

    targets.each(function () {
      $(this).css({
        opacity: 0,
        transform: 'translateY(24px)',
        transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)'
      });
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target).css({ opacity: 1, transform: 'translateY(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.each(function () { obs.observe(this); });
  }

  function initBarAnimation() {
    var bars = document.querySelectorAll('.rego_cc_hero_dash_fill, .rego_cc_cta_bar');
    if (!bars.length) return;

    bars.forEach(function (bar) {
      bar.dataset.final = bar.style.width;
      bar.style.width = '0%';
      bar.style.transition = 'width 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.style.width = b.dataset.final; });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var allBars = e.target.querySelectorAll('.rego_cc_hero_dash_fill, .rego_cc_cta_bar');
          allBars.forEach(function (b, i) {
            setTimeout(function () { b.style.width = b.dataset.final; }, i * 120);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    ['.rego_cc_hero_visual', '.rego_cc_cta_visual'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) obs.observe(el);
    });
  }

  function initCaseSlider() {
    var $slides = $('.rego_cc_case_card');
    var $dots = $('.rego_cc_case_dot');
    if (!$slides.length || !$dots.length) return;

    var total = $slides.length;
    var current = 0;
    var interval = null;
    var INTERVAL_MS = 6000;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      current = idx;
      $slides.removeClass('rego_cc_case_active');
      $slides.eq(idx).addClass('rego_cc_case_active');
      $dots.removeClass('rego_cc_case_dot_active');
      $dots.eq(idx).addClass('rego_cc_case_dot_active');
    }

    function start() {
      stop();
      interval = setInterval(function () { goTo(current + 1); }, INTERVAL_MS);
    }
    function stop() {
      if (interval) { clearInterval(interval); interval = null; }
    }

    $dots.on('click', function () {
      goTo(parseInt($(this).attr('data-dot'), 10));
      start();
    });

    var $slider = $('.rego_cc_case_slider');
    $slider.on('mouseenter', stop).on('mouseleave', start);

    goTo(0);
    start();
  }

  function initAuthorBar() {
    var $bar = $('.rego_cc_ai_doc_bar');
    if (!$bar.length) return;
    var final = $bar.css('width');
    $bar.css({ width: 0, transition: 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
    if (!('IntersectionObserver' in window)) { $bar.css('width', '80%'); return; }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $bar.css('width', '80%');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe($bar[0]);
  }

  $(document).ready(function () {
    initReveal();
    initBarAnimation();
    initCaseSlider();
    initAuthorBar();
  });
})(jQuery);
