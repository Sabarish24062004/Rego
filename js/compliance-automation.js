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

  function initTabs() {
    var $tabs=$('.rego_ca_tab_btn'), $panels=$('.rego_ca_tab_panel');
    $tabs.first().addClass('rego_ca_tab_active');
    $panels.hide().first().show();
    $tabs.on('click',function(){
      var t=$(this).data('tab');
      $tabs.removeClass('rego_ca_tab_active');
      $(this).addClass('rego_ca_tab_active');
      $panels.fadeOut(150,function(){}).filter('[data-tab="'+t+'"]').fadeIn(250);
    });
  }

  function initMetricRows() {
    var $rows=$('.rego_ca_metric_row');
    $rows.css({opacity:0,transform:'translateX(-12px)',transition:'opacity .4s ease,transform .4s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $rows.each(function(i){ var $r=$(this); setTimeout(function(){ $r.css({opacity:1,transform:'translateX(0)'}); },i*90); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    var $card=$('.rego_ca_impact_card'); if($card.length) obs.observe($card[0]);
  }

  function initSmoothScroll() {
    $(document).on('click','a[href^="#rego_"]',function(e){
      var $t=$($(this).attr('href')); if(!$t.length) return;
      e.preventDefault();
      $('html,body').animate({scrollTop:$t.offset().top-88},440);
    });
  }

  $(document).ready(function(){
    initReveal(); initCounters('[data-target]'); initTabs(); initMetricRows(); initSmoothScroll();
  });

})(jQuery);
