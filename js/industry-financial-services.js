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
    var $slider = $('#rego_ifs_success_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_ifs_slide');
    var $dots   = $slider.find('.rego_ifs_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total   = $slides.length;
    var interval = 5000;
    var timerId = null;
    var paused  = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_ifs_slide_active').eq(idx).addClass('rego_ifs_slide_active');
      $dots.removeClass('rego_ifs_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_ifs_slider_dot_active').attr('aria-selected', 'true');
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

  function initAccordion() {
    var $acc = $('#rego_ifs_accordion');
    if (!$acc.length) return;

    var $vizItems = $('.rego_ifs_resviz_item');

    function showViz(target) {
      if (target === null || target === undefined) return;
      $vizItems.removeClass('rego_ifs_resviz_active').attr('aria-hidden', 'true');
      $vizItems.filter('[data-target="' + target + '"]')
               .addClass('rego_ifs_resviz_active')
               .attr('aria-hidden', 'false');
    }

    $acc.on('click', '.rego_ifs_acc_head', function() {
      var $head = $(this);
      var $item = $head.closest('.rego_ifs_acc_item');
      var willOpen = !$item.hasClass('rego_ifs_acc_open');

      $acc.find('.rego_ifs_acc_item').removeClass('rego_ifs_acc_open');
      $acc.find('.rego_ifs_acc_head').attr('aria-expanded', 'false');

      if (willOpen) {
        $item.addClass('rego_ifs_acc_open');
        $head.attr('aria-expanded', 'true');
        showViz($item.attr('data-target'));
      }
    });

    // Set initial viz to match the open accordion item
    var $initial = $acc.find('.rego_ifs_acc_item.rego_ifs_acc_open').first();
    if ($initial.length) showViz($initial.attr('data-target'));
  }

  $(document).ready(function() {
    initReveal();
    initSmoothScroll();
    initSuccessSlider();
    initAccordion();
  });

})(jQuery);
