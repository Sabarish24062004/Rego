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
    var $tabs = $('.rego_news_tab');
    var $cards = $('.rego_news_card');

    $tabs.on('click', function() {
      $tabs.removeClass('rego_news_tab_active');
      $(this).addClass('rego_news_tab_active');
      var filter = $(this).data('filter');

      if (filter === 'all') {
        $cards.not('.rego_news_hidden').fadeIn(300);
      } else {
        $cards.each(function() {
          if ($(this).data('type') === filter && !$(this).hasClass('rego_news_hidden')) {
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
          $(e.target).find('.rego_news_card').not('.rego_news_hidden').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 70);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_news_card').not('.rego_news_hidden').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_news_grid');
    if ($grid) obs.observe($grid);
  }

  function initFeaturedEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_news_feat_panel').css({ opacity: 1, transform: 'translateX(0)' });
          $(e.target).find('.rego_news_feat_content').css({ opacity: 1, transform: 'translateX(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_news_feat_panel').css({ opacity: 0, transform: 'translateX(-24px)', transition: 'all 0.6s ease-out' });
    $('.rego_news_feat_content').css({ opacity: 0, transform: 'translateX(24px)', transition: 'all 0.6s ease-out 0.15s' });
    var $feat = document.querySelector('.rego_news_featured');
    if ($feat) obs.observe($feat);
  }

  function initLoadMore() {
    var expanded = false;
    $('.rego_news_load_more').on('click', function() {
      var $btn = $(this);
      if (!expanded) {
        $('.rego_news_card.rego_news_hidden').each(function(i) {
          var $card = $(this);
          $card.removeClass('rego_news_hidden').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
          setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 80);
        });
        $btn.text('Show Less');
        expanded = true;
      } else {
        $('.rego_news_card').slice(6).addClass('rego_news_hidden').css({ opacity: '', transform: '' });
        $btn.text('Load More');
        expanded = false;
      }
    });
  }

  function initMediaCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_news_media_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 100);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_news_media_card').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_news_media_grid');
    if ($grid) obs.observe($grid);
  }

  $(document).ready(function() {
    initReveal();
    initTabs();
    initCardEntrance();
    initFeaturedEntrance();
    initLoadMore();
    initMediaCardEntrance();
  });
})(jQuery);
