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

  // ===== ANIMATED COUNTERS =====
  function initCounters() {
    const stats = document.querySelectorAll('.rego_ci_stats [data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -40px 0px'
    });

    stats.forEach(stat => counterObserver.observe(stat));
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const duration = 1400;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = target * eased;

      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  // ===== CATEGORY CARDS STAGGER =====
  function initCategoryCards() {
    const cards = document.querySelectorAll('.rego_ci_cat_card');

    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });

    // Hover effect
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('rego_ci_cat_hover');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('rego_ci_cat_hover');
      });
    });
  }

  // ===== INTEGRATION BADGES STAGGER =====
  function initIntegrationBadges() {
    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const badges = entry.target.querySelectorAll('.rego_ci_int_badge');
          badges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
              badge.style.opacity = '1';
              badge.style.transform = 'scale(1)';
            }, index * 30);
          });
          gridObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    });

    const grid = document.querySelector('.rego_ci_logo_grid');
    if (grid) gridObserver.observe(grid);
  }

  // ===== CONNECTOR STATUS TICKER =====
  function initConnectorStatusTicker() {
    const syncEvents = [
      { tool: 'GitHub Actions', time: '12 sec ago', status: 'synced' },
      { tool: 'AWS Config', time: '45 sec ago', status: 'synced' },
      { tool: 'Jira', time: '2 min ago', status: 'synced' },
      { tool: 'Okta', time: '5 min ago', status: 'synced' },
      { tool: 'Splunk', time: '8 min ago', status: 'synced' },
      { tool: 'ServiceNow', time: '12 min ago', status: 'synced' }
    ];

    const syncCard = document.querySelector('.rego_ci_sync_card');
    if (!syncCard) return;

    const syncRows = syncCard.querySelectorAll('.rego_ci_sync_row');
    if (syncRows.length === 0) return;

    let eventIndex = 0;

    function updateSyncRows() {
      syncRows.forEach((row, idx) => {
        const event = syncEvents[(eventIndex + idx) % syncEvents.length];

        row.style.opacity = '0';

        setTimeout(() => {
          row.innerHTML = `
            <span class="rego_ci_sync_tool">${event.tool}</span>
            <span class="rego_ci_sync_time">${event.time}</span>
            <span class="rego_ci_sync_status">${event.status}</span>
          `;
          row.style.transition = 'opacity 0.4s ease';
          row.style.opacity = '1';
        }, 100);
      });

      eventIndex++;
    }

    updateSyncRows();
    setInterval(updateSyncRows, 4000);
  }

  // ===== PIPELINE ENTRANCE =====
  function initPipelineEntrance() {
    const pipelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const steps = entry.target.querySelectorAll('[class*="rego_pipeline_step"]');
          steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              step.style.opacity = '1';
              step.style.transform = 'translateY(0)';
            }, index * 120);
          });
          pipelineObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    });

    const pipeline = document.querySelector('.rego_pipeline');
    if (pipeline) pipelineObserver.observe(pipeline);
  }

  // ===== SMOOTH SCROLL =====
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== INIT ON DOCUMENT READY =====
  $(document).ready(function() {
    initReveal();
    initCounters();
    initCategoryCards();
    initIntegrationBadges();
    initConnectorStatusTicker();
    initPipelineEntrance();
    initSmoothScroll();
  });

})(jQuery);
