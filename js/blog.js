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

  // ===== CATEGORY TABS =====
  function initCategoryTabs() {
    const tabButtons = document.querySelectorAll('.rego_blog_tab');
    const cards = document.querySelectorAll('.rego_blog_card');
    const featuredPost = document.querySelector('.rego_blog_featured');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        // Update active tab
        tabButtons.forEach(b => b.classList.remove('rego_blog_tab_active'));
        btn.classList.add('rego_blog_tab_active');

        // Filter cards
        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          const isMatch = category === 'all' || cardCategory === category;

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

        // Filter featured post
        if (featuredPost) {
          const featuredCategory = featuredPost.getAttribute('data-category');
          const featuredMatch = category === 'all' || featuredCategory === category;

          if (featuredMatch) {
            featuredPost.style.display = 'block';
            featuredPost.style.opacity = '0';
            featuredPost.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
              featuredPost.style.opacity = '1';
            }, 10);
          } else {
            featuredPost.style.display = 'none';
          }
        }
      });
    });
  }

  // ===== CARD ENTRANCE =====
  function initCardEntrance() {
    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.rego_blog_card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(28px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 80);
          });
          gridObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    const grid = document.querySelector('.rego_blog_grid');
    if (grid) gridObserver.observe(grid);
  }

  // ===== FEATURED ENTRANCE =====
  function initFeaturedEntrance() {
    const featured = document.querySelector('.rego_blog_featured');
    if (!featured) return;

    const thumbnail = featured.querySelector('[class*="rego_blog_featured_thumb"]');
    const content = featured.querySelector('[class*="rego_blog_featured_content"]');

    if (thumbnail) {
      thumbnail.style.opacity = '0';
      thumbnail.style.transform = 'translateX(-40px)';
      thumbnail.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
      setTimeout(() => {
        thumbnail.style.opacity = '1';
        thumbnail.style.transform = 'translateX(0)';
      }, 10);
    }

    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateX(40px)';
      content.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
      setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
      }, 10);
    }
  }

  // ===== LOAD MORE =====
  function initLoadMore() {
    const loadMoreBtn = document.querySelector('.rego_blog_load_more');
    if (!loadMoreBtn) return;

    let isExpanded = false;

    loadMoreBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.rego_blog_card.rego_blog_hidden');

      if (!isExpanded) {
        hiddenCards.forEach((card, index) => {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(28px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 80);
        });
        loadMoreBtn.textContent = 'Show Less';
        isExpanded = true;
      } else {
        hiddenCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(28px)';
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
    const form = document.querySelector('.rego_blog_newsletter_form');
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

  // ===== CARD HOVER PARALLAX =====
  function initCardHover() {
    const cards = document.querySelectorAll('.rego_blog_card');

    cards.forEach(card => {
      const thumbnail = card.querySelector('[class*="rego_blog_card_thumb"]');
      if (!thumbnail) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const offsetX = (x - centerX) / centerX * 4;
        const offsetY = (y - centerY) / centerY * 4;

        thumbnail.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        thumbnail.style.transition = 'none';
      });

      card.addEventListener('mouseleave', () => {
        thumbnail.style.transform = 'translate(0, 0)';
        thumbnail.style.transition = 'transform 0.3s ease';
      });
    });
  }

  function initBlogSlider() {
    var $slider = $('.rego_blog_slider');
    if (!$slider.length) return;
    var $slides = $slider.find('.rego_blog_slide');
    var $dotsWrap = $slider.find('.rego_blog_slider_dots');
    if (!$slides.length) return;
    var current = 0, total = $slides.length, timer = null;

    $dotsWrap.empty();
    for (var i = 0; i < total; i++) {
      $dotsWrap.append('<button class="rego_blog_slider_dot" type="button" data-index="' + i + '" aria-label="Slide ' + (i+1) + '"></button>');
    }
    var $dots = $dotsWrap.find('.rego_blog_slider_dot');

    function go(i) {
      current = (i + total) % total;
      $slides.removeClass('rego_blog_slide_active');
      $slides.eq(current).addClass('rego_blog_slide_active');
      $dots.removeClass('rego_blog_slider_dot_active');
      $dots.eq(current).addClass('rego_blog_slider_dot_active');
    }
    function start() { stop(); timer = setInterval(function(){ go(current + 1); }, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    $dots.on('click', function(){ go(parseInt($(this).attr('data-index'), 10)); start(); });
    $slider.on('mouseenter', stop).on('mouseleave', start);
    go(0);
    start();
  }

  // ===== INIT ON DOCUMENT READY =====
  $(document).ready(function() {
    initReveal();
    initCategoryTabs();
    initCardEntrance();
    initFeaturedEntrance();
    initLoadMore();
    initNewsletterForm();
    initCardHover();
    initBlogSlider();
  });

})(jQuery);
