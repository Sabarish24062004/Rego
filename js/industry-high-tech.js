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

  function initPipelineCard() {
    var $stages = $('.rego_ht_stage');
    $stages.css({ opacity: 0, transform: 'translateY(10px)', transition: 'opacity 0.4s, transform 0.4s' });
    $stages.each(function(i) {
      var $stage = $(this);
      setTimeout(function() {
        $stage.css({ opacity: 1, transform: 'translateY(0)' });
      }, 300 + i * 150);
    });
  }

  function initPipelineLiveUpdate() {
    var $stages = $('.rego_ht_stage');
    if ($stages.length < 2) return;
    var stageNames = [];
    $stages.each(function() { stageNames.push($(this).find('.rego_ht_stage_label').text()); });

    setInterval(function() {
      var $running = $stages.filter(function() {
        return $(this).find('.rego_ht_status').hasClass('rego_ht_running');
      });
      if ($running.length) {
        var idx = $stages.index($running);
        $running.find('.rego_ht_status').removeClass('rego_ht_running').addClass('rego_ht_pass').text('\u2713 Pass');
        var next = idx + 1;
        if (next < $stages.length) {
          $stages.eq(next).find('.rego_ht_status').removeClass('rego_ht_warn').addClass('rego_ht_running').text('\u2192 Running');
        } else {
          setTimeout(function() {
            $stages.each(function(i) {
              var $status = $(this).find('.rego_ht_status');
              $status.removeClass('rego_ht_pass rego_ht_warn rego_ht_running');
              if (i < 3) { $status.addClass('rego_ht_pass').text('\u2713 Pass'); }
              else if (i === 3) { $status.addClass('rego_ht_warn').text('\u26A0 Warning'); }
              else { $status.addClass('rego_ht_running').text('\u2192 Running'); }
            });
          }, 1000);
        }
      }
    }, 5000);
  }

  function initPainCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ht_pain_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_ht_pain_card').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_ht_pain_grid');
    if ($grid) obs.observe($grid);
  }

  function initCodeCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).css({ opacity: 1, transform: 'translateX(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ht_code_card').css({ opacity: 0, transform: 'translateX(30px)', transition: 'all 0.6s ease-out' });
    document.querySelectorAll('.rego_ht_code_card').forEach(function(el) { obs.observe(el); });
  }

  function initCrosswalkEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var $card = $(e.target);
          $card.find('.rego_ht_source_pill').css({ opacity: 1, transform: 'scale(1)' });
          $card.find('.rego_ht_fw_pill').each(function(i) {
            var $pill = $(this);
            setTimeout(function() { $pill.css({ opacity: 1, transform: 'translateY(0)' }); }, 300 + i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ht_source_pill').css({ opacity: 0, transform: 'scale(0.8)', transition: 'all 0.4s ease-out' });
    $('.rego_ht_fw_pill').css({ opacity: 0, transform: 'translateY(12px)', transition: 'all 0.4s ease-out' });
    document.querySelectorAll('.rego_ht_crosswalk_card').forEach(function(el) { obs.observe(el); });
  }

  function initDashMetrics() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('[data-target]').each(function() {
            var $el = $(this);
            var target = parseFloat($el.data('target'));
            var suffix = $el.data('suffix') || '';
            var start = performance.now();
            (function animate(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / 1400, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              $el.text(Math.round(target * ease) + suffix);
              if (progress < 1) requestAnimationFrame(animate);
            })(performance.now());
          });
          $(e.target).find('.rego_ht_status_text').css({ opacity: 1 });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ht_status_text').css({ opacity: 0, transition: 'opacity 0.6s 0.5s' });
    var $dash = document.querySelector('.rego_ht_dash_card');
    if ($dash) obs.observe($dash);
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
            var prefix = $el.data('prefix') || '';
            var suffix = $el.data('suffix') || '';
            var start = performance.now();
            (function animate(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / 1400, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              $el.text(prefix + Math.round(target * ease) + suffix);
              if (progress < 1) requestAnimationFrame(animate);
            })(performance.now());
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    var $stats = document.querySelector('.rego_ht_stats');
    if ($stats) obs.observe($stats);
  }

  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
      }
    });
  }

  $(document).ready(function() {
    initReveal();
    initPipelineCard();
    initPipelineLiveUpdate();
    initPainCardEntrance();
    initCodeCardEntrance();
    initCrosswalkEntrance();
    initDashMetrics();
    initCounters();
    initSmoothScroll();
  });
})(jQuery);
