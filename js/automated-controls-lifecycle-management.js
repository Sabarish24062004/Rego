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

  function initPhaseBarHover() {
    $('.rego_clm_phase_pill').on('mouseenter',function(){
      $(this).css({transform:'scale(1.08)',opacity:0.95,transition:'all .24s ease'});
    }).on('mouseleave',function(){
      $(this).css({transform:'scale(1)',opacity:1});
    });
  }

  function initControlRowStagger() {
    var $card=$('.rego_clm_lifecycle_card');
    if(!$card.length) return;
    var $rows=$('.rego_clm_control_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(-8px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){
            var $r=$(this);
            setTimeout(function(){ $r.css({opacity:1,transform:'translateX(0)'}); },i*80);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.15});
    obs.observe($card[0]);
  }

  function initTestRowEntrance() {
    var $card=$('.rego_clm_test_card');
    if(!$card.length) return;
    var $rows=$('.rego_clm_test_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateY(8px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){
            var $r=$(this);
            setTimeout(function(){ $r.css({opacity:1,transform:'translateY(0)'}); },i*90);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.15});
    obs.observe($card[0]);
  }

  function initLifecycleCardPulse() {
    var $rows=$('.rego_clm_control_row');
    if(!$rows.length) return;
    setInterval(function(){
      var randIdx=Math.floor(Math.random()*$rows.length);
      var $row=$rows.eq(randIdx);
      $row.css({backgroundColor:'rgba(74,86,158,0.15)',transition:'background-color .2s ease'});
      setTimeout(function(){
        $row.css({backgroundColor:'transparent',transition:'background-color .6s ease'});
      },200);
    },5000);
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initPhaseBarHover();
    initControlRowStagger();
    initTestRowEntrance();
    initLifecycleCardPulse();
  });

})(jQuery);
