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
    var $rows = $('.rego_ec_evidence_row');
    var $count = $('.rego_ec_artifact_count');
    if (!$rows.length) return;

    var rowIdx = 0;
    setInterval(function() {
      var $row = $rows.eq(rowIdx % $rows.length);
      var $status = $row.find('[class*="rego_ec_status"]');

      if (!$status.length) return;

      $status.removeClass('rego_ec_status_queued rego_ec_status_collected').addClass('rego_ec_status_collecting');

      setTimeout(function() {
        $status.removeClass('rego_ec_status_collecting').addClass('rego_ec_status_collected');
        $status.text('COLLECTED');

        if ($count.length) {
          var curr = parseInt($count.text()) || 0;
          $count.text(curr + 1);
        }
      }, 1200);

      rowIdx++;
    }, 2500);
  }

  function initConnectorPillEntrance() {
    var $section = $('.rego_ec_connectors');
    if (!$section.length) return;
    var $pills = $section.find('.rego_ec_cat_pill');
    if (!$pills.length || !('IntersectionObserver' in window)) return;

    $pills.css({opacity: 0, transform: 'translateY(6px)', transition: 'opacity 0.32s ease, transform 0.32s ease'});

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $pills.each(function(i) {
            var $p = $(this);
            setTimeout(function() {
              $p.css({opacity: 1, transform: 'translateY(0)'});
            }, i * 25);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe($section[0]);
  }

  function initFreshnessBarEntrance() {
    var $card = $('.rego_ec_freshness_card');
    if (!$card.length) return;
    var $badges = $card.find('.rego_ec_age_badge');
    if (!$badges.length || !('IntersectionObserver' in window)) return;

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $badges.each(function(i) {
            var $b = $(this);
            setTimeout(function() {
              $b.css({transition: 'background-color 0.4s ease, color 0.4s ease'});
              $b.addClass('rego_ec_badge_colored');
            }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    obs.observe($card[0]);
  }

  function initMappingExpandRows() {
    $(document).on('click', '.rego_ec_mapping_item', function() {
      var $item = $(this);
      var $panel = $item.find('.rego_ec_mapping_controls');

      if (!$panel.length) return;

      var isOpen = $panel.is(':visible');

      $('.rego_ec_mapping_controls').not($panel).slideUp(250);

      $panel.slideToggle(250);
    });
  }

  function initValidationRowStagger() {
    var $card = $('.rego_ec_validation_card');
    if (!$card.length) return;
    var $rows = $card.find('.rego_ec_val_row');
    if (!$rows.length || !('IntersectionObserver' in window)) return;

    $rows.css({opacity: 0, transform: 'translateX(-8px)', transition: 'opacity 0.36s ease, transform 0.36s ease'});

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $rows.each(function(i) {
            var $r = $(this);
            setTimeout(function() {
              $r.css({opacity: 1, transform: 'translateX(0)'});
            }, i * 80);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe($card[0]);
  }

  function initLivePulse() {
    var $dot = $('.rego_ec_pulse_dot');
    if ($dot.length) {
      $dot.addClass('rego_ec_pulse_anim');
    }

    var $lastSync = $('.rego_ec_last_sync');
    if (!$lastSync.length) return;

    setInterval(function() {
      var origText = $lastSync.text();
      $lastSync.css({transition: 'transform 0.3s ease'}).css({transform: 'scale(1.1)'});

      setTimeout(function() {
        $lastSync.text('syncing...');
      }, 150);

      setTimeout(function() {
        $lastSync.text(origText).css({transform: 'scale(1)'});
      }, 500);
    }, 3000);
  }

  function initSuccessSlider() {
    var $slider = $('#rego_ec_success_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_ec_slide');
    var $dots   = $slider.find('.rego_ec_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total   = $slides.length;
    var interval = 5000;
    var timerId = null;
    var paused  = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_ec_slide_active').eq(idx).addClass('rego_ec_slide_active');
      $dots.removeClass('rego_ec_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_ec_slider_dot_active').attr('aria-selected', 'true');
      current = idx;
    }

    function next() { show(current + 1); }

    function start() {
      stop();
      timerId = setInterval(function() { if (!paused) next(); }, interval);
    }

    function stop() {
      if (timerId) { clearInterval(timerId); timerId = null; }
    }

    $dots.on('click', function() {
      var idx = parseInt($(this).attr('data-slide'), 10) || 0;
      show(idx);
      start();
    });

    $slider.on('mouseenter', function() { paused = true; });
    $slider.on('mouseleave', function() { paused = false; });

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) { stop(); } else { start(); }
    });

    start();
  }

  $(document).ready(function() {
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initEvidenceCollectorTicker();
    initConnectorPillEntrance();
    initFreshnessBarEntrance();
    initMappingExpandRows();
    initValidationRowStagger();
    initLivePulse();
    initSuccessSlider();
  });

})(jQuery);
