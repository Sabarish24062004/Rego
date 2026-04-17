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

  function initSectionEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).css({ opacity: 1, transform: 'translateY(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    $('.rego_tos_section').css({ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.5s, transform 0.5s' });
    document.querySelectorAll('.rego_tos_section').forEach(function(el) { obs.observe(el); });
  }

  function initSmoothScroll() {
    $('a[href^="#rego_tos_"]').on('click', function(e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 100 }, 600);
      }
    });
  }

  function initBackToTop() {
    var $btn = $('<button class="rego_tos_back_top" aria-label="Back to top">&uarr;</button>');
    $('body').append($btn);
    $btn.css({ position: 'fixed', bottom: '32px', right: '32px', width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#4a569e,#842573)', color: '#fff', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: 0, transition: 'opacity 0.3s', zIndex: 999 });
    $(window).on('scroll', function() {
      $btn.css('opacity', $(window).scrollTop() > 400 ? 1 : 0);
    });
    $btn.on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 500);
    });
  }

  $(document).ready(function() {
    initReveal();
    initSectionEntrance();
    initSmoothScroll();
    initBackToTop();
  });
})(jQuery);
