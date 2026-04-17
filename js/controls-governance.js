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

  function initGovBarEntrance() {
    var $card=$('.rego_cg_governance_card');
    if(!$card.length) return;
    var $bars=$('.rego_cg_gov_bar_fill');
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

  function initGovRowStagger() {
    var $rows=$('.rego_cg_gov_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(10px)',transition:'opacity .35s ease,transform .35s ease'});
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

  function initLibraryRowEntrance() {
    var $card=$('.rego_cg_library_card');
    if(!$card.length) return;
    var $rows=$('.rego_cg_lib_row');
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

  function initOwnerRowEntrance() {
    var $card=$('.rego_cg_owner_card');
    if(!$card.length) return;
    var $rows=$('.rego_cg_owner_row');
    if(!$rows.length) return;
    $rows.css({opacity:0,transform:'translateX(12px)',transition:'opacity .35s ease,transform .35s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){
            var $r=$(this);
            var $overdue=$r.find('.rego_cg_overdue_count');
            setTimeout(function(){
              $r.css({opacity:1,transform:'translateX(0)'});
              var od=parseInt($overdue.text())||0;
              if(od>0){
                $overdue.css({backgroundColor:'#dc3545',transition:'background-color .2s ease'});
                setTimeout(function(){
                  $overdue.css({backgroundColor:'',transition:'background-color .5s ease'});
                },400);
              }
            },i*80);
          });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.15});
    obs.observe($card[0]);
  }

  function initReportMetricEntrance() {
    var $card=$('.rego_cg_report_card');
    if(!$card.length) return;
    var $bars=$('.rego_cg_report_bar_fill');
    if(!$bars.length) return;
    $bars.each(function(){
      var $bar=$(this);
      var originalW=$bar.css('width');
      $bar.data('originalW',originalW);
      $bar.css({width:'0%',transition:'width .5s ease-out'});
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

  function initPillarCardHover() {
    $('.rego_cg_pillar_card').on('mouseenter',function(){
      var $icon=$(this).find('.rego_cg_pillar_icon');
      $icon.css({transform:'translateY(-4px)',transition:'transform .24s ease'});
      $(this).find('.rego_cg_pillar_icon_bg').css({opacity:0.12,transition:'opacity .24s ease'});
    }).on('mouseleave',function(){
      var $icon=$(this).find('.rego_cg_pillar_icon');
      $icon.css({transform:'translateY(0)',transition:'transform .24s ease'});
      $(this).find('.rego_cg_pillar_icon_bg').css({opacity:0.08,transition:'opacity .24s ease'});
    });
  }

  $(document).ready(function(){
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initGovBarEntrance();
    initGovRowStagger();
    initLibraryRowEntrance();
    initOwnerRowEntrance();
    initReportMetricEntrance();
    initPillarCardHover();
  });

})(jQuery);
