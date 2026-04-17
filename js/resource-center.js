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

  // ===== TAB SWITCHING =====
  function initTabs() {
    const tabButtons = document.querySelectorAll('.rego_rc_tab');
    const cards = document.querySelectorAll('.rego_rc_card');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabValue = btn.getAttribute('data-tab');

        // Update active tab
        tabButtons.forEach(b => b.classList.remove('rego_rc_tab_active'));
        btn.classList.add('rego_rc_tab_active');

        // Filter cards
        cards.forEach(card => {
          const cardType = card.getAttribute('data-type');
          const isMatch = tabValue === 'all' || cardType === tabValue;

          if (isMatch) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
              card.style.opacity = '1';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== CARD ENTRANCE =====
  function initCardEntrance() {
    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.rego_rc_card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 60);
          });
          gridObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    const grid = document.querySelector('.rego_rc_grid');
    if (grid) gridObserver.observe(grid);
  }

  // ===== FEATURED ENTRANCE =====
  function initFeaturedEntrance() {
    const featuredObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const thumbnail = entry.target.querySelector('[class*="rego_rc_featured_thumb"]');
          const content = entry.target.querySelector('[class*="rego_rc_featured_content"]');

          if (thumbnail) {
            thumbnail.style.opacity = '0';
            thumbnail.style.transform = 'translateX(-30px)';
            thumbnail.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            setTimeout(() => {
              thumbnail.style.opacity = '1';
              thumbnail.style.transform = 'translateX(0)';
            }, 10);
          }

          if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateX(30px)';
            content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            setTimeout(() => {
              content.style.opacity = '1';
              content.style.transform = 'translateX(0)';
            }, 10);
          }

          featuredObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    });

    const featured = document.querySelector('.rego_rc_featured');
    if (featured) featuredObserver.observe(featured);
  }

  // ===== LOAD MORE =====
  function initLoadMore() {
    const loadMoreBtn = document.querySelector('.rego_rc_load_more');
    if (!loadMoreBtn) return;

    let isExpanded = false;

    loadMoreBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.rego_rc_card.rego_rc_hidden');

      if (!isExpanded) {
        hiddenCards.forEach((card, index) => {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 60);
        });
        loadMoreBtn.textContent = 'Show Less';
        isExpanded = true;
      } else {
        hiddenCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        });
        loadMoreBtn.textContent = 'Load More';
        isExpanded = false;
      }
    });
  }

  // ===== NEWSLETTER FORM =====
  function initNewsletterForm() {
    const form = document.querySelector('.rego_rc_newsletter_form');
    if (!form) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = form.querySelector('[name="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        alert('Please enter a valid email address');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      submitBtn.textContent = 'Subscribing...';

      setTimeout(() => {
        const successMsg = document.createElement('div');
        successMsg.textContent = "You're subscribed!";
        successMsg.style.color = '#10b981';
        successMsg.style.marginTop = '1rem';
        successMsg.style.fontWeight = '500';

        form.style.display = 'none';
        form.parentNode.appendChild(successMsg);
      }, 800);
    });
  }

  // ===== INIT ON DOCUMENT READY =====
  $(document).ready(function() {
    initReveal();
    initTabs();
    initCardEntrance();
    initFeaturedEntrance();
    initLoadMore();
    initNewsletterForm();
  });

})(jQuery);
