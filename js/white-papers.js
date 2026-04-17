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

  function initTabs() {
    var $tabs = $('.rego_wp_tab');
    var $cards = $('.rego_wp_card');

    $tabs.on('click', function() {
      $tabs.removeClass('rego_wp_tab_active');
      $(this).addClass('rego_wp_tab_active');
      var filter = $(this).data('filter');

      if (filter === 'all') {
        $cards.not('.rego_wp_hidden').fadeIn(300);
      } else {
        $cards.each(function() {
          if ($(this).data('category') === filter && !$(this).hasClass('rego_wp_hidden')) {
            $(this).fadeIn(300);
          } else {
            $(this).fadeOut(200);
          }
        });
      }
    });
  }

  function initCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_wp_card').not('.rego_wp_hidden').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 70);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_wp_card').not('.rego_wp_hidden').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_wp_grid');
    if ($grid) obs.observe($grid);
  }

  function initFeaturedEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_wp_feat_panel').css({ opacity: 1, transform: 'translateX(0)' });
          $(e.target).find('.rego_wp_feat_content').css({ opacity: 1, transform: 'translateX(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_wp_feat_panel').css({ opacity: 0, transform: 'translateX(-24px)', transition: 'all 0.6s ease-out' });
    $('.rego_wp_feat_content').css({ opacity: 0, transform: 'translateX(24px)', transition: 'all 0.6s ease-out 0.15s' });
    var $feat = document.querySelector('.rego_wp_featured');
    if ($feat) obs.observe($feat);
  }

  function initLoadMore() {
    var expanded = false;
    $('.rego_wp_load_more').on('click', function() {
      var $btn = $(this);
      if (!expanded) {
        $('.rego_wp_card.rego_wp_hidden').each(function(i) {
          var $card = $(this);
          $card.removeClass('rego_wp_hidden').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
          setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 80);
        });
        $btn.text('Show Less');
        expanded = true;
      } else {
        $('.rego_wp_card').slice(6).addClass('rego_wp_hidden').css({ opacity: '', transform: '' });
        $btn.text('Load More');
        expanded = false;
      }
    });
  }

  function initNewsletterForm() {
    $('.rego_wp_newsletter_form').on('submit', function(e) {
      e.preventDefault();
      var $form = $(this);
      var $input = $form.find('input[type="email"]');
      var $btn = $form.find('button');
      var email = $input.val().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $input.css('border-color', '#ef4444');
        return;
      }
      $input.css('border-color', '');
      $btn.text('Subscribing...').prop('disabled', true);
      setTimeout(function() {
        $form.html('<p style="color:white;font-size:15px;">You\'re subscribed! Check your inbox.</p>');
      }, 800);
    });
  }

  $(document).ready(function() {
    initReveal();
    initTabs();
    initCardEntrance();
    initFeaturedEntrance();
    initLoadMore();
    initNewsletterForm();
  });
})(jQuery);
