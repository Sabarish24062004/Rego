(function ($) {
  'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $('.rego_ct_hero_head, .rego_ct_topic_card, .rego_ct_info_card, .rego_ct_case_slider, .rego_ct_form_text, .rego_ct_form, .rego_ct_post, .rego_ct_newsletter');

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
    var $slides = $('.rego_ct_case_card');
    var $dots = $('.rego_ct_case_dot');
    if (!$slides.length || !$dots.length) return;

    var total = $slides.length;
    var current = 0;
    var interval = null;
    var INTERVAL_MS = 6000;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      current = idx;
      $slides.removeClass('rego_ct_case_active');
      $slides.eq(idx).addClass('rego_ct_case_active');
      $dots.removeClass('rego_ct_case_dot_active');
      $dots.eq(idx).addClass('rego_ct_case_dot_active');
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

    var $slider = $('.rego_ct_case_slider');
    $slider.on('mouseenter', stop).on('mouseleave', start);

    goTo(0);
    start();
  }

  function initFormValidation() {
    $('.rego_ct_form, .rego_ct_newsletter_form').on('submit', function (e) {
      var $form = $(this);
      var valid = true;
      $form.find('[required]').each(function () {
        var $field = $(this);
        var type = $field.attr('type');
        var value = (type === 'checkbox') ? $field.is(':checked') : ($field.val() || '').trim();
        if (!value) {
          valid = false;
          $field.addClass('rego_ct_invalid');
        } else {
          $field.removeClass('rego_ct_invalid');
        }
      });
      if (!valid) {
        e.preventDefault();
        var $first = $form.find('.rego_ct_invalid').first();
        if ($first.length) $first.focus();
      }
    });

    $('.rego_ct_input, .rego_ct_nl_input').on('input change', function () {
      $(this).removeClass('rego_ct_invalid');
    });
  }

  $(document).ready(function () {
    initReveal();
    initCaseSlider();
    initFormValidation();
  });
})(jQuery);
