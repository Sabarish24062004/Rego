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

  function initDocCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_legal_doc_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 80);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_legal_doc_card').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_legal_doc_grid');
    if ($grid) obs.observe($grid);
  }

  function initCertCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_legal_cert_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'scale(1)' }); }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_legal_cert_card').css({ opacity: 0, transform: 'scale(0.96)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_legal_cert_grid');
    if ($grid) obs.observe($grid);
  }

  function initRegionEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_legal_region_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 90);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_legal_region_card').css({ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.4s, transform 0.4s' });
    var $grid = document.querySelector('.rego_legal_region_grid');
    if ($grid) obs.observe($grid);
  }

  function initFAQ() {
    $('.rego_legal_faq_q').on('click', function() {
      var $item = $(this).closest('.rego_legal_faq_item');
      var wasOpen = $item.hasClass('rego_legal_faq_open');

      $('.rego_legal_faq_item').removeClass('rego_legal_faq_open');
      $('.rego_legal_faq_a').css('max-height', '0');

      if (!wasOpen) {
        $item.addClass('rego_legal_faq_open');
        var $answer = $item.find('.rego_legal_faq_a');
        $answer.css('max-height', $answer.prop('scrollHeight') + 'px');
      }
    });

    $('.rego_legal_faq_q').on('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });
  }

  $(document).ready(function() {
    initReveal();
    initDocCardEntrance();
    initCertCardEntrance();
    initRegionEntrance();
    initFAQ();
  });
})(jQuery);
