(function ($) {
  'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $('.rego_cs_hero_text, .rego_cs_hero_visual, .rego_cs_trusted, .rego_cs_intro, .rego_cs_phase, .rego_cs_quote_inner, .rego_cs_partner, .rego_cs_feat_text, .rego_cs_csm_visual, .rego_cs_train_visual, .rego_cs_portal_visual, .rego_cs_meet, .rego_cs_expert, .rego_cs_case_slider, .rego_cs_svc_visual');

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

  function initSlider(opts) {
    var $slides = $(opts.slides);
    var $dots = $(opts.dots);
    if (!$slides.length || !$dots.length) return;

    var total = $slides.length;
    var current = 0;
    var t = null;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      current = idx;
      $slides.removeClass(opts.slideActive);
      $slides.eq(idx).addClass(opts.slideActive);
      $dots.removeClass(opts.dotActive);
      $dots.eq(idx).addClass(opts.dotActive);
    }
    function start() { stop(); t = setInterval(function () { goTo(current + 1); }, opts.interval); }
    function stop() { if (t) { clearInterval(t); t = null; } }

    $dots.on('click', function () {
      goTo(parseInt($(this).attr('data-dot'), 10));
      start();
    });
    var $wrap = $(opts.wrap);
    if ($wrap.length) { $wrap.on('mouseenter', stop).on('mouseleave', start); }
    goTo(0);
    start();
  }

  $(document).ready(function () {
    initReveal();
    initSlider({
      slides: '.rego_cs_quote_slide',
      dots: '.rego_cs_quote_dot',
      slideActive: 'rego_cs_quote_active',
      dotActive: 'rego_cs_quote_dot_active',
      wrap: '.rego_cs_quote_slides',
      interval: 7000
    });
    initSlider({
      slides: '.rego_cs_case_card',
      dots: '.rego_cs_case_dot',
      slideActive: 'rego_cs_case_active',
      dotActive: 'rego_cs_case_dot_active',
      wrap: '.rego_cs_case_slider',
      interval: 6000
    });
  });
})(jQuery);
