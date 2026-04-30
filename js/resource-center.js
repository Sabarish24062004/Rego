/* ================================================================
   REGO – RESOURCE CENTER PAGE SCRIPT
   File: js/resource-center.js
   Purpose: Drives reveal animations, the featured-resource hero
            slideshow, type/topic/search filtering, pagination,
            and the newsletter form. Mirrors js/newsroom.js so the
            shared markup conventions (.rego_news_*) work identically.
================================================================ */
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
    var $slider = $('#rego_news_featured_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_news_slide');
    var $dots   = $slider.find('.rego_news_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total   = $slides.length;
    var interval = 6000;
    var timerId = null;
    var paused  = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_news_slide_active').eq(idx).addClass('rego_news_slide_active');
      $dots.removeClass('rego_news_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_news_slider_dot_active').attr('aria-selected', 'true');
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

  // ===== TYPE + TOPIC + PAGE FILTERS + SEARCH =====
  var state = {
    activeType:  'all',
    activeTopic: 'all',
    activePage:  '1',
    searchTerm:  ''
  };

  function applyFilters() {
    var anyVisible = false;

    $('.rego_news_card').each(function() {
      var $c   = $(this);
      var type = ($c.attr('data-type')  || 'all').toLowerCase();
      var tps  = ($c.attr('data-topic') || '').toLowerCase().split(/\s+/);
      var page = ($c.attr('data-page')  || '1');
      var txt  = $c.text().toLowerCase();

      var typeOK   = state.activeType  === 'all' || type === state.activeType;
      var topicOK  = state.activeTopic === 'all' || tps.indexOf(state.activeTopic) !== -1;
      var pageOK   = state.searchTerm  ? true   : page === state.activePage;
      var searchOK = !state.searchTerm || txt.indexOf(state.searchTerm) !== -1;

      if (typeOK && topicOK && pageOK && searchOK) {
        $c.show();
        anyVisible = true;
      } else {
        $c.hide();
      }
    });

    $('.rego_news_pagination').toggle(!state.searchTerm);

    var $empty = $('.rego_news_no_results');
    if ($empty.length) $empty.toggle(!anyVisible);
  }

  function initFilters() {
    if (!$('.rego_news_card').length) return;

    $('.rego_news_type').on('click', function() {
      $('.rego_news_type').removeClass('rego_news_type_active');
      $(this).addClass('rego_news_type_active');
      state.activeType = ($(this).attr('data-type') || 'all').toLowerCase();
      applyFilters();
    });

    $('.rego_news_topic').on('click', function() {
      $('.rego_news_topic').removeClass('rego_news_topic_active');
      $(this).addClass('rego_news_topic_active');
      state.activeTopic = ($(this).attr('data-topic') || 'all').toLowerCase();
      applyFilters();
    });

    var debounceTimer;
    $('.rego_news_search_input').on('input', function() {
      var v = $(this).val();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        state.searchTerm = (v || '').trim().toLowerCase();
        applyFilters();
      }, 250);
    });

    $('.rego_news_search_form').on('submit', function(e) { e.preventDefault(); });
  }

  // ===== PAGINATION =====
  var TOTAL_PAGES = 41;

  function buildPaginationModel(current) {
    var items = [];
    var c = current;
    var add = function(v) { items.push(v); };

    add(1);
    if (c <= 4) {
      var end = Math.max(3, c + 1);
      for (var i = 2; i <= end && i < TOTAL_PAGES; i++) add(i);
      if (end < TOTAL_PAGES - 1) add('…');
      if (TOTAL_PAGES > 1) add(TOTAL_PAGES);
    } else if (c >= TOTAL_PAGES - 3) {
      add('…');
      var start = Math.min(TOTAL_PAGES - 4, c - 2);
      for (var j = start; j < TOTAL_PAGES; j++) add(j);
      add(TOTAL_PAGES);
    } else {
      add('…');
      for (var k = c - 2; k <= c + 2; k++) add(k);
      add('…');
      add(TOTAL_PAGES);
    }
    return items;
  }

  function renderPagination() {
    var $nav = $('#rego_news_pagination');
    if (!$nav.length) return;

    var current = parseInt(state.activePage, 10) || 1;
    var items = buildPaginationModel(current);

    var html = '';
    if (current > 1) {
      html += '<button class="rego_news_page_prev" type="button"><span aria-hidden="true">←</span> Previous</button>';
    }
    items.forEach(function(it) {
      if (it === '…') {
        html += '<span class="rego_news_page_dots">…</span>';
      } else {
        var active = (it === current) ? ' rego_news_page_active' : '';
        html += '<button class="rego_news_page' + active + '" type="button" data-page="' + it + '">' + it + '</button>';
      }
    });
    if (current < TOTAL_PAGES) {
      html += '<button class="rego_news_page_next" type="button">Next <span aria-hidden="true">→</span></button>';
    }
    $nav.html(html);
  }

  function setActivePage(page) {
    var n = parseInt(page, 10) || 1;
    if (n < 1) n = 1;
    if (n > TOTAL_PAGES) n = TOTAL_PAGES;
    state.activePage = String(n);
    renderPagination();
    applyFilters();
    var $grid = $('.rego_news_grid');
    if ($grid.length) {
      $('html,body').animate({ scrollTop: $grid.offset().top - 96 }, 400);
    }
  }

  function initPagination() {
    var $nav = $('#rego_news_pagination');

    $nav.on('click', '.rego_news_page', function() {
      var page = $(this).attr('data-page') || '1';
      setActivePage(page);
    });

    $nav.on('click', '.rego_news_page_next', function() {
      var current = parseInt(state.activePage, 10) || 1;
      if (current < TOTAL_PAGES) setActivePage(current + 1);
    });

    $nav.on('click', '.rego_news_page_prev', function() {
      var current = parseInt(state.activePage, 10) || 1;
      if (current > 1) setActivePage(current - 1);
    });

    renderPagination();
    applyFilters();
  }

  // ===== NEWSLETTER FORM =====
  function initNewsletter() {
    var $form = $('.rego_news_signup_form');
    if (!$form.length) return;
    $form.on('submit', function(e) {
      e.preventDefault();
      var $btn = $form.find('.rego_news_signup_submit');
      var orig = $btn.text();
      $btn.text('Thanks!').css('opacity', 0.85);
      setTimeout(function() { $btn.text(orig).css('opacity', 1); $form[0].reset(); }, 1800);
    });
  }

  $(document).ready(function() {
    initReveal();
    initFeaturedSlider();
    initFilters();
    initPagination();
    initNewsletter();
  });

})(jQuery);
