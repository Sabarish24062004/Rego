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

  function initTimelineBarEntrance() {
    var $card=$('.rego_ttm_timeline_card');
    if(!$card.length) return;
    var $traditional=$card.find('.rego_ttm_bar_fill.traditional');
    var $accelerated=$card.find('.rego_ttm_bar_fill.accelerated');
    $traditional.css({width:'0%',transition:'width 0.9s ease'});
    $accelerated.css({width:'0%',transition:'width 0.9s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $traditional.css({width:'100%'});
          setTimeout(function(){ $accelerated.css({width:'45%'}); },200);
          obs.unobserve(e.target);
        }
      });
    },{threshold:.35});
    obs.observe($card[0]);
  }

  function initGanttBarsEntrance() {
    var $card=$('.rego_ttm_gantt_card');
    if(!$card.length) return;
    var $bars=$card.find('.rego_ttm_gantt_bar');
    $bars.css({width:'0%',transition:'width .6s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $bars.each(function(i){
            var $b=$(this), target=$b.data('width')||'70%';
            setTimeout(function(){ $b.css({width:target}); },i*120);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    obs.observe($card[0]);
  }

  function initReadinessBarsEntrance() {
    var $bars=$('.rego_ttm_readiness_bar_fill');
    if(!$bars.length) return;
    $bars.css({width:'0%',transition:'width .55s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $bars.each(function(i){
            var $b=$(this), target=$b.data('width')||'65%';
            setTimeout(function(){ $b.css({width:target}); },i*100);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.35});
    var $section=$('.rego_ttm_readiness_section'); if($section.length) obs.observe($section[0]);
  }

  function initCrosswalkPillEntrance() {
    var $card=$('.rego_ttm_crosswalk_card');
    if(!$card.length) return;
    var $pills=$card.find('.rego_ttm_framework_pill');
    $pills.css({opacity:0,transform:'scale(0.8)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $pills.each(function(i){ var $p=$(this); setTimeout(function(){ $p.css({opacity:1,transform:'scale(1)'}); },i*150); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    obs.observe($card[0]);
  }

  function initProblemCardEntrance() {
    var $cards=$('.rego_ttm_problem_card');
    if(!$cards.length) return;
    $cards.css({opacity:0,transform:'translateY(16px)',transition:'opacity .4s ease,transform .4s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $cards.each(function(i){ var $c=$(this); setTimeout(function(){ $c.css({opacity:1,transform:'translateY(0)'}); },i*90); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.25});
    var $container=$('.rego_ttm_problems_container'); if($container.length) obs.observe($container[0]);
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initTimelineBarEntrance();
    initGanttBarsEntrance();
    initReadinessBarsEntrance();
    initCrosswalkPillEntrance();
    initProblemCardEntrance();
  });

})(jQuery);
