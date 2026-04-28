(function($) {
  'use strict';

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      $('.rego_reveal').addClass('rego_revealed');
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('rego_revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.rego_reveal').forEach(function(el) { obs.observe(el); });
  }

  function initDocCardEntrance() {
    var $grid = $('.rego_legal_doc_grid');
    if (!$grid.length || !('IntersectionObserver' in window)) return;

    var $cards = $grid.find('.rego_legal_doc_card');
    $cards.css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.55s ease, transform 0.55s ease' });

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $cards.each(function(i) {
            var $card = $(this);
            setTimeout(function() {
              $card.css({ opacity: 1, transform: 'translateY(0)' });
            }, i * 90);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    obs.observe($grid[0]);
  }

  $(document).ready(function() {
    initReveal();
    initDocCardEntrance();
  });
})(jQuery);
