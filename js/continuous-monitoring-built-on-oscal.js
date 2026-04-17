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

  function initLiveEventTicker() {
    var $events = $('.rego_oscal_event');
    if(!$events.length) return;
    var messages = [
      ['pass','AC-2 — Account Management validated','0s ago'],
      ['pass','AU-12 — Audit Generation checked','4s ago'],
      ['warn','CM-7 — Least Functionality drift detected','12s ago'],
      ['pass','SC-28 — Data at Rest protection verified','19s ago'],
      ['pass','IA-2 — MFA enforcement confirmed','31s ago'],
      ['warn','SI-2 — Patch status pending on node-04','44s ago']
    ];
    var idx=4;
    setInterval(function(){
      var msg=messages[idx%messages.length]; idx++;
      var $first=$events.first();
      var dot=msg[0]==='pass'?'rego_dot_green':'rego_dot_yellow';
      $first.fadeOut(300,function(){
        $(this).find('.rego_oscal_event_dot').removeClass('rego_dot_green rego_dot_yellow').addClass(dot);
        $(this).find('span:nth-child(2)').text(msg[1]);
        $(this).find('.rego_oscal_event_time').text(msg[2]);
        $(this).fadeIn(300);
      });
      $events.not(':first').each(function(i){
        var t=$(this).find('.rego_oscal_event_time').text();
        var num=parseInt(t)||0;
        $(this).find('.rego_oscal_event_time').text((num+4)+'s ago');
      });
    },3500);
  }

  function initScoreBars() {
    var $bars=$('.rego_oscal_bar div');
    $bars.each(function(){ $(this).data('w',$(this).css('width')).css('width','0%'); });
    if(!('IntersectionObserver' in window)){ $bars.each(function(){ $(this).css('width',$(this).data('w')); }); return; }
    var done=false;
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting&&!done){ done=true; obs.unobserve(e.target);
          $bars.each(function(i){ var $b=$(this); setTimeout(function(){ $b.css('width',$b.data('w')||'0%'); },i*120); });
        }
      });
    },{threshold:.30});
    var $card=$('.rego_oscal_dash_mock');
    if($card.length) obs.observe($card[0]);
  }

  function initSmoothScroll() {
    $(document).on('click','a[href^="#rego_"]',function(e){
      var $t=$($(this).attr('href')); if(!$t.length) return;
      e.preventDefault();
      $('html,body').animate({scrollTop:$t.offset().top-88},440,'swing');
    });
  }

  $(document).ready(function(){
    initReveal(); initCounters('.rego_oscal_stat_val');
    initLiveEventTicker(); initScoreBars(); initSmoothScroll();
  });

})(jQuery);
