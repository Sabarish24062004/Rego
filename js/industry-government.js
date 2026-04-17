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

  function initGovFrameworkBars() {
    var $card = $('.rego_gov_mission_card');
    if (!$card.length) return;
    var $bars = $card.find('.rego_gov_fw_bar_fill');
    if (!$bars.length) return;

    $bars.each(function() {
      var $b = $(this);
      var w = $b.width();
      $b.data('target-width', w).width(0);
    });

    if (!('IntersectionObserver' in window)) {
      $bars.each(function() { $(this).width($(this).data('target-width')); });
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $bars.each(function(i) {
            var $b = $(this), tw = $b.data('target-width');
            setTimeout(function() {
              $b.css({transition:'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)'});
              $b.width(tw);
            }, i * 120);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    obs.observe($card[0]);
  }

  function initATOPhaseBars() {
    var $card = $('.rego_gov_ato_card');
    if (!$card.length) return;
    var $bars = $card.find('.rego_gov_ato_phase_fill');
    if (!$bars.length) return;

    $bars.each(function() {
      var $b = $(this);
      var w = $b.width();
      $b.data('target-width', w).width(0);
    });

    if (!('IntersectionObserver' in window)) {
      $bars.each(function() { $(this).width($(this).data('target-width')); });
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $bars.each(function(i) {
            var $b = $(this), tw = $b.data('target-width');
            setTimeout(function() {
              $b.css({transition:'width 700ms cubic-bezier(0.34, 1.56, 0.64, 1)'});
              $b.width(tw);
            }, i * 150);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    obs.observe($card[0]);
  }

  function initCMMCGauge() {
    var $pct = $('.rego_gov_cmmc_pct');
    if (!$pct.length) return;

    if (!('IntersectionObserver' in window)) {
      $pct.text('76');
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          obs.unobserve(e.target);
          animateCounter($pct.closest('[data-target]'), 76, 1800);
        }
      });
    }, { threshold: 0.4 });

    $pct.closest('[data-target]').each(function() { obs.observe(this); });
  }

  function initConMonTicker() {
    var $rows = $('.rego_gov_monitor_event');
    if (!$rows.length) return;

    var events = [
      { sev: 'pass', ctrl: 'AC-2.4', type: 'Control Verified' },
      { sev: 'warn', ctrl: 'CM-6.1', type: 'Config Drift Detected' },
      { sev: 'pass', ctrl: 'IA-5.1', type: 'MFA Check Passed' },
      { sev: 'fail', ctrl: 'AU-9.2', type: 'Log Retention Alert' },
      { sev: 'pass', ctrl: 'SC-28.1', type: 'Encryption Verified' },
      { sev: 'warn', ctrl: 'SI-3.1', type: 'Patch Overdue (7d)' },
      { sev: 'pass', ctrl: 'AC-17.1', type: 'VPN Access Verified' },
      { sev: 'fail', ctrl: 'RA-5.1', type: 'Vuln Scan Failed' }
    ];

    var idx = 0;
    setInterval(function() {
      var evt = events[idx % events.length];
      var $row = $rows.eq(0);
      $row.fadeOut(180, function() {
        $row.attr('data-severity', evt.sev)
          .find('.rego_gov_event_control').text(evt.ctrl);
        $row.find('.rego_gov_event_type').text(evt.type);
        $row.fadeIn(220);
      });
      idx++;
    }, 4000);
  }

  function initServeCardHover() {
    $('.rego_gov_serve_card').on('mouseenter', function() {
      $(this).css({
        transform: 'scale(1.03)',
        boxShadow: '0 20px 48px rgba(0,0,0,0.14)',
        transition: 'all 0.28s ease'
      });
    }).on('mouseleave', function() {
      $(this).css({
        transform: 'scale(1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      });
    });
  }

  $(document).ready(function() {
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initGovFrameworkBars();
    initATOPhaseBars();
    initCMMCGauge();
    initConMonTicker();
    initServeCardHover();
  });

})(jQuery);
