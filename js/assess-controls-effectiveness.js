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

  function initSmoothScroll() {
    var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')) || 72;
    $(document).on('click','a[href^="#rego_"]',function(e){
      var $t=$($(this).attr('href')); if(!$t.length) return;
      e.preventDefault();
      $('html,body').animate({scrollTop:$t.offset().top-headerH},440);
    });
  }

  function initEffBarEntrance() {
    var $card=$('.rego_ace_effectiveness_card');
    if(!$card.length) return;
    var $bars=$('.rego_ace_eff_bar_fill');
    if(!$bars.length) return;
    $bars.each(function(){
      var $bar=$(this);
      var originalW=$bar.css('width');
      $bar.data('originalW',originalW);
      $bar.css({width:'0%',transition:'width .5s cubic-bezier(0.25,0.46,0.45,0.94)'});
    });
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $bars.each(function(i){
            var $bar=$(this);
            setTimeout(function(){ $bar.css({width:$bar.data('originalW')}); },i*100);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.15});
    obs.observe($card[0]);
  }

  function initScoringSubBarsEntrance() {
    var $card=$('.rego_ace_scoring_card');
    if(!$card.length) return;
    var $bars=$('.rego_ace_sub_bar_fill');
    if(!$bars.length) return;
    $bars.each(function(){
      var $bar=$(this);
      var originalW=$bar.css('width');
      $bar.data('originalW',originalW);
      $bar.css({width:'0%',transition:'width .45s ease-out'});
    });
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $bars.each(function(i){
            var $bar=$(this);
            setTimeout(function(){ $bar.css({width:$bar.data('originalW')}); },i*120);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.15});
    obs.observe($card[0]);
  }

  function initEffRowStagger() {
    var $rows=$('.rego_ace_eff_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(10px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){
            var $r=$(this);
            setTimeout(function(){ $r.css({opacity:1,transform:'translateX(0)'}); },i*70);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.10});
    $rows.each(function(){ obs.observe(this); });
  }

  function initGapCardEntrance() {
    var $items=$('.rego_ace_gap_item');
    if(!$items.length) return;
    $items.css({opacity:0,transform:'translateY(10px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var $parent=$(e.target);
          $parent.find('.rego_ace_gap_item').each(function(i){
            var $item=$(this);
            setTimeout(function(){ $item.css({opacity:1,transform:'translateY(0)'}); },i*100);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.10});
    var $card=$('.rego_ace_gap_card'); if($card.length) obs.observe($card[0]);
  }

  function initFrameworkBadgeHover() {
    $('.rego_ace_fw_card').on('mouseenter',function(){
      $(this).css({transform:'scale(1.05)',boxShadow:'0 12px 28px rgba(0,0,0,0.15)',transition:'all .24s ease'});
    }).on('mouseleave',function(){
      $(this).css({transform:'scale(1)',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'});
    });
  }

  function initImpactSlider() {
    var $slider = $('.rego_ace_slider');
    if (!$slider.length) return;
    var $slides = $slider.find('.rego_ace_slide');
    var $dotsWrap = $slider.find('.rego_ace_slider_dots');
    if (!$slides.length) return;

    var current = 0;
    var total = $slides.length;
    var autoplay = null;

    $dotsWrap.empty();
    for (var i = 0; i < total; i++) {
      var $dot = $('<button class="rego_ace_slider_dot" type="button" role="tab" aria-label="Go to slide ' + (i+1) + '"></button>');
      $dot.attr('data-index', i);
      $dotsWrap.append($dot);
    }
    var $dots = $dotsWrap.find('.rego_ace_slider_dot');

    function go(index) {
      current = (index + total) % total;
      $slides.removeClass('rego_ace_slide_active');
      $slides.eq(current).addClass('rego_ace_slide_active');
      $dots.removeClass('rego_ace_slider_dot_active');
      $dots.eq(current).addClass('rego_ace_slider_dot_active');
    }

    function startAutoplay() {
      stopAutoplay();
      autoplay = setInterval(function(){ go(current + 1); }, 6000);
    }
    function stopAutoplay() { if (autoplay) { clearInterval(autoplay); autoplay = null; } }

    $slider.on('click', '.rego_ace_slider_arrow_prev', function(){ go(current - 1); startAutoplay(); });
    $slider.on('click', '.rego_ace_slider_arrow_next', function(){ go(current + 1); startAutoplay(); });
    $dots.on('click', function(){ go(parseInt($(this).attr('data-index'), 10)); startAutoplay(); });
    $slider.on('mouseenter', stopAutoplay).on('mouseleave', startAutoplay);

    go(0);
    startAutoplay();
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initEffBarEntrance();
    initScoringSubBarsEntrance();
    initEffRowStagger();
    initGapCardEntrance();
    initFrameworkBadgeHover();
    initImpactSlider();
  });

})(jQuery);
