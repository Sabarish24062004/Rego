(function ($) {
  'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $('.rego_cd_hero_text, .rego_cd_hero_visual, .rego_cd_trusted, .rego_cd_feat_text, .rego_cd_feat_visual, .rego_cd_hub, .rego_cd_cardcta_card, .rego_cd_table_wrap, .rego_cd_gartner_card, .rego_cd_case_slider, .rego_cd_post, .rego_cd_newsletter');

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
    var $slides = $('.rego_cd_case_card');
    var $dots = $('.rego_cd_case_dot');
    if (!$slides.length || !$dots.length) return;

    var total = $slides.length;
    var current = 0;
    var interval = null;
    var INTERVAL_MS = 6000;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      current = idx;
      $slides.removeClass('rego_cd_case_active');
      $slides.eq(idx).addClass('rego_cd_case_active');
      $dots.removeClass('rego_cd_case_dot_active');
      $dots.eq(idx).addClass('rego_cd_case_dot_active');
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

    var $slider = $('.rego_cd_case_slider');
    $slider.on('mouseenter', stop).on('mouseleave', start);

    goTo(0);
    start();
  }

  function initNewsletterValidation() {
    $('.rego_cd_newsletter_form').on('submit', function (e) {
      var $form = $(this);
      var valid = true;
      $form.find('[required]').each(function () {
        var $field = $(this);
        var value = ($field.attr('type') === 'checkbox') ? $field.is(':checked') : ($field.val() || '').trim();
        if (!value) { valid = false; $field.addClass('rego_cd_invalid'); }
        else { $field.removeClass('rego_cd_invalid'); }
      });
      if (!valid) {
        e.preventDefault();
        $form.find('.rego_cd_invalid').first().focus();
      }
    });
    $('.rego_cd_nl_input').on('input', function () {
      $(this).removeClass('rego_cd_invalid');
    });
  }

  $(document).ready(function () {
    initReveal();
    initCaseSlider();
    initNewsletterValidation();
  });
})(jQuery);
