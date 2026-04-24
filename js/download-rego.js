(function ($) {
  'use strict';

  var STAGES = {
    build:   { title: '01: Build the Program',  items: ['Fully Digitized Regulations', 'Control Mapping', 'Wizard-Driven Builders', 'AI Capabilities'] },
    collect: { title: '02: Collect Evidence',   items: ['Automated Evidence Collection', 'Integrations', 'Continuous Scanning', 'API Connectors'] },
    assess:  { title: '03: Assess Controls',    items: ['Assessment Workflows', 'Automated Testing', 'Control Scoring', 'Gap Analysis'] },
    fix:     { title: '04: Fix Issues',         items: ['Issue Tracking', 'POA&M Management', 'Remediation Workflows', 'ITIL Integration'] },
    risk:    { title: '05: Manage Risk',        items: ['Risk Register', 'Residual Risk Scoring', 'Risk Treatment', 'Executive Dashboards'] },
    govern:  { title: '06: Govern',             items: ['Policy Management', 'Audit Trail', 'Reporting', 'Compliance Attestation'] }
  };

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $('.rego_drg_hero_text, .rego_drg_hero_visual, .rego_drg_trusted, .rego_drg_stat_card, .rego_drg_cardcta_card, .rego_drg_quote_slider, .rego_drg_workload, .rego_drg_feat_card, .rego_drg_feat_text, .rego_drg_silos_visual, .rego_drg_data_visual, .rego_drg_auto_visual, .rego_drg_ai_visual, .rego_drg_wheel, .rego_drg_panel, .rego_drg_ready_card, .rego_drg_res_card');

    targets.each(function () {
      $(this).css({
        opacity: 0,
        transform: 'translateY(24px)',
        transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)'
      });
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target).css({ opacity: 1, transform: 'translateY(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.each(function () { obs.observe(this); });
  }

  function initQuoteSlider() {
    var $slides = $('.rego_drg_quote_card');
    var $dots = $('.rego_drg_quote_dot');
    if (!$slides.length || !$dots.length) return;

    var total = $slides.length;
    var current = 0;
    var interval = null;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      current = idx;
      $slides.removeClass('rego_drg_quote_active');
      $slides.eq(idx).addClass('rego_drg_quote_active');
      $dots.removeClass('rego_drg_quote_dot_active');
      $dots.eq(idx).addClass('rego_drg_quote_dot_active');
    }
    function start() {
      stop();
      interval = setInterval(function () { goTo(current + 1); }, 7000);
    }
    function stop() {
      if (interval) { clearInterval(interval); interval = null; }
    }

    $dots.on('click', function () {
      goTo(parseInt($(this).attr('data-dot'), 10));
      start();
    });
    var $slider = $('.rego_drg_quote_slider');
    $slider.on('mouseenter', stop).on('mouseleave', start);
    goTo(0);
    start();
  }

  function initLifecycleWheel() {
    var $segs = $('.rego_drg_wheel_seg');
    if (!$segs.length) return;

    $segs.on('click', function () {
      var stage = $(this).attr('data-stage');
      var data = STAGES[stage];
      if (!data) return;
      $segs.removeClass('rego_drg_wheel_active');
      $(this).addClass('rego_drg_wheel_active');

      $('#rego_drg_panel_title').text(data.title);

      var $list = $('#rego_drg_panel_list');
      $list.empty();
      data.items.forEach(function (label) {
        $list.append('<button class="rego_drg_panel_item">' + label + ' <span>v</span></button>');
      });
    });
  }

  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var $target = $(href);
      if ($target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $target.offset().top - 80 }, 600);
      }
    });
  }

  $(document).ready(function () {
    initReveal();
    initQuoteSlider();
    initLifecycleWheel();
    initSmoothScroll();
  });
})(jQuery);
