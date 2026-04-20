(function ($) {
  'use strict';

  var TOTAL_PAGES = 7;

  var state = {
    type: 'all',
    topic: 'all',
    search: '',
    sort: 'date',
    page: 1,
    filtering: false
  };

  function topicMatches(cardTopic, filterTopic) {
    if (filterTopic === 'all') return true;
    var topics = (cardTopic + '').split(/\s+/);
    return topics.indexOf(filterTopic) !== -1;
  }

  function applyFilters() {
    var $cards = $('#rego_ccp_grid .rego_ccp_card');
    var q = state.search.trim().toLowerCase();
    var visible = 0;
    var filtering = state.type !== 'all' || state.topic !== 'all' || q !== '';
    state.filtering = filtering;

    $cards.each(function () {
      var $c = $(this);
      var type = $c.data('type') || '';
      var topic = $c.data('topic') || '';
      var page = ($c.data('page') || 1) + '';
      var title = ($c.data('title') || '').toString().toLowerCase();
      var cat = $c.find('.rego_ccp_card_cat').text().toLowerCase();

      var matchType = state.type === 'all' || state.type === type;
      var matchTopic = topicMatches(topic, state.topic);
      var matchSearch = !q || title.indexOf(q) !== -1 || cat.indexOf(q) !== -1;
      var matchPage = filtering ? true : page === (state.page + '');

      if (matchType && matchTopic && matchSearch && matchPage) {
        $c.show();
        visible++;
      } else {
        $c.hide();
      }
    });

    $('#rego_ccp_empty').prop('hidden', visible !== 0);
    $('#rego_ccp_pagination').toggle(!filtering);
  }

  function applySort() {
    var $grid = $('#rego_ccp_grid');
    var $cards = $grid.children('.rego_ccp_card').get();

    $cards.sort(function (a, b) {
      var $a = $(a), $b = $(b);
      if (state.sort === 'date') {
        return ($b.data('date') + '').localeCompare($a.data('date') + '');
      }
      var ta = ($a.data('title') + '').toLowerCase();
      var tb = ($b.data('title') + '').toLowerCase();
      if (state.sort === 'az') return ta.localeCompare(tb);
      if (state.sort === 'za') return tb.localeCompare(ta);
      return 0;
    });

    $.each($cards, function (_, el) { $grid.append(el); });
  }

  function initTypeFilters() {
    $('.rego_ccp_filter_btn').on('click', function () {
      var $b = $(this);
      $('.rego_ccp_filter_btn').removeClass('rego_ccp_is_active');
      $b.addClass('rego_ccp_is_active');
      state.type = $b.data('type');
      applyFilters();
    });
  }

  function initTopicTabs() {
    $('.rego_ccp_topic').on('click', function () {
      var $b = $(this);
      $('.rego_ccp_topic').removeClass('rego_ccp_is_active');
      $b.addClass('rego_ccp_is_active');
      state.topic = $b.data('topic');
      applyFilters();
    });
  }

  function initSearch() {
    var timer;
    $('#rego_ccp_search_input').on('input', function () {
      var val = $(this).val() || '';
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.search = val;
        applyFilters();
      }, 150);
    });

    $('.rego_ccp_search_btn').on('click', function () {
      state.search = $('#rego_ccp_search_input').val() || '';
      applyFilters();
    });
  }

  function initSortMenu() {
    var $btn = $('#rego_ccp_sort_btn');
    var $menu = $('#rego_ccp_sort_menu');
    var $label = $('#rego_ccp_sort_label');

    $btn.on('click', function (e) {
      e.stopPropagation();
      var open = $menu.hasClass('rego_ccp_is_open');
      $menu.toggleClass('rego_ccp_is_open', !open);
      $btn.attr('aria-expanded', !open);
    });

    $menu.on('click', 'li', function () {
      var $li = $(this);
      $menu.find('li').removeClass('rego_ccp_is_active');
      $li.addClass('rego_ccp_is_active');
      state.sort = $li.data('sort');
      $label.text($li.text());
      $menu.removeClass('rego_ccp_is_open');
      $btn.attr('aria-expanded', 'false');
      applySort();
      applyFilters();
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.rego_ccp_sort').length) {
        $menu.removeClass('rego_ccp_is_open');
        $btn.attr('aria-expanded', 'false');
      }
    });
  }

  function goToPage(page) {
    page = Math.max(1, Math.min(TOTAL_PAGES, page));
    state.page = page;

    var $pages = $('.rego_ccp_page');
    $pages.removeClass('rego_ccp_is_active');
    $pages.filter('[data-page="' + page + '"]').addClass('rego_ccp_is_active');

    $('#rego_ccp_prev').prop('hidden', page === 1);
    $('#rego_ccp_next').prop('hidden', page === TOTAL_PAGES);

    applyFilters();

    var $grid = $('#rego_ccp_grid');
    if ($grid.length) {
      $('html, body').animate({ scrollTop: $grid.offset().top - 120 }, 400);
    }
  }

  function initPagination() {
    $('.rego_ccp_page').on('click', function () {
      goToPage(parseInt($(this).data('page'), 10));
    });

    $('#rego_ccp_next').on('click', function () {
      goToPage(state.page + 1);
    });

    $('#rego_ccp_prev').on('click', function () {
      goToPage(state.page - 1);
    });
  }

  $(document).ready(function () {
    initTypeFilters();
    initTopicTabs();
    initSearch();
    initSortMenu();
    initPagination();
    applyFilters();
  });
})(jQuery);
