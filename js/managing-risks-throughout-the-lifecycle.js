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

  function initRiskCycleAnimation() {
    var $card=$('.rego_mrl_lifecycle_card');
    if(!$card.length) return;
    var $pills=$('.rego_mrl_phase_pill');
    if(!$pills.length) return;
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          function cyclePhases() {
            $pills.each(function(i){
              var $pill=$(this);
              setTimeout(function(){
                $pill.css({borderColor:'var(--rego-primary)',boxShadow:'0 0 16px var(--rego-primary)',transition:'all .4s ease'});
                setTimeout(function(){
                  $pill.css({borderColor:'transparent',boxShadow:'none',transition:'all .4s ease'});
                },500);
              },i*800);
            });
            setTimeout(cyclePhases,($pills.length*800)+500);
          }
          cyclePhases();
          obs.unobserve(e.target);
        }
      });
    },{threshold:.20});
    obs.observe($card[0]);
  }

  function initRiskMatrixEntrance() {
    var $card=$('.rego_mrl_matrix_card');
    if(!$card.length) return;
    var $cells=$('.rego_mrl_matrix_cell');
    if(!$cells.length) return;
    $cells.css({opacity:0,transform:'scale(0)',transition:'opacity .4s ease,transform .4s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $cells.each(function(i){
            var $cell=$(this);
            setTimeout(function(){ $cell.css({opacity:1,transform:'scale(1)'}); },i*20);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.15});
    obs.observe($card[0]);
  }

  function initRiskScoreCounter() {
    var $score=$('.rego_mrl_center_score_num');
    if(!$score.length) return;
    var $card=$('.rego_mrl_score_card');
    if(!$card.length) return;
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var start=null, startVal=91, endVal=68;
          function step(ts) {
            if(!start) start=ts;
            var p=Math.min((ts-start)/1500,1), ease=1-Math.pow(1-p,3);
            var current=startVal-(startVal-endVal)*ease;
            $score.text(Math.round(current));
            if(p<1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    obs.observe($card[0]);
  }

  function initKanbanEntrance() {
    var $items=$('.rego_mrl_kanban_item');
    if(!$items.length) return;
    $items.css({opacity:0,transform:'translateY(12px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var $col=$(e.target);
          $col.find('.rego_mrl_kanban_item').each(function(i){
            var $item=$(this);
            setTimeout(function(){ $item.css({opacity:1,transform:'translateY(0)'}); },i*120);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.10});
    var $cols=$('.rego_mrl_kanban_col'); if($cols.length) $cols.each(function(){ obs.observe(this); });
  }

  function initSignalRowStagger() {
    var $rows=$('.rego_mrl_signal_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(-10px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){
            var $r=$(this);
            setTimeout(function(){ $r.css({opacity:1,transform:'translateX(0)'}); },i*90);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.10});
    $rows.each(function(){ obs.observe(this); });
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initRiskCycleAnimation();
    initRiskMatrixEntrance();
    initRiskScoreCounter();
    initKanbanEntrance();
    initSignalRowStagger();
  });

})(jQuery);
