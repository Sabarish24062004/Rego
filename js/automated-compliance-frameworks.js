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
    var $tabs=$('.rego_fw_tab_btn'), $panels=$('.rego_fw_tab_panel');
    $tabs.first().addClass('rego_fw_tab_active');
    $panels.hide().first().show();
    $tabs.on('click',function(){
      var t=$(this).data('tab');
      $tabs.removeClass('rego_fw_tab_active');
      $(this).addClass('rego_fw_tab_active');
      $panels.fadeOut(120).filter('[data-tab="'+t+'"]').fadeIn(220);
    });
  }

  function initCrosswalkAnimation() {
    var $center=$('.rego_fw_cw_center');
    if(!$center.length||!('IntersectionObserver' in window)) return;
    var $nodes=$('.rego_fw_cw_node');
    $nodes.css({opacity:0,transform:'scale(.7)',transition:'opacity .4s ease,transform .4s ease'});
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          $nodes.each(function(i){ var $n=$(this); setTimeout(function(){ $n.css({opacity:1,transform:'scale(1)'}); },i*80+200); });
          obs.unobserve(e.target);
        }
      });
    },{threshold:.30});
    obs.observe($center[0]);
  }

  function initFrameworkCardHover() {
    $(document).on('mouseenter','.rego_fw_card',function(){
      $(this).css('box-shadow','0 8px 32px rgba(74,86,158,.18)');
    }).on('mouseleave','.rego_fw_card',function(){
      $(this).css('box-shadow','');
    });
  }

  function initSmoothScroll() {
    $(document).on('click','a[href^="#rego_"]',function(e){
      var $t=$($(this).attr('href')); if(!$t.length) return;
      e.preventDefault();
      $('html,body').animate({scrollTop:$t.offset().top-88},440);
    });
  }

  $(document).ready(function(){
    initReveal(); initCounters('[data-target]'); initTabs(); initCrosswalkAnimation();
    initFrameworkCardHover(); initSmoothScroll();
  });

})(jQuery);
