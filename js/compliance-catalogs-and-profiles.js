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

  function initOSCALCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ccp_node').each(function(i) {
            var $node = $(this);
            setTimeout(function() { $node.css({ opacity: 1, transform: 'translateX(0)' }); }, i * 80);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ccp_node').css({ opacity: 0, transform: 'translateX(-16px)', transition: 'opacity 0.4s, transform 0.4s' });
    var $card = document.querySelector('.rego_ccp_oscal_card');
    if ($card) obs.observe($card);
  }

  function initConceptCards() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ccp_concept_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'scale(1)' }); }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_ccp_concept_card').css({ opacity: 0, transform: 'scale(0.96)', transition: 'opacity 0.5s, transform 0.5s' });
    var $section = document.querySelector('.rego_ccp_concept_grid');
    if ($section) obs.observe($section);
  }

  function initFrameworkCards() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ccp_fw_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 60);
          });
          // animate control counts
          $(e.target).find('.rego_ccp_ctrl_count[data-target]').each(function() {
            var $el = $(this);
            var target = parseFloat($el.data('target'));
            var start = performance.now();
            (function animate(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / 1400, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              $el.text(Math.round(target * ease).toLocaleString());
              if (progress < 1) requestAnimationFrame(animate);
            })(performance.now());
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_ccp_fw_card').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_ccp_fw_grid');
    if ($grid) obs.observe($grid);
  }

  function initCatalogRows() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ccp_cat_row').each(function(i) {
            var $row = $(this);
            setTimeout(function() { $row.css({ opacity: 1, transform: 'translateX(0)' }); }, i * 70);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ccp_cat_row').css({ opacity: 0, transform: 'translateX(-12px)', transition: 'opacity 0.4s, transform 0.4s' });
    var $struct = document.querySelector('.rego_ccp_cat_struct');
    if ($struct) obs.observe($struct);
  }

  function initCrosswalkEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var $card = $(e.target);
          $card.find('.rego_ccp_source_pill').css({ opacity: 1, transform: 'scale(1)' });
          $card.find('.rego_ccp_map_pill').each(function(i) {
            var $pill = $(this);
            setTimeout(function() { $pill.css({ opacity: 1, transform: 'translateY(0)' }); }, 300 + i * 120);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ccp_source_pill').css({ opacity: 0, transform: 'scale(0.8)', transition: 'all 0.4s ease-out' });
    $('.rego_ccp_map_pill').css({ opacity: 0, transform: 'translateY(12px)', transition: 'all 0.4s ease-out' });
    document.querySelectorAll('.rego_ccp_crosswalk').forEach(function(el) { obs.observe(el); });
  }

  function initProfileTreeEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var $card = $(e.target);
          $card.find('.rego_ccp_tree_parent').css({ opacity: 1, transform: 'translateY(0)' });
          setTimeout(function() {
            $card.find('.rego_ccp_tree_child').each(function(i) {
              var $child = $(this);
              setTimeout(function() { $child.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 100);
            });
          }, 300);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ccp_tree_parent').css({ opacity: 0, transform: 'translateY(-12px)', transition: 'all 0.4s ease-out' });
    $('.rego_ccp_tree_child').css({ opacity: 0, transform: 'translateY(12px)', transition: 'all 0.4s ease-out' });
    var $tree = document.querySelector('.rego_ccp_tree_card');
    if ($tree) obs.observe($tree);
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
              $el.text(prefix + Math.round(target * ease).toLocaleString() + suffix);
              if (progress < 1) requestAnimationFrame(animate);
            })(performance.now());
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    var $stats = document.querySelector('.rego_ccp_stats');
    if ($stats) obs.observe($stats);
  }

  function initCodeHighlight() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ccp_code_line').each(function(i) {
            var $line = $(this);
            setTimeout(function() { $line.css({ opacity: 1 }); }, i * 40);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ccp_code_line').css({ opacity: 0, transition: 'opacity 0.3s' });
    document.querySelectorAll('.rego_ccp_code_card').forEach(function(el) { obs.observe(el); });
  }

  $(document).ready(function() {
    initReveal();
    initOSCALCardEntrance();
    initConceptCards();
    initFrameworkCards();
    initCatalogRows();
    initCrosswalkEntrance();
    initProfileTreeEntrance();
    initCounters();
    initCodeHighlight();
  });
})(jQuery);
