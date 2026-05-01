/* ================================================================
   REGO – WHITE PAPERS PAGE SCRIPT
   File: js/white-papers.js
   Purpose: Drives the featured-paper hero slider plus
            type / topic / search filtering for the 12-card grid.
            (No pagination — the grid is a single fixed page.)
================================================================ */
(function ($) {
  'use strict';

  // ===== FEATURED HERO SLIDER =====
  function initFeaturedSlider() {
    var $slider = $('#rego_wp_slider');
    if (!$slider.length) return;

    var $slides = $slider.find('.rego_wp_slide');
    var $dots   = $slider.find('.rego_wp_slider_dot');
    if ($slides.length < 2) return;

    var current = 0;
    var total = $slides.length;
    var interval = 6000;
    var timerId = null;
    var paused = false;

    function show(idx) {
      idx = ((idx % total) + total) % total;
      $slides.removeClass('rego_wp_slide_active').eq(idx).addClass('rego_wp_slide_active');
      $dots.removeClass('rego_wp_slider_dot_active').attr('aria-selected', 'false')
           .eq(idx).addClass('rego_wp_slider_dot_active').attr('aria-selected', 'true');
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

  // ===== FILTERING =====
  var state = {
    type: 'white-papers',
    topic: 'all',
    searchTerm: ''
  };

  function getCards() { return $('.rego_wp_card'); }

  function matchesContentFilters($card) {
    var cardType  = String($card.data('type') || '');
    var cardTopic = String($card.data('topic') || '').toLowerCase();
    var title     = $card.find('.rego_wp_card_title').text().toLowerCase();

    if (state.type !== 'all' && cardType !== state.type) return false;
    if (state.topic !== 'all' && cardTopic.indexOf(state.topic) === -1) return false;
    if (state.searchTerm && title.indexOf(state.searchTerm) === -1) return false;
    return true;
  }

  function applyFilters() {
    var $cards = getCards();
    var matched = 0;
    $cards.each(function () {
      var $c = $(this);
      if (matchesContentFilters($c)) { $c.show(); matched++; }
      else { $c.hide(); }
    });
    $('.rego_wp_no_results').toggle(matched === 0);
  }

  function initTypeFilter() {
    $('.rego_wp_type').on('click', function () {
      $('.rego_wp_type').removeClass('rego_wp_type_active');
      $(this).addClass('rego_wp_type_active');
      state.type = $(this).data('type');
      applyFilters();
    });
  }

  function initTopicFilter() {
    $('.rego_wp_topic').on('click', function () {
      $('.rego_wp_topic').removeClass('rego_wp_topic_active');
      $(this).addClass('rego_wp_topic_active');
      state.topic = $(this).data('topic');
      applyFilters();
    });
  }

  function initSearch() {
    var $input = $('.rego_wp_search_input');
    if (!$input.length) return;
    $input.on('input', function () {
      state.searchTerm = String($(this).val() || '').trim().toLowerCase();
      applyFilters();
    });
  }

  $(document).ready(function () {
    initFeaturedSlider();
    initTypeFilter();
    initTopicFilter();
    initSearch();
    applyFilters();
  });
})(jQuery);
