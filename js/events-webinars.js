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

  function initEventTabs() {
    var $tabs = $('.rego_ev_tab');
    var $panels = $('.rego_ev_panel');
    if (!$tabs.length || !$panels.length) return;

    $tabs.on('click', function(e) {
      e.preventDefault();
      var target = $(this).data('tab');
      $tabs.removeClass('rego_ev_tab_active').attr('aria-selected', 'false');
      $(this).addClass('rego_ev_tab_active').attr('aria-selected', 'true');

      $panels.removeClass('rego_ev_panel_active').attr('hidden', true);
      $panels.filter('[data-panel="' + target + '"]')
        .addClass('rego_ev_panel_active')
        .removeAttr('hidden');
    });
  }

  function initOnDemandPagination() {
    var $pager = $('#rego_ev_pager');
    if (!$pager.length) return;

    var $cards = $('#rego_ev_ondemand_list .rego_ev_card');
    var $pageBtns = $pager.find('.rego_ev_pager_page');
    var $prev = $pager.find('[data-action="prev"]');
    var $next = $pager.find('[data-action="next"]');
    var totalPages = $pageBtns.length;
    var current = 1;

    function show(page) {
      current = Math.max(1, Math.min(totalPages, page));
      $cards.each(function () {
        var p = parseInt($(this).attr('data-page'), 10);
        if (p === current) { $(this).removeAttr('hidden'); }
        else { $(this).attr('hidden', true); }
      });
      $pageBtns.removeClass('rego_ev_pager_active');
      $pageBtns.filter('[data-page="' + current + '"]').addClass('rego_ev_pager_active');
      $prev.prop('disabled', current === 1);
      $next.prop('disabled', current === totalPages);

      // scroll to top of list
      var $list = $('#rego_ev_ondemand_list');
      var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')) || 72;
      if ($list.length) {
        $('html,body').animate({ scrollTop: $list.offset().top - headerH - 20 }, 400);
      }
    }

    $pageBtns.on('click', function () { show(parseInt($(this).attr('data-page'), 10)); });
    $prev.on('click', function () { if (!$(this).prop('disabled')) show(current - 1); });
    $next.on('click', function () { if (!$(this).prop('disabled')) show(current + 1); });
  }

  function initEventRowEntrance() {
    var $rows = $('.rego_ev_event_row');
    if (!$rows.length || !('IntersectionObserver' in window)) return;

    $rows.css({opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.35s ease, transform 0.35s ease'});

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var $r = $(e.target);
          $rows.each(function(i) {
            if (this === e.target) {
              setTimeout(function() { $r.css({opacity: 1, transform: 'translateY(0)'}); }, i * 50);
            }
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    $rows.each(function() { obs.observe(this); });
  }

  function initShowEventDetails() {
    $(document).on('click', '.rego_ev_show_details', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $row = $link.closest('.rego_ev_event_row');
      var $panel = $row.find('.rego_ev_event_detail_panel');

      if (!$panel.length) return;

      var isOpen = $panel.is(':visible');
      $panel.slideToggle(300, function() {
        if (isOpen) {
          $link.text('Show Event Details \u2193');
        } else {
          $link.text('Hide Event Details \u2191');
        }
      });
    });
  }

  function initFeaturedCardEntrance() {
    var $card = $('.rego_ev_featured_card');
    if (!$card.length || !('IntersectionObserver' in window)) return;

    var $thumb = $card.find('.rego_ev_featured_thumb');
    var $info = $card.find('.rego_ev_featured_info');

    $thumb.css({opacity: 0, transform: 'translateX(-16px)', transition: 'opacity 0.5s ease, transform 0.5s ease'});
    $info.css({opacity: 0, transform: 'translateX(16px)', transition: 'opacity 0.5s ease, transform 0.5s ease'});

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $thumb.css({opacity: 1, transform: 'translateX(0)'});
          $info.css({opacity: 1, transform: 'translateX(0)'});
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    obs.observe($card[0]);
  }

  function initNewsletterForm() {
    $('.rego_ev_nl_form').on('submit', function(e) {
      e.preventDefault();
      var $form = $(this);
      var $btn = $form.find('button[type="submit"]');
      if (!$btn.length) return;

      var origText = $btn.text();
      $btn.text('Subscribing...').prop('disabled', true);

      setTimeout(function() {
        $btn.text('✓ Subscribed!').css({backgroundColor: '#10b981', color: '#fff'});

        setTimeout(function() {
          $btn.text(origText).css({backgroundColor: '', color: ''}).prop('disabled', false);
        }, 2000);
      }, 1000);
    });
  }

  function initBlogRowStagger() {
    var $rows = $('.rego_ev_blog_row');
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

    var $container = $rows.first().closest('[class*="rego_ev"]');
    if ($container.length) obs.observe($container[0]);
  }

  $(document).ready(function() {
    initReveal();
    initCounters('[data-target]');
    initSmoothScroll();
    initEventTabs();
    initOnDemandPagination();
    initEventRowEntrance();
    initShowEventDetails();
    initFeaturedCardEntrance();
    initNewsletterForm();
    initBlogRowStagger();
  });

})(jQuery);
