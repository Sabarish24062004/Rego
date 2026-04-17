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
    var $tabs = $('.rego_sb_tab');
    var $cards = $('.rego_sb_card');
    var $count = $('#rego_sb_count');

    $tabs.on('click', function() {
      $tabs.removeClass('rego_sb_tab_active');
      $(this).addClass('rego_sb_tab_active');
      var filter = $(this).data('filter');

      if (filter === 'all') {
        $cards.not('.rego_sb_hidden').fadeIn(300);
        $count.text('Showing ' + $cards.not('.rego_sb_hidden').length + ' briefs');
      } else {
        $cards.each(function() {
          if ($(this).data('type') === filter && !$(this).hasClass('rego_sb_hidden')) {
            $(this).fadeIn(300);
          } else {
            $(this).fadeOut(200);
          }
        });
        var visible = $cards.filter('[data-type="' + filter + '"]').not('.rego_sb_hidden').length;
        $count.text('Showing ' + visible + ' briefs');
      }
    });
  }

  function initCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_sb_card').not('.rego_sb_hidden').each(function(i) {
            var $card = $(this);
            setTimeout(function() {
              $card.css({ opacity: 1, transform: 'translateY(0)' });
            }, i * 70);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_sb_card').not('.rego_sb_hidden').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_sb_grid');
    if ($grid) obs.observe($grid);
  }

  function initFeaturedEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_sb_feat_panel').css({ opacity: 1, transform: 'translateX(0)' });
          $(e.target).find('.rego_sb_feat_content').css({ opacity: 1, transform: 'translateX(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_sb_feat_panel').css({ opacity: 0, transform: 'translateX(-24px)', transition: 'all 0.6s ease-out' });
    $('.rego_sb_feat_content').css({ opacity: 0, transform: 'translateX(24px)', transition: 'all 0.6s ease-out 0.15s' });
    var $feat = document.querySelector('.rego_sb_featured');
    if ($feat) obs.observe($feat);
  }

  function initLoadMore() {
    var expanded = false;
    $('.rego_sb_load_more').on('click', function() {
      var $btn = $(this);
      if (!expanded) {
        $('.rego_sb_card.rego_sb_hidden').each(function(i) {
          var $card = $(this);
          $card.removeClass('rego_sb_hidden').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
          setTimeout(function() {
            $card.css({ opacity: 1, transform: 'translateY(0)' });
          }, i * 80);
        });
        $btn.text('Show Less');
        expanded = true;
      } else {
        $('.rego_sb_card').slice(6).addClass('rego_sb_hidden').css({ opacity: '', transform: '' });
        $btn.text('Load More Briefs');
        expanded = false;
      }
      var visible = $('.rego_sb_card').not('.rego_sb_hidden').length;
      $('#rego_sb_count').text('Showing ' + visible + ' briefs');
    });
  }

  function initDownloadClick() {
    $('.rego_sb_dl_link').on('click', function(e) {
      e.preventDefault();
      var $card = $(this).closest('.rego_sb_card');
      $card.addClass('rego_sb_downloading');
      setTimeout(function() {
        $card.removeClass('rego_sb_downloading');
      }, 1200);
    });
  }

  $(document).ready(function() {
    initReveal();
    initTabs();
    initCardEntrance();
    initFeaturedEntrance();
    initLoadMore();
    initDownloadClick();
  });
})(jQuery);
