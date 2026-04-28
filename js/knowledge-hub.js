(function($){'use strict';

  // ===== REVEAL ANIMATION =====
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

  // ===== FEATURED HERO SLIDESHOW =====
  function initFeaturedSlider() {
    var $slider = $('#rego_kh_featured_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_kh_slide');
    var $dots   = $slider.find('.rego_kh_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total   = $slides.length;
    var interval = 6000;
    var timerId = null;
    var paused  = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_kh_slide_active').eq(idx).addClass('rego_kh_slide_active');
      $dots.removeClass('rego_kh_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_kh_slider_dot_active').attr('aria-selected', 'true');
      current = idx;
    }

    function next() { show(current + 1); }

    function start() {
      stop();
      timerId = setInterval(function() { if (!paused) next(); }, interval);
    }

    function stop() {
      if (timerId) { clearInterval(timerId); timerId = null; }
    }

    $dots.on('click', function() {
      var idx = parseInt($(this).attr('data-slide'), 10) || 0;
      show(idx);
      start();
    });

    $slider.on('mouseenter', function() { paused = true; });
    $slider.on('mouseleave', function() { paused = false; });

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) { stop(); } else { start(); }
    });

    start();
  }

  // ===== TYPE & TOPIC FILTERS + SEARCH =====
  function initFilters() {
    var $cards   = $('.rego_kh_card');
    if (!$cards.length) return;

    var activeType  = 'all';
    var activeTopic = 'all';
    var searchTerm  = '';

    function applyFilters() {
      var anyVisible = false;

      $cards.each(function() {
        var $c = $(this);
        var t  = ($c.attr('data-type')  || '').toLowerCase();
        var tp = ($c.attr('data-topic') || '').toLowerCase();
        var txt = $c.text().toLowerCase();

        var typeOK   = activeType  === 'all' || t === activeType;
        var topicOK  = activeTopic === 'all' || tp.split(/\s+/).indexOf(activeTopic) !== -1;
        var searchOK = !searchTerm || txt.indexOf(searchTerm) !== -1;

        if (typeOK && topicOK && searchOK) {
          $c.show();
          anyVisible = true;
        } else {
          $c.hide();
        }
      });

      var $empty = $('.rego_kh_no_results');
      if ($empty.length) $empty.toggle(!anyVisible);
    }

    $('.rego_kh_type').on('click', function() {
      $('.rego_kh_type').removeClass('rego_kh_type_active');
      $(this).addClass('rego_kh_type_active');
      activeType = ($(this).attr('data-type') || 'all').toLowerCase();
      applyFilters();
    });

    $('.rego_kh_topic').on('click', function() {
      $('.rego_kh_topic').removeClass('rego_kh_topic_active');
      $(this).addClass('rego_kh_topic_active');
      activeTopic = ($(this).attr('data-topic') || 'all').toLowerCase();
      applyFilters();
    });

    var debounceTimer;
    $('.rego_kh_search_input').on('input', function() {
      var v = $(this).val();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        searchTerm = (v || '').trim().toLowerCase();
        applyFilters();
      }, 250);
    });

    $('.rego_kh_search_form').on('submit', function(e) { e.preventDefault(); });
  }

  // ===== NEWSLETTER FORM =====
  function initNewsletter() {
    var $form = $('.rego_kh_news_form');
    if (!$form.length) return;
    $form.on('submit', function(e) {
      e.preventDefault();
      var $btn = $form.find('.rego_kh_news_submit');
      var orig = $btn.text();
      $btn.text('Thanks!').css('opacity', 0.8);
      setTimeout(function() { $btn.text(orig).css('opacity', 1); $form[0].reset(); }, 1800);
    });
  }

  $(document).ready(function() {
    initReveal();
    initFeaturedSlider();
    initFilters();
    initNewsletter();
  });

})(jQuery);
