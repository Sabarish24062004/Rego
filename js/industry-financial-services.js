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

  function initFinFrameworkBars() {
    var $card = $('.rego_fin_compliance_card');
    if (!$card.length) return;
    var $bars = $card.find('.rego_fin_fw_bar_fill');
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
              $b.css({transition: 'width 650ms cubic-bezier(0.34, 1.56, 0.64, 1)'});
              $b.width(tw);
            }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    obs.observe($card[0]);
  }

  function initPCIDSSGrid() {
    var $card = $('.rego_fin_pci_card');
    if (!$card.length) return;
    var $reqs = $card.find('.rego_fin_pci_req');
    if (!$reqs.length) return;

    $reqs.css({opacity: 0, transform: 'scale(0.7)', transition: 'opacity 0.4s ease, transform 0.4s ease'});

    if (!('IntersectionObserver' in window)) {
      $reqs.css({opacity: 1, transform: 'scale(1)'});
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $reqs.each(function(i) {
            var $r = $(this);
            setTimeout(function() {
              $r.css({opacity: 1, transform: 'scale(1)'});
            }, i * 50);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe($card[0]);
  }

  function initSOC2RowStagger() {
    var $card = $('.rego_fin_soc2_card');
    if (!$card.length) return;
    var $rows = $card.find('.rego_fin_tsc_row');
    if (!$rows.length) return;

    $rows.css({opacity: 0, transform: 'translateX(10px)', transition: 'opacity 0.36s ease, transform 0.36s ease'});

    if (!('IntersectionObserver' in window)) {
      $rows.css({opacity: 1, transform: 'translateX(0)'});
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $rows.each(function(i) {
            var $r = $(this);
            setTimeout(function() {
              $r.css({opacity: 1, transform: 'translateX(0)'});
            }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.22 });
    obs.observe($card[0]);
  }

  function initFinServeCardHover() {
    $('.rego_fin_serve_card').on('mouseenter', function() {
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

  function initFinPainEntrance() {
    var $cards = $('.rego_fin_pain_card');
    if (!$cards.length) return;

    $cards.css({opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.4s ease, transform 0.4s ease'});

    if (!('IntersectionObserver' in window)) {
      $cards.css({opacity: 1, transform: 'translateY(0)'});
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var $c = $(e.target);
          $c.css({opacity: 1, transform: 'translateY(0)'});
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    $cards.each(function(i) {
      var $c = $(this);
      setTimeout(function() {
        obs.observe($c[0]);
      }, i * 90);
    });
  }

  $(document).ready(function() {
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initFinFrameworkBars();
    initPCIDSSGrid();
    initSOC2RowStagger();
    initFinServeCardHover();
    initFinPainEntrance();
  });

})(jQuery);
