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

  function initBuilderCardEntrance() {
    var $card = $('.rego_ctrl_builder_card');
    if (!$card.length) return;
    var $groups = $card.find('.rego_ctrl_form_group');
    if (!$groups.length) return;

    $groups.css({opacity: 0, transform: 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease'});

    if (!('IntersectionObserver' in window)) {
      $groups.css({opacity: 1, transform: 'translateY(0)'});
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $groups.each(function(i) {
            var $g = $(this);
            setTimeout(function() {
              $g.css({opacity: 1, transform: 'translateY(0)'});
            }, i * 80);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe($card[0]);
  }

  function initFwChipToggle() {
    $('.rego_ctrl_fw_chip').on('click', function(e) {
      e.preventDefault();
      var $chip = $(this);
      $chip.toggleClass('rego_ctrl_chip_active');

      var $icon = $chip.find('span');
      if ($chip.hasClass('rego_ctrl_chip_active')) {
        $icon.text('✓');
      } else {
        $icon.text('○');
      }
    });
  }

  function initLibraryRowStagger() {
    var $card = $('.rego_ctrl_library_card');
    if (!$card.length) return;
    var $rows = $card.find('.rego_ctrl_lib_row');
    if (!$rows.length) return;

    $rows.css({opacity: 0, transform: 'translateX(-8px)', transition: 'opacity 0.35s ease, transform 0.35s ease'});

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
            }, i * 70);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe($card[0]);
  }

  function initCrosswalkEntrance() {
    var $card = $('.rego_ctrl_crosswalk_card');
    if (!$card.length) return;
    var $center = $card.find('.rego_ctrl_center_box');
    var $pills = $card.find('.rego_ctrl_fw_connection');

    if (!('IntersectionObserver' in window)) {
      $center.css({opacity: 1});
      $pills.css({opacity: 1});
      return;
    }

    $center.css({opacity: 0});
    $pills.css({opacity: 0});

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $center.css({transition: 'opacity 0.3s ease'});
          $center.css({opacity: 1});

          $pills.each(function(i) {
            var $p = $(this);
            setTimeout(function() {
              $p.css({transition: 'opacity 0.35s ease'});
              $p.css({opacity: 1});
            }, 300 + i * 150);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    obs.observe($card[0]);
  }

  function initTestRowStagger() {
    var $card = $('.rego_ctrl_test_runner_card');
    if (!$card.length) return;
    var $rows = $card.find('.rego_ctrl_test_row');
    if (!$rows.length) return;

    $rows.css({opacity: 0, transform: 'translateY(8px)', transition: 'opacity 0.38s ease, transform 0.38s ease'});

    if (!('IntersectionObserver' in window)) {
      $rows.css({opacity: 1, transform: 'translateY(0)'});
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $rows.each(function(i) {
            var $r = $(this);
            setTimeout(function() {
              $r.css({opacity: 1, transform: 'translateY(0)'});
            }, i * 90);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe($card[0]);
  }

  function initSaveButtonEffect() {
    $('.rego_ctrl_save_btn').on('click', function() {
      var $btn = $(this);
      var origText = $btn.text();
      $btn.text('Saving…').prop('disabled', true);

      setTimeout(function() {
        $btn.text('✓ Saved');
      }, 500);

      setTimeout(function() {
        $btn.text(origText).prop('disabled', false);
      }, 2000);
    });
  }

  $(document).ready(function() {
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initBuilderCardEntrance();
    initFwChipToggle();
    initLibraryRowStagger();
    initCrosswalkEntrance();
    initTestRowStagger();
    initSaveButtonEffect();
  });

})(jQuery);
