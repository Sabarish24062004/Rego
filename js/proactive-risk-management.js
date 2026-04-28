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

  function initSignalFeedTicker() {
    var $rows=$('.rego_prm_signal_row');
    if(!$rows.length) return;
    var signals=[
      {dot:'critical',name:'MFA disabled — 12 accounts',time:'Just now'},
      {dot:'high',name:'Config drift detected — 3 controls',time:'1m ago'},
      {dot:'high',name:'CVE-2025-1234 — CVSS 8.9 detected',time:'3m ago'},
      {dot:'medium',name:'Password policy weakened',time:'7m ago'},
      {dot:'low',name:'Unused IAM role — 30d inactive',time:'12m ago'},
      {dot:'critical',name:'Encryption disabled — S3 bucket',time:'18m ago'},
      {dot:'high',name:'Open port 8080 detected',time:'25m ago'},
      {dot:'medium',name:'Log retention under 90 days',time:'31m ago'}
    ];
    var idx=0;
    setInterval(function(){
      for(var i=0;i<5&&i<$rows.length;i++){
        var sig=signals[(idx+i)%signals.length];
        var $row=$rows.eq(i);
        var $dot=$row.find('.rego_prm_signal_dot');
        $dot.attr('data-severity',sig.dot).css({opacity:0});
        $row.find('.rego_prm_signal_name').text(sig.name);
        $row.find('.rego_prm_signal_time').text(sig.time);
        setTimeout(function(){ $dot.css({opacity:1,transition:'opacity .3s ease'}); },10);
      }
      idx++;
    },3500);
  }

  function initCompareCardsEntrance() {
    var $cards=$('.rego_prm_compare_card');
    if(!$cards.length) return;
    $cards.css({opacity:0,transition:'opacity .4s ease,transform .4s ease'});
    $cards.filter(':first-child').css({transform:'translateX(-20px)'});
    $cards.filter(':last-child').css({transform:'translateX(20px)'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $cards.each(function(){
            var $c=$(this);
            setTimeout(function(){ $c.css({opacity:1,transform:'translateX(0)'}); },50);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    var $container=$('.rego_prm_compare_container'); if($container.length) obs.observe($container[0]);
  }

  function initConnectorPillHover() {
    $('.rego_prm_connector_pill').on('mouseenter',function(){
      $(this).css({transform:'translateY(-2px)',boxShadow:'0 8px 24px rgba(0,0,0,0.15)',transition:'all .2s ease'});
    }).on('mouseleave',function(){
      $(this).css({transform:'translateY(0)',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'});
    });
  }

  function initRiskScoreAnimation() {
    var $ring=$('.rego_prm_gauge_ring');
    if(!$ring.length) return;
    var circumference=329, targetPercent=0.73, targetDashoffset=circumference*(1-targetPercent);
    $ring.css({strokeDashoffset:circumference});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var start=null;
          function step(ts) {
            if(!start) start=ts;
            var p=Math.min((ts-start)/1200,1), ease=1-Math.pow(1-p,3);
            var current=circumference-(circumference*targetPercent*ease);
            $ring.css({strokeDashoffset:current});
            if(p<1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          obs.unobserve(e.target);
        }
      });
    },{threshold:.40});
    obs.observe($ring[0]);
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initSignalFeedTicker();
    initCompareCardsEntrance();
    initConnectorPillHover();
    initRiskScoreAnimation();
  });

})(jQuery);
