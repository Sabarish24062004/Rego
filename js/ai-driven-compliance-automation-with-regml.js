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

  function initAIConsoleDemo() {
    var queries=[
      'Find all AC-6 violations in prod since yesterday',
      'Which controls have failed more than 3 times this month?',
      'Show me CMMC gaps vs our current posture',
      'Predict risk score change if we patch CVE-2024-1234'
    ];
    var responses=[
      ['HIGH: S3 bucket policy allows public access (prod-data-lake)','MED: IAM role missing least-privilege — svc-deploy','LOW: CloudTrail disabled in us-west-2 secondary region'],
      ['CM-7 failed 5 times — Least Functionality (prod-k8s)','AU-9 failed 4 times — Audit Log Protection (db-tier)','SC-8 failed 3 times — Transmission Confidentiality'],
      ['Gap: AC.L2-3.1.5 — Least Privilege not fully implemented','Gap: AU.L2-3.3.1 — Audit logs missing for 2 subsystems','Gap: IA.L2-3.5.3 — MFA not enforced for privileged access'],
      ['Predicted risk reduction: -12% (High confidence 94%)','Controls improved: SC-28, SI-2, RA-5','Estimated new compliance score: +4.2 points']
    ];
    var idx=0;
    $('.rego_ai_run_btn').on('click',function(){
      var $input=$('.rego_ai_query_input');
      var $results=$('.rego_ai_results_list');
      $results.fadeOut(200,function(){
        var items=responses[idx%response.length];
        var html=items.map(function(r,i){
          var sev=i===0?'HIGH':i===1?'MED':'LOW';
          var bg=i===0?'#ef4444':i===1?'#f59e0b':'#3b82f6';
          var col=i===1?'#1a1b2e':'#fff';
          return '<div class="rego_ai_result_row"><span style="background:'+bg+';color:'+col+';font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;flex-shrink:0">'+sev+'</span><span style="font-size:12px;color:rgba(255,255,255,.65)">'+r+'</span></div>';
        }).join('');
        $results.html(html).fadeIn(300);
        idx++;
        $input.val(queries[idx%queries.length]);
      });
    });
    setInterval(function(){ $('.rego_ai_run_btn').trigger('click'); },5000);
  }

  function initSmoothScroll() {
    $(document).on('click','a[href^="#rego_"]',function(e){
      var $t=$($(this).attr('href')); if(!$t.length) return;
      e.preventDefault();
      $('html,body').animate({scrollTop:$t.offset().top-88},440);
    });
  }

  $(document).ready(function(){
    initReveal(); initCounters('[data-target]'); initAIConsoleDemo(); initSmoothScroll();
  });

})(jQuery);
