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

  function initFilterTabs() {
    var $tabs = $('.rego_ss_tab');
    var $cards = $('.rego_ss_card');
    var $count = $('#rego_ss_count');

    $tabs.on('click', function() {
      $tabs.removeClass('rego_ss_tab_active');
      $(this).addClass('rego_ss_tab_active');
      var filter = $(this).data('filter');

      if (filter === 'all') {
        $cards.not('.rego_ss_hidden').fadeIn(300);
      } else {
        $cards.each(function() {
          if ($(this).data('industry') === filter && !$(this).hasClass('rego_ss_hidden')) {
            $(this).fadeIn(300);
          } else {
            $(this).fadeOut(200);
          }
        });
      }
      var visible = filter === 'all' ? $cards.not('.rego_ss_hidden').length : $cards.filter('[data-industry="' + filter + '"]').not('.rego_ss_hidden').length;
      $count.text(visible + ' success stories');
    });
  }

  function initCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ss_card').not('.rego_ss_hidden').each(function(i) {
            var $card = $(this);
            setTimeout(function() {
              $card.css({ opacity: 1, transform: 'translateY(0)' });
            }, i * 80);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_ss_card').not('.rego_ss_hidden').css({ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_ss_grid');
    if ($grid) obs.observe($grid);
  }

  function initFeaturedEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_ss_feat_panel').css({ opacity: 1, transform: 'translateX(0)' });
          $(e.target).find('.rego_ss_feat_content').css({ opacity: 1, transform: 'translateX(0)' });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $('.rego_ss_feat_panel').css({ opacity: 0, transform: 'translateX(-30px)', transition: 'all 0.7s ease-out' });
    $('.rego_ss_feat_content').css({ opacity: 0, transform: 'translateX(30px)', transition: 'all 0.7s ease-out 0.15s' });
    var $feat = document.querySelector('.rego_ss_featured');
    if ($feat) obs.observe($feat);
  }

  function initQuoteTicker() {
    var quotes = [
      { text: '\u201CRegO transformed our FedRAMP authorization process. What used to take 18 months now takes 6.\u201D', author: 'CISO, Defense Contractor' },
      { text: '\u201CWe automated 100% of our SOC 2 evidence collection. Our auditors were amazed.\u201D', author: 'VP Engineering, SaaS Platform' },
      { text: '\u201CRegO saved us $2.4M in audit preparation costs in the first year alone.\u201D', author: 'CFO, Financial Services Firm' },
      { text: '\u201COur team went from spending 40% of their time on compliance to under 5%.\u201D', author: 'Director of Security, Cloud Company' }
    ];
    var idx = 0;
    var $text = $('.rego_ss_quote_text');
    var $author = $('.rego_ss_quote_author');
    var $dots = $('.rego_ss_dot');

    if (!$text.length) return;

    function showQuote(i) {
      $text.css('opacity', 0);
      $author.css('opacity', 0);
      setTimeout(function() {
        $text.text(quotes[i].text);
        $author.text('\u2014 ' + quotes[i].author);
        $text.css('opacity', 1);
        $author.css('opacity', 1);
        $dots.removeClass('rego_ss_dot_active');
        $dots.eq(i).addClass('rego_ss_dot_active');
      }, 300);
    }

    setInterval(function() {
      idx = (idx + 1) % quotes.length;
      showQuote(idx);
    }, 4000);

    $dots.on('click', function() {
      idx = $(this).index();
      showQuote(idx);
    });
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
    var $stats = document.querySelector('.rego_ss_stats');
    if ($stats) obs.observe($stats);
  }

  function initLoadMore() {
    var expanded = false;
    $('.rego_ss_load_more').on('click', function() {
      var $btn = $(this);
      if (!expanded) {
        $('.rego_ss_card.rego_ss_hidden').each(function(i) {
          var $card = $(this);
          $card.removeClass('rego_ss_hidden').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
          setTimeout(function() { $card.css({ opacity: 1, transform: 'translateY(0)' }); }, i * 80);
        });
        $btn.text('Show Less');
        expanded = true;
      } else {
        $('.rego_ss_card').slice(6).addClass('rego_ss_hidden').css({ opacity: '', transform: '' });
        $btn.text('Load More');
        expanded = false;
      }
      var visible = $('.rego_ss_card').not('.rego_ss_hidden').length;
      $('#rego_ss_count').text(visible + ' success stories');
    });
  }

  $(document).ready(function() {
    initReveal();
    initFilterTabs();
    initCardEntrance();
    initFeaturedEntrance();
    initQuoteTicker();
    initCounters();
    initLoadMore();
  });
})(jQuery);
