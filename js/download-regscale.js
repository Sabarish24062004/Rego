(function($) {
  'use strict';

  function initReveal() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('rego_revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rego_reveal').forEach(function(el) { obs.observe(el); });
  }

  function initPlatformButtons() {
    var $btns = $('.rego_dl_platform_btn');
    $btns.on('click', function() {
      $btns.removeClass('rego_dl_btn_selected');
      $(this).addClass('rego_dl_btn_selected');
      $('#rego_dl_platform_input').val($(this).data('platform'));
      $(this).css('transform', 'scale(0.97)');
      var $el = $(this);
      setTimeout(function() { $el.css('transform', ''); }, 150);
    });
  }

  function initFormValidation() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError($field, msg) {
      $field.closest('.rego_dl_field').addClass('rego_dl_field_error');
      $field.closest('.rego_dl_field').find('.rego_dl_err_msg').text(msg);
    }

    function clearErrors() {
      $('.rego_dl_field').removeClass('rego_dl_field_error');
    }

    $('.rego_dl_form').on('submit', function(e) {
      e.preventDefault();
      clearErrors();
      var valid = true;

      var $first = $(this).find('[name="first_name"]');
      var $last = $(this).find('[name="last_name"]');
      var $email = $(this).find('[name="email"]');
      var $company = $(this).find('[name="company"]');
      var $role = $(this).find('[name="role"]');
      var $size = $(this).find('[name="company_size"]');
      var $useCase = $(this).find('[name="use_case"]');
      var $terms = $(this).find('[name="terms"]');

      if (!$first.val().trim()) { showError($first, 'First name is required'); valid = false; }
      if (!$last.val().trim()) { showError($last, 'Last name is required'); valid = false; }
      if (!emailRegex.test($email.val().trim())) { showError($email, 'Valid work email is required'); valid = false; }
      if (!$company.val().trim()) { showError($company, 'Company name is required'); valid = false; }
      if (!$role.val().trim()) { showError($role, 'Role is required'); valid = false; }
      if (!$size.val()) { showError($size, 'Please select company size'); valid = false; }
      if (!$useCase.val()) { showError($useCase, 'Please select a use case'); valid = false; }
      if (!$terms.is(':checked')) {
        $terms.closest('.rego_dl_check_row').css('color', '#ef4444');
        valid = false;
      }

      if (valid) {
        $(this).fadeOut(300, function() {
          $('.rego_dl_success_msg').fadeIn(300);
        });
      }
    });
  }

  function initCounters() {
    var animated = false;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting && !animated) {
          animated = true;
          $(e.target).find('[data-target]').each(function() {
            var $el = $(this);
            var target = parseFloat($el.data('target'));
            var decimals = String($el.data('target')).indexOf('.') !== -1 ? 1 : 0;
            var prefix = $el.data('prefix') || '';
            var suffix = $el.data('suffix') || '';
            var start = performance.now();
            var duration = 1400;
            (function animate(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / duration, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              var current = (target * ease).toFixed(decimals);
              $el.text(prefix + current + suffix);
              if (progress < 1) requestAnimationFrame(animate);
            })(performance.now());
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    var $stats = document.querySelector('.rego_dl_stats');
    if ($stats) obs.observe($stats);
  }

  function initDeployCardEntrance() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          $(e.target).find('.rego_dl_deploy_card').each(function(i) {
            var $card = $(this);
            setTimeout(function() {
              $card.css({ opacity: 1, transform: 'translateY(0)' });
            }, i * 90);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $('.rego_dl_deploy_card').css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' });
    var $grid = document.querySelector('.rego_dl_deploy_grid');
    if ($grid) obs.observe($grid);
  }

  function initTrustPulse() {
    var $pills = $('.rego_dl_trust_pill');
    if (!$pills.length) return;
    setInterval(function() {
      var idx = Math.floor(Math.random() * $pills.length);
      $pills.eq(idx).addClass('rego_dl_trust_active');
      setTimeout(function() { $pills.eq(idx).removeClass('rego_dl_trust_active'); }, 300);
    }, 2500);
  }

  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
      }
    });
  }

  $(document).ready(function() {
    initReveal();
    initPlatformButtons();
    initFormValidation();
    initCounters();
    initDeployCardEntrance();
    initTrustPulse();
    initSmoothScroll();
  });
})(jQuery);
