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

  function initDriftTicker() {
    var $rows=$('.rego_fcd_drift_row');
    if(!$rows.length) return;
    var drifts=[
      {severity:'critical',ctrl:'AC-2.4',name:'MFA policy removed',type:'Config Changed'},
      {severity:'warn',ctrl:'CM-6.1',name:'Baseline config mismatch',type:'Config Changed'},
      {severity:'critical',ctrl:'IA-5.2',name:'Password policy weakened',type:'Policy Updated'},
      {severity:'warn',ctrl:'AU-9.1',name:'Audit log retention reduced',type:'Config Changed'},
      {severity:'low',ctrl:'AC-3.7',name:'Owner unassigned (30d)',type:'Owner Changed'},
      {severity:'warn',ctrl:'SI-3.2',name:'AV definitions outdated',type:'Evidence Expired'}
    ];
    var idx=0;
    setInterval(function(){
      var drift=drifts[idx%drifts.length];
      var $row=$rows.eq(0);
      $row.fadeOut(200,function(){
        $row.attr('data-severity',drift.severity);
        $row.find('.rego_fcd_drift_severity').attr('class','rego_fcd_drift_severity').addClass('rego_fcd_'+drift.severity);
        $row.find('.rego_fcd_drift_ctrl').text(drift.ctrl);
        $row.find('.rego_fcd_drift_name').text(drift.name);
        $row.find('.rego_fcd_drift_type').text(drift.type);
        $row.fadeIn(250);
      });
      idx++;
    },4000);
  }

  function initProgressBarAnimate() {
    var $bar=$('.rego_fcd_progress_fill');
    if(!$bar.length) return;
    $bar.css({width:'0%',transition:'width 1.2s cubic-bezier(0.25,0.46,0.45,0.94)'});
    var $card=$('.rego_fcd_progress_card');
    if(!$card.length) return;
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $bar.css({width:'67%'});
          obs.unobserve(e.target);
        }
      });
    },{threshold:.20});
    obs.observe($card[0]);
  }

  function initDriftRowStagger() {
    var $rows=$('.rego_fcd_drift_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(-10px)',transition:'opacity .35s ease,transform .35s ease'});
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
    },{threshold:.10});
    $rows.each(function(){ obs.observe(this); });
  }

  function initWorkflowStepEntrance() {
    var $card=$('.rego_fcd_workflow_card');
    if(!$card.length) return;
    var $steps=$('.rego_fcd_workflow_step');
    if(!$steps.length) return;
    $steps.css({opacity:0,transform:'scale(0.9)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $steps.each(function(i){
            var $step=$(this);
            setTimeout(function(){ $step.css({opacity:1,transform:'scale(1)'}); },i*150);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.15});
    obs.observe($card[0]);
  }

  function initHistoryEntrance() {
    var $entries=$('.rego_fcd_history_entry');
    if(!$entries.length) return;
    $entries.css({opacity:0,transform:'translateX(8px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var $parent=$(e.target);
          $parent.find('.rego_fcd_history_entry').each(function(i){
            var $entry=$(this);
            setTimeout(function(){ $entry.css({opacity:1,transform:'translateX(0)'}); },i*70);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.10});
    var $card=$('.rego_fcd_history_card'); if($card.length) obs.observe($card[0]);
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initDriftTicker();
    initProgressBarAnimate();
    initDriftRowStagger();
    initWorkflowStepEntrance();
    initHistoryEntrance();
  });

})(jQuery);
