(function($) {
  'use strict';

  function initReveal() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('rego_revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rego_reveal').forEach(function(el) { obs.observe(el); });
  }

  function initJourneyEntrance() {
    var $phases = $('.rego_cs_phase');
    $phases.css({ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.4s, transform 0.4s' });
    $phases.each(function(i) {
      var $phase = $(this);
      setTimeout(function() { $phase.css({ opacity: 1, transform: 'translateY(0)' }); }, 400 + i * 120);
    });
  }

  function initPillarEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_cs_pillar_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_cs_pillar_card').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_cs_pillar_grid');
    if ($grid) obs.observe($grid);
  }

  function initOnboardTimeline() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_cs_timeline_row').each(function(i) {
            var $row = $(this);
            setTimeout(function() { $row.css({ opacity: 1, transform: 'translateX(0)' }); }, i * 80);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_cs_timeline_row').css({ opacity: 0, transform: 'translateX(-16px)', transition: 'opacity 0.4s, transform 0.4s' });
    var $card = document.querySelector('.rego_cs_onboard_card');
    if ($card) obs.observe($card);
  }

  function initSLAEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_cs_sla_row').each(function(i) {
            var $row = $(this);
            setTimeout(function() { $row.css({ opacity: 1, transform: 'translateX(0)' }); }, i * 90);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_cs_sla_row').css({ opacity: 0, transform: 'translateX(16px)', transition: 'opacity 0.4s, transform 0.4s' });
    var $card = document.querySelector('.rego_cs_sla_card');
    if ($card) obs.observe($card);
  }

  function initROICounters() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('[data-target]').each(function() {
            var $el = $(this);
            var target = parseFloat($el.data('target'));
            var decimals = String($el.data('target')).indexOf('.') !== -1 ? 1 : 0;
            var prefix = $el.data('prefix') || '';
            var suffix = $el.data('suffix') || '';
            var start = performance.now();
            (function animate(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / 1400, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              $el.text(prefix + (target * ease).toFixed(decimals) + suffix);
              if (progress < 1) requestAnimationFrame(animate);
            })(performance.now());
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    var $card = document.querySelector('.rego_cs_roi_card');
    if ($card) obs.observe($card);
  }

  function initCounters() {
    var animated = false;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting && !animated) {
          animated = true;
          $(e.target).find('[data-target]').each(function() {
            var $el = $(this);
            var target = parseFloat($el.data('target'));
            var decimals = String($el.data('target')).indexOf('.') !== -1 ? 1 : 0;
            var prefix = $el.data('prefix') || '';
            var suffix = $el.data('suffix') || '';
            var start = performance.now();
            (function animate(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / 1400, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              $el.text(prefix + (target * ease).toFixed(decimals) + suffix);
              if (progress < 1) requestAnimationFrame(animate);
            })(performance.now());
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    var $stats = document.querySelector('.rego_cs_stats');
    if ($stats) obs.observe($stats);
  }

  function initTestimonialEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_cs_test_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_cs_test_card').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_cs_test_grid');
    if ($grid) obs.observe($grid);
  }

  $(document).ready(function() {
    initReveal();
    initJourneyEntrance();
    initPillarEntrance();
    initOnboardTimeline();
    initSLAEntrance();
    initROICounters();
    initCounters();
    initTestimonialEntrance();
  });
})(jQuery);
