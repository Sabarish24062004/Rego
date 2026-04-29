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

  function initHeatmapEntrance() {
    var $heatmap=$('.rego_sr_heatmap');
    if(!$heatmap.length) return;
    var $cells=$('.rego_sr_cell');
    $cells.css({opacity:0,transform:'scale(0.7)',transition:'opacity .4s ease,transform .4s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $cells.each(function(i){
            var $c=$(this);
            var delay=i*20+Math.random()*15;
            setTimeout(function(){ $c.css({opacity:1,transform:'scale(1)'}); },delay);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.35});
    obs.observe($heatmap[0]);
  }

  function initRiskRowStagger() {
    var $rows=$('.rego_sr_risk_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(12px)',transition:'opacity .38s ease,transform .38s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){ var $r=$(this); setTimeout(function(){ $r.css({opacity:1,transform:'translateX(0)'}); },i*70); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    var $card=$('.rego_sr_risks_card'); if($card.length) obs.observe($card[0]);
  }

  function initRiskScoreCounter() {
    var $num=$('.rego_sr_overall_num');
    if(!$num.length) return;
    var $wrapper=$num.closest('[data-target]');
    if($wrapper.length) {
      var target=parseFloat($wrapper.data('target')||0);
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(!e.isIntersecting) return;
          obs.unobserve(e.target);
          animateCounter($wrapper, target, 1600);
        });
      },{threshold:.40});
      obs.observe($wrapper[0]);
    }
  }

  function initPainCardGlow() {
    $('.rego_sr_pain_card').on('mouseenter',function(){
      var $icon=$(this).find('.rego_sr_pain_icon');
      $icon.css({background:'linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%)',boxShadow:'0 0 24px rgba(37,99,235,0.4)',transition:'all .2s ease'});
    }).on('mouseleave',function(){
      var $icon=$(this).find('.rego_sr_pain_icon');
      $icon.css({background:'',boxShadow:''});
    });
  }

  function initWorkflowStepEntrance() {
    var $card=$('.rego_sr_workflow_card');
    if(!$card.length) return;
    var $steps=$('.rego_sr_workflow_step');
    $steps.css({opacity:0,transform:'translateY(8px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $steps.each(function(i){ var $s=$(this); setTimeout(function(){ $s.css({opacity:1,transform:'translateY(0)'}); },i*150); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    obs.observe($card[0]);
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initHeatmapEntrance();
    initRiskRowStagger();
    initRiskScoreCounter();
    initPainCardGlow();
    initWorkflowStepEntrance();
  });

})(jQuery);
