(function ($) {
  'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $('.rego_cg_hero_text, .rego_cg_hero_visual, .rego_cg_trusted, .rego_cg_intro, .rego_cg_feat_text, .rego_cg_feat_visual, .rego_cg_steps_visual, .rego_cg_cardcta_card, .rego_cg_change_visual, .rego_cg_notif_visual, .rego_cg_case_slider, .rego_cg_final_visual');

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

  function initCaseSlider() {
    var $slides = $('.rego_cg_case_card');
    var $dots = $('.rego_cg_case_dot');
    if (!$slides.length || !$dots.length) return;

    var total = $slides.length;
    var current = 0;
    var interval = null;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      current = idx;
      $slides.removeClass('rego_cg_case_active');
      $slides.eq(idx).addClass('rego_cg_case_active');
      $dots.removeClass('rego_cg_case_dot_active');
      $dots.eq(idx).addClass('rego_cg_case_dot_active');
    }
    function start() {
      stop();
      interval = setInterval(function () { goTo(current + 1); }, 6000);
    }
    function stop() {
      if (interval) { clearInterval(interval); interval = null; }
    }

    $dots.on('click', function () {
      goTo(parseInt($(this).attr('data-dot'), 10));
      start();
    });
    var $slider = $('.rego_cg_case_slider');
    $slider.on('mouseenter', stop).on('mouseleave', start);
    goTo(0);
    start();
  }

  $(document).ready(function () {
    initReveal();
    initCaseSlider();
  });
})(jQuery);
