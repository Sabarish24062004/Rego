(function($){'use strict';

  // ===== REVEAL ANIMATION =====
  function initReveal() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rego_revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.rego_reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ===== SEARCH BAR WITH DEBOUNCE =====
  function initSearchBar() {
    const searchInput = document.querySelector('.rego_kh_search_input');
    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('keyup', () => {
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const articleRows = document.querySelectorAll('.rego_kh_article_row');
        let hasResults = false;

        articleRows.forEach(row => {
          const rowText = row.textContent.toLowerCase();
          const isMatch = searchTerm === '' || rowText.includes(searchTerm);

          if (isMatch) {
            row.style.display = 'block';
            hasResults = true;
          } else {
            row.style.display = 'none';
          }
        });

        const noResults = document.querySelector('.rego_kh_no_results');
        if (noResults) {
          noResults.style.display = hasResults || searchTerm === '' ? 'none' : 'block';
        }
      }, 300);
    });
  }

  // ===== CATEGORY CARDS CLICK & FILTER =====
  function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.rego_kh_cat_card');

    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');

        // Update active class
        categoryCards.forEach(c => c.classList.remove('rego_kh_cat_active'));
        card.classList.add('rego_kh_cat_active');

        // Scroll to articles section
        const articlesSection = document.querySelector('#rego_kh_articles');
        if (articlesSection) {
          articlesSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Filter articles
        const articleRows = document.querySelectorAll('.rego_kh_article_row');
        articleRows.forEach(row => {
          const rowCategory = row.getAttribute('data-category');
          const isMatch = category === 'all' || rowCategory === category;

          if (isMatch) {
            row.style.display = 'block';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== CATEGORY CARD ENTRANCE =====
  function initCategoryCardEntrance() {
    const categoriesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.rego_kh_cat_card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, index * 80);
          });
          categoriesObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    });

    const categoriesSection = document.querySelector('.rego_kh_categories');
    if (categoriesSection) categoriesObserver.observe(categoriesSection);
  }

  // ===== ARTICLE ROW ENTRANCE =====
  function initArticleRowEntrance() {
    const articlesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rows = entry.target.querySelectorAll('.rego_kh_article_row');
          rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-16px)';
            row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              row.style.opacity = '1';
              row.style.transform = 'translateX(0)';
            }, index * 60);
          });
          articlesObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    const articlesSection = document.querySelector('.rego_kh_articles');
    if (articlesSection) articlesObserver.observe(articlesSection);
  }

  // ===== VIDEO CARDS =====
  function initVideoCards() {
    const videosObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.rego_kh_video_card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          });
          videosObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    const videosSection = document.querySelector('.rego_kh_videos');
    if (videosSection) videosObserver.observe(videosSection);

    // Play button click
    const playButtons = document.querySelectorAll('.rego_kh_play_btn');
    playButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.rego_kh_video_card');
        if (card) {
          card.classList.add('rego_kh_playing');
        }
      });
    });
  }

  // ===== CHANGELOG ENTRANCE =====
  function initChangelogEntrance() {
    const changelogObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.rego_kh_cl_card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 80);
          });
          changelogObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    const changelogSection = document.querySelector('.rego_kh_changelog');
    if (changelogSection) changelogObserver.observe(changelogSection);
  }

  // ===== SEARCH FORM SUBMIT =====
  function initSearchSubmit() {
    const searchForm = document.querySelector('.rego_kh_search_form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  // ===== INIT ON DOCUMENT READY =====
  $(document).ready(function() {
    initReveal();
    initSearchBar();
    initCategoryCards();
    initCategoryCardEntrance();
    initArticleRowEntrance();
    initVideoCards();
    initChangelogEntrance();
    initSearchSubmit();
  });

})(jQuery);
