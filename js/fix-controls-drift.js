(function($){'use strict';

  function initReveal() {
    var $els = $('.rego_reveal');
    if (!$els.length || !('IntersectionObserver' in window)) { $els.addClass('rego_revealed'); return; }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if(e.isIntersecting){ $(e.target).addClass('rego_revealed'); obs.unobserve(e.target); } });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
    $els.each(function(){ obs.observe(this); });
  }

  function initSmoothScroll() {
    var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')) || 72;
    $(document).on('click','a[href^="#rego_"]',function(e){
      var $t=$($(this).attr('href')); if(!$t.length) return;
      e.preventDefault();
      $('html,body').animate({scrollTop:$t.offset().top-headerH},440);
    });
  }

  function initSuccessSlider() {
    var $slider = $('#rego_fcd_success_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_fcd_slide');
    var $dots   = $slider.find('.rego_fcd_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total   = $slides.length;
    var interval = 5000;
    var timerId = null;
    var paused  = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_fcd_slide_active').eq(idx).addClass('rego_fcd_slide_active');
      $dots.removeClass('rego_fcd_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_fcd_slider_dot_active').attr('aria-selected', 'true');
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

  $(document).ready(function() {
    initReveal();
    initSmoothScroll();
    initSuccessSlider();
  });

})(jQuery);
