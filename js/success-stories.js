/* ================================================================
   REGO – SUCCESS STORIES PAGE SCRIPT
   File: js/success-stories.js
   Purpose: Drives the featured-story hero slider, type / topic /
            search filtering, and in-page pagination across multiple
            pages of customer success stories (12 cards per page).
================================================================ */
(function ($) {
  'use strict';

  // ===== FEATURED HERO SLIDER =====
  function initFeaturedSlider() {
    var $slider = $('#rego_ss_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_ss_slide');
    var $dots   = $slider.find('.rego_ss_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total = $slides.length;
    var interval = 6000;
    var timerId = null;
    var paused = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_ss_slide_active').eq(idx).addClass('rego_ss_slide_active');
      $dots.removeClass('rego_ss_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_ss_slider_dot_active').attr('aria-selected', 'true');
      current = idx;
    }

    function next() { show(current + 1); }

    function start() {
      stop();
      timerId = setInterval(function () { if (!paused) next(); }, interval);
    }

    function stop() {
      if (timerId) { clearInterval(timerId); timerId = null; }
    }

    $dots.on('click', function () {
      var idx = parseInt($(this).attr('data-slide'), 10) || 0;
      show(idx);
      start();
    });

    $slider.on('mouseenter', function () { paused = true; });
    $slider.on('mouseleave', function () { paused = false; });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    start();
  }

  // ===== STATE =====
  var state = {
    type: 'success-stories',
    topic: 'all',
    searchTerm: '',
    page: 1
  };

  function getCards() { return $('.rego_ss_card'); }

  function matchesContentFilters($card) {
    var cardType  = String($card.data('type') || '');
    var cardTopic = String($card.data('topic') || '').toLowerCase();
    var title     = $card.find('.rego_ss_card_title').text().toLowerCase();

    if (state.type !== 'all' && cardType !== state.type) return false;
    if (state.topic !== 'all' && cardTopic.indexOf(state.topic) === -1) return false;
    if (state.searchTerm && title.indexOf(state.searchTerm) === -1) return false;
    return true;
  }

  // True when no content filters are active — pagination drives the view.
  function paginationActive() {
    return state.type === 'success-stories' &&
           state.topic === 'all' &&
           !state.searchTerm;
  }

  function applyView() {
    var $cards = getCards();

    if (paginationActive()) {
      $cards.each(function () {
        var $c = $(this);
        var p = parseInt($c.data('page'), 10) || 1;
        $c.toggle(p === state.page);
      });
      $('.rego_ss_no_results').hide();
      renderPagination();
      $('#rego_ss_pagination').show();
    } else {
      var matched = 0;
      $cards.each(function () {
        var $c = $(this);
        if (matchesContentFilters($c)) { $c.show(); matched++; }
        else { $c.hide(); }
      });
      $('.rego_ss_no_results').toggle(matched === 0);
      $('#rego_ss_pagination').hide();
    }
  }

  // ===== PAGINATION RENDERING =====
  function getTotalPages() {
    var pages = {};
    getCards().each(function () {
      var p = parseInt($(this).data('page'), 10) || 1;
      pages[p] = true;
    });
    return Math.max.apply(null, Object.keys(pages).map(Number).concat([1]));
  }

  function buildPageItems(current, totalPages) {
    var items = [];
    if (totalPages <= 5) {
      for (var i = 1; i <= totalPages; i++) items.push(i);
      return items;
    }
    items.push(1);
    if (current > 3) items.push('…');
    var startPage = Math.max(2, current - 1);
    var endPage = Math.min(totalPages - 1, current + 1);
    for (var p = startPage; p <= endPage; p++) items.push(p);
    if (current < totalPages - 2) items.push('…');
    items.push(totalPages);
    return items;
  }

  function renderPagination() {
    var $nav = $('#rego_ss_pagination');
    if (!$nav.length) return;

    var totalPages = getTotalPages();
    if (totalPages <= 1) { $nav.empty(); return; }

    var current = state.page;
    var html = '';

    if (current > 1) {
      html += '<button class="rego_ss_page_prev" type="button"><span aria-hidden="true">←</span> Previous</button>';
    }

    var items = buildPageItems(current, totalPages);

    items.forEach(function (it) {
      if (it === '…') {
        html += '<span class="rego_ss_page_dots">…</span>';
      } else {
        var active = (it === current) ? ' rego_ss_page_active' : '';
        html += '<button class="rego_ss_page' + active + '" type="button" data-page="' + it + '"' +
                (it === current ? ' aria-current="page"' : '') + '>' + it + '</button>';
      }
    });

    if (current < totalPages) {
      html += '<button class="rego_ss_page_next" type="button">Next <span aria-hidden="true">→</span></button>';
    }

    $nav.html(html);
  }

  // ===== HANDLERS =====
  function initTypeFilter() {
    $('.rego_ss_type').on('click', function () {
      $('.rego_ss_type').removeClass('rego_ss_type_active');
      $(this).addClass('rego_ss_type_active');
      state.type = $(this).data('type');
      state.page = 1;
      applyView();
    });
  }

  function initTopicFilter() {
    $('.rego_ss_topic').on('click', function () {
      $('.rego_ss_topic').removeClass('rego_ss_topic_active');
      $(this).addClass('rego_ss_topic_active');
      state.topic = $(this).data('topic');
      state.page = 1;
      applyView();
    });
  }

  function initSearch() {
    var $input = $('.rego_ss_search_input');
    if (!$input.length) return;
    $input.on('input', function () {
      state.searchTerm = String($(this).val() || '').trim().toLowerCase();
      state.page = 1;
      applyView();
    });
  }

  function initPaginationHandlers() {
    var $nav = $('#rego_ss_pagination');
    if (!$nav.length) return;

    $nav.on('click', '.rego_ss_page', function () {
      var p = parseInt($(this).data('page'), 10) || 1;
      state.page = p;
      applyView();
      scrollToGrid();
    });
    $nav.on('click', '.rego_ss_page_next', function () {
      var totalPages = getTotalPages();
      state.page = Math.min(totalPages, state.page + 1);
      applyView();
      scrollToGrid();
    });
    $nav.on('click', '.rego_ss_page_prev', function () {
      state.page = Math.max(1, state.page - 1);
      applyView();
      scrollToGrid();
    });
  }

  function scrollToGrid() {
    var $grid = $('.rego_ss_grid_section');
    if (!$grid.length) return;
    var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')) || 72;
    $('html,body').animate({ scrollTop: $grid.offset().top - headerH - 16 }, 360);
  }

  $(document).ready(function () {
    initFeaturedSlider();
    initTypeFilter();
    initTopicFilter();
    initSearch();
    initPaginationHandlers();
    applyView();
  });
})(jQuery);
