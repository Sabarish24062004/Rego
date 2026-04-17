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

  function initEvidenceCollectorTicker() {
    var $rows=$('.rego_aec_evidence_row');
    if(!$rows.length) return;
    var $counter=$('.rego_aec_artifact_count');
    var startCount=parseInt($counter.data('start')||0);
    var currentCount=startCount;
    setInterval(function(){
      var inProgress=$rows.filter('[data-status="IN PROGRESS"]');
      if(inProgress.length>0){
        var $row=inProgress.eq(Math.floor(Math.random()*inProgress.length));
        $row.fadeOut(150,function(){
          $row.attr('data-status','COLLECTED').find('.rego_aec_row_status').text('COLLECTED');
          $row.fadeIn(200);
          currentCount++;
          $counter.text(currentCount);
        });
      }
    },2500);
  }

  function initConnectorPillEntrance() {
    var $pills=$('.rego_aec_category_pill');
    if(!$pills.length) return;
    $pills.css({opacity:0,transform:'translateY(8px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $pills.each(function(i){ var $p=$(this); setTimeout(function(){ $p.css({opacity:1,transform:'translateY(0)'}); },i*30); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.25});
    var $section=$('.rego_aec_connectors_section'); if($section.length) obs.observe($section[0]);
  }

  function initCompareEntrance() {
    var $cols=$('.rego_aec_compare_col');
    if(!$cols.length) return;
    $cols.css({opacity:0,transition:'opacity .4s ease,transform .4s ease'});
    $cols.filter(':first-child').css({transform:'translateX(-16px)'});
    $cols.filter(':last-child').css({transform:'translateX(16px)'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $cols.each(function(){ var $c=$(this); setTimeout(function(){ $c.css({opacity:1,transform:'translateX(0)'}); },60); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    var $card=$('.rego_aec_compare_card'); if($card.length) obs.observe($card[0]);
  }

  function initFreshnessBarEntrance() {
    var $card=$('.rego_aec_freshness_card');
    if(!$card.length) return;
    var $bars=$card.find('.rego_aec_freshness_bar');
    $bars.css({width:'0%',transition:'width .6s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $bars.each(function(i){
            var $b=$(this), target=$b.data('target-width')||'60%';
            setTimeout(function(){ $b.css({width:target}); },i*100);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.35});
    obs.observe($card[0]);
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initEvidenceCollectorTicker();
    initConnectorPillEntrance();
    initCompareEntrance();
    initFreshnessBarEntrance();
  });

})(jQuery);
