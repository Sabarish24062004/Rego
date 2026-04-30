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
    const stats = document.querySelectorAll('[data-target]');

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

  // ===== FORM VALIDATION =====
  function initFormValidation() {
    const form = document.querySelector('.rego_demo_form');
    if (!form) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = {
        firstName: form.querySelector('[name="first_name"]'),
        lastName: form.querySelector('[name="last_name"]'),
        email: form.querySelector('[name="email"]'),
        company: form.querySelector('[name="company"]'),
        jobTitle: form.querySelector('[name="job_title"]'),
        companySize: form.querySelector('[name="company_size"]'),
        framework: form.querySelector('[name="framework"]'),
        privacy: form.querySelector('[name="privacy"]')
      };

      let isValid = true;
      const requiredFields = ['firstName', 'lastName', 'company', 'jobTitle'];
      const selectFields = ['companySize', 'framework'];

      // Clear previous errors
      form.querySelectorAll('.rego_demo_input_error').forEach(el => {
        el.classList.remove('rego_demo_input_error');
      });
      form.querySelectorAll('.rego_demo_error_msg').forEach(el => {
        el.style.display = 'none';
      });

      // Validate required text fields
      requiredFields.forEach(fieldName => {
        const field = fields[fieldName];
        if (!field || !field.value.trim()) {
          markFieldError(field, 'This field is required');
          isValid = false;
        }
      });

      // Validate email
      if (!fields.email || !emailRegex.test(fields.email.value.trim())) {
        markFieldError(fields.email, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate selects
      selectFields.forEach(fieldName => {
        const field = fields[fieldName];
        if (!field || !field.value) {
          markFieldError(field, 'Please select an option');
          isValid = false;
        }
      });

      // Validate privacy checkbox
      if (!fields.privacy || !fields.privacy.checked) {
        markFieldError(fields.privacy, 'You must agree to the privacy policy');
        isValid = false;
      }

      if (isValid) {
        form.style.display = 'none';
        const successMsg = document.querySelector('.rego_demo_success_msg');
        if (successMsg) {
          successMsg.textContent = "Thank you! We'll be in touch within 1 business day.";
          successMsg.style.display = 'block';
        }
      }
    });

    function markFieldError(field, message) {
      if (!field) return;
      field.classList.add('rego_demo_input_error');
      const errorEl = field.nextElementSibling;
      if (errorEl && errorEl.classList.contains('rego_demo_error_msg')) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
    }
  }

  // ===== TRUST LOGO PULSE =====
  function initTrustLogoPulse() {
    const pills = document.querySelectorAll('.rego_demo_trust_pill');
    if (pills.length === 0) return;

    setInterval(() => {
      const randomPill = pills[Math.floor(Math.random() * pills.length)];
      randomPill.classList.add('rego_demo_trust_highlight');
      setTimeout(() => {
        randomPill.classList.remove('rego_demo_trust_highlight');
      }, 600);
    }, 3000);
  }

  // ===== VALUE PROP ENTRANCE =====
  function initValuePropEntrance() {
    const valueObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.rego_demo_check_item');
          items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, index * 120);
          });
          valueObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    });

    const valueSection = document.querySelector('.rego_demo_value');
    if (valueSection) valueObserver.observe(valueSection);
  }

  // ===== TESTIMONIAL ENTRANCE =====
  function initTestimonialEntrance() {
    const testimonialsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.rego_demo_quote_card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          });
          testimonialsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    });

    const testimonialsSection = document.querySelector('.rego_demo_testimonials');
    if (testimonialsSection) testimonialsObserver.observe(testimonialsSection);
  }

  // ===== INIT ON DOCUMENT READY =====
  $(document).ready(function() {
    initReveal();
    initCounters();
    initFormValidation();
    initTrustLogoPulse();
    initValuePropEntrance();
    initTestimonialEntrance();
  });

})(jQuery);
