(function ($) {
  'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $('.rego_int_hero_text, .rego_int_auto, .rego_int_fcard, .rego_int_fw_text, .rego_int_orbit, .rego_int_quote_inner, .rego_int_cta_text, .rego_int_dash');

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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.each(function () { obs.observe(this); });
  }

  function initHubFloat() {
    $('.rego_int_hub_node').each(function (i) {
      var $n = $(this);
      var delay = (i * 180) % 1800;
      $n.css({
        animation: 'rego_int_float 4s ease-in-out ' + delay + 'ms infinite'
      });
    });

    if (!document.getElementById('rego_int_float_keyframes')) {
      var style = document.createElement('style');
      style.id = 'rego_int_float_keyframes';
      style.textContent = '@keyframes rego_int_float { 0%,100% { margin-top: 0; } 50% { margin-top: -6px; } }';
      document.head.appendChild(style);
    }
  }

  function initBarAnimation() {
    var bars = document.querySelectorAll('.rego_int_dash_bar');
    if (!bars.length) return;

    bars.forEach(function (bar) {
      var finalWidth = bar.style.width;
      bar.dataset.final = finalWidth;
      bar.style.width = '0%';
    });

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.style.width = b.dataset.final; });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var allBars = e.target.querySelectorAll('.rego_int_dash_bar');
          allBars.forEach(function (b, i) {
            setTimeout(function () {
              b.style.transition = 'width 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              b.style.width = b.dataset.final;
            }, i * 120);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    var dash = document.querySelector('.rego_int_dash');
    if (dash) obs.observe(dash);
  }

  $(document).ready(function () {
    initReveal();
    initHubFloat();
    initBarAnimation();
  });
})(jQuery);
