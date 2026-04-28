(function($){'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      $('.rego_reveal').addClass('rego_revealed');
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('rego_revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.rego_reveal').forEach(function(el) { obs.observe(el); });
  }

  function initSuccessSlider() {
    var $slider = $('#rego_mrl_success_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_mrl_slide');
    var $dots   = $slider.find('.rego_mrl_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total   = $slides.length;
    var interval = 5000;
    var timerId = null;
    var paused  = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_mrl_slide_active').eq(idx).addClass('rego_mrl_slide_active');
      $dots.removeClass('rego_mrl_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_mrl_slider_dot_active').attr('aria-selected', 'true');
      current = idx;
    }

    function next() { show(current + 1); }

    function start() {
      stop();
      timerId = setInterval(function() { if (!paused) next(); }, interval);
    }

    function stop() {
      if (timerId) { clearInterval(timerId); timerId = null; }
    }

    $dots.on('click', function() {
      var idx = parseInt($(this).attr('data-slide'), 10) || 0;
      show(idx);
      start();
    });

    $slider.on('mouseenter', function() { paused = true; });
    $slider.on('mouseleave', function() { paused = false; });

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) { stop(); } else { start(); }
    });

    start();
  }

  function initSmoothScroll() {
    $(document).on('click', 'a[href^="#rego_"]', function(e) {
      var $t = $($(this).attr('href')); if (!$t.length) return;
      e.preventDefault();
      $('html,body').animate({ scrollTop: $t.offset().top - 88 }, 440);
    });
  }

  $(document).ready(function() {
    initReveal();
    initSuccessSlider();
    initSmoothScroll();
  });

})(jQuery);
