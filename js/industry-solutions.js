(function($){'use strict';

  function initReveal() {
    var $els = $('.rego_reveal');
    if (!$els.length || !('IntersectionObserver' in window)) { $els.addClass('rego_revealed'); return; }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if(e.isIntersecting){ $(e.target).addClass('rego_revealed'); obs.unobserve(e.target); } });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
    $els.each(function(){ obs.observe(this); });
  }

  function animateCounter($el, target, dur) {
    var start=null;
    function step(ts) {
      if(!start) start=ts;
      var p=Math.min((ts-start)/dur,1), ease=1-Math.pow(1-p,3);
      var val=target*ease;
      var disp = String(target).indexOf('.')!==-1 ? val.toFixed(1) : Math.round(val).toString();
      $el.find('.rego_val_num').text(disp);
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters(selector) {
    if(!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        obs.unobserve(e.target);
        var $el=$(e.target), t=parseFloat($el.data('target')||0);
        animateCounter($el, t, 1800);
      });
    },{threshold:.40});
    $(selector||'[data-target]').each(function(){ obs.observe(this); });
  }

  function initIndustryCards() {
    $(document).on('mouseenter','.rego_ind_card',function(){
      $(this).find('.rego_ind_card_icon').css({transform:'scale(1.1) rotate(-3deg)',transition:'transform .3s ease'});
    }).on('mouseleave','.rego_ind_card',function(){
      $(this).find('.rego_ind_card_icon').css({transform:'scale(1) rotate(0deg)'});
    });
  }

  function initAtoCardAnimation() {
    var $items=$('.rego_ind_ato_item');
    if(!$items.length||!('IntersectionObserver' in window)) return;
    $items.css({opacity:0,transform:'translateX(-16px)',transition:'opacity .4s ease,transform .4s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $items.each(function(i){ var $it=$(this); setTimeout(function(){ $it.css({opacity:1,transform:'translateX(0)'}); },i*120); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    var $c=$('.rego_ind_ato_card'); if($c.length) obs.observe($c[0]);
  }

  function initSmoothScroll() {
    $(document).on('click','a[href^="#rego_"]',function(e){
      var $t=$($(this).attr('href')); if(!$t.length) return;
      e.preventDefault();
      $('html,body').animate({scrollTop:$t.offset().top-88},440);
    });
  }

  function initLogoRowAnimation() {
    var $logos=$('.rego_ind_logo_item');
    if(!$logos.length||!('IntersectionObserver' in window)) return;
    $logos.css({opacity:0,transition:'opacity .4s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $logos.each(function(i){ var $l=$(this); setTimeout(function(){ $l.css('opacity',1); },i*80); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.20});
    var $row=$('.rego_ind_logo_row'); if($row.length) obs.observe($row[0]);
  }

  function initSuccessSlider() {
    var $slider = $('#rego_ins_success_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_ins_slide');
    var $dots   = $slider.find('.rego_ins_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total   = $slides.length;
    var interval = 5000;
    var timerId = null;
    var paused  = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_ins_slide_active').eq(idx).addClass('rego_ins_slide_active');
      $dots.removeClass('rego_ins_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_ins_slider_dot_active').attr('aria-selected', 'true');
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

  $(document).ready(function(){
    initReveal(); initCounters('[data-target]'); initIndustryCards();
    initAtoCardAnimation(); initSmoothScroll(); initLogoRowAnimation();
    initSuccessSlider();
  });

})(jQuery);
