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

  function initControlRowEntrance() {
    var $rows=$('.rego_ccm_control_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(-10px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){ var $r=$(this); setTimeout(function(){ $r.css({opacity:1,transform:'translateX(0)'}); },i*80); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.25});
    var $card=$('.rego_ccm_dashboard_card'); if($card.length) obs.observe($card[0]);
  }

  function initLiveScoreRing() {
    var $ring=$('.rego_ccm_score_ring');
    if(!$ring.length) return;
    var circumference=327, targetPercent=0.94, targetDashoffset=circumference*(1-targetPercent);
    $ring.css({strokeDashoffset:circumference});
    var start=null;
    function step(ts) {
      if(!start) start=ts;
      var p=Math.min((ts-start)/1200,1), ease=1-Math.pow(1-p,3);
      var current=circumference-(circumference*targetPercent*ease);
      $ring.css({strokeDashoffset:current});
      if(p<1) requestAnimationFrame(step);
    }
    setTimeout(function(){ requestAnimationFrame(step); },400);
  }

  function initAlertFeedTicker() {
    var $rows=$('.rego_ccm_alert_row');
    if(!$rows.length) return;
    var alerts=[
      {severity:'critical',control:'CTL-001',desc:'MFA bypass vulnerability detected',ts:'now'},
      {severity:'high',control:'CTL-042',desc:'Access log tampering attempted',ts:'1m'},
      {severity:'high',control:'CTL-087',desc:'Policy drift on data encryption',ts:'4m'},
      {severity:'medium',control:'CTL-156',desc:'Backup integrity verification failed',ts:'8m'},
      {severity:'low',control:'CTL-203',desc:'Unused API credential detected',ts:'12m'},
      {severity:'critical',control:'CTL-089',desc:'Root privilege escalation attempt',ts:'15m'}
    ];
    var idx=0;
    setInterval(function(){
      var alert=alerts[idx%alerts.length];
      var $row=$rows.eq(0);
      $row.fadeOut(200,function(){
        $row.attr('data-severity',alert.severity).find('.rego_ccm_alert_control').text(alert.control);
        $row.find('.rego_ccm_alert_desc').text(alert.desc);
        $row.find('.rego_ccm_alert_ts').text(alert.ts);
        $row.fadeIn(250);
      });
      idx++;
    },4000);
  }

  function initFrameworkBadgeHover() {
    $('.rego_ccm_fw_card').on('mouseenter',function(){
      $(this).css({transform:'scale(1.04)',boxShadow:'0 16px 32px rgba(0,0,0,0.12)',transition:'all .24s ease'});
    }).on('mouseleave',function(){
      $(this).css({transform:'scale(1)',boxShadow:'0 4px 12px rgba(0,0,0,0.08)'});
    });
  }

  function initReportCardButtons() {
    $('.rego_ccm_format_btn').on('click',function(){
      var $btns=$(this).parent().find('.rego_ccm_format_btn');
      $btns.removeClass('rego_ccm_format_active');
      $(this).addClass('rego_ccm_format_active');
    });
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initControlRowEntrance();
    initLiveScoreRing();
    initAlertFeedTicker();
    initFrameworkBadgeHover();
    initReportCardButtons();
  });

})(jQuery);
