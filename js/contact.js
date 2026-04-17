/* ================================================================
   REGO – CONTACT PAGE JS
   File: js/contact.js
   Depends on: jQuery (loaded before this file), header.js, footer.js
   Handles: form validation + submit, FAQ accordion, scroll reveal,
            office card entrance, option card glow, smooth scroll
================================================================ */

(function ($) {
  'use strict';

  /* ----------------------------------------------------------------
     1. SCROLL REVEAL
  ---------------------------------------------------------------- */
  function initReveal() {
    var $els = $('.rego_reveal');
    if (!$els.length) return;

    if (!('IntersectionObserver' in window)) {
      $els.addClass('rego_revealed');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('rego_revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

    $els.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     2. CONTACT FORM VALIDATION & SUBMIT
  ---------------------------------------------------------------- */
  function initContactForm() {
    var $form    = $('#rego_contact_form');
    var $success = $('.rego_contact_success');
    var $btnText = $('.rego_contact_btn_text');
    var $spinner = $('.rego_contact_btn_spinner');

    if (!$form.length) return;

    function showError($input, msg) {
      $input.addClass('rego_input_error');
      var $err = $input.next('.rego_form_error_msg');
      if ($err.length) {
        $err.text(msg).addClass('rego_visible');
      }
    }

    function clearError($input) {
      $input.removeClass('rego_input_error');
      $input.next('.rego_form_error_msg').removeClass('rego_visible');
    }

    // Clear errors on input
    $form.find('.rego_form_input, .rego_form_select, .rego_form_textarea').on('input change', function () {
      clearError($(this));
    });

    function validateForm() {
      var valid = true;

      // First name
      var $first = $form.find('[name="first_name"]');
      if ($first.length && !$first.val().trim()) {
        showError($first, 'First name is required.');
        valid = false;
      }

      // Last name
      var $last = $form.find('[name="last_name"]');
      if ($last.length && !$last.val().trim()) {
        showError($last, 'Last name is required.');
        valid = false;
      }

      // Work email
      var $email = $form.find('[name="email"]');
      if ($email.length) {
        var emailVal = $email.val().trim();
        var emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
          showError($email, 'Work email is required.');
          valid = false;
        } else if (!emailRe.test(emailVal)) {
          showError($email, 'Please enter a valid email address.');
          valid = false;
        }
      }

      // Company
      var $company = $form.find('[name="company"]');
      if ($company.length && !$company.val().trim()) {
        showError($company, 'Company name is required.');
        valid = false;
      }

      // Inquiry type
      var $inquiry = $form.find('[name="inquiry"]');
      if ($inquiry.length && !$inquiry.val()) {
        showError($inquiry, 'Please select an inquiry type.');
        valid = false;
      }

      // Message
      var $message = $form.find('[name="message"]');
      if ($message.length && $message.val().trim().length < 10) {
        showError($message, 'Please enter a message (at least 10 characters).');
        valid = false;
      }

      // Privacy checkbox
      var $privacy = $form.find('[name="privacy"]');
      if ($privacy.length && !$privacy.is(':checked')) {
        showError($privacy, 'You must agree to the Privacy Policy.');
        valid = false;
      }

      return valid;
    }

    $form.on('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) {
        // Scroll to first error
        var $firstErr = $form.find('.rego_input_error').first();
        if ($firstErr.length) {
          var top = $firstErr.offset().top - 120;
          $('html, body').animate({ scrollTop: top }, 400);
        }
        return;
      }

      // Show loading state
      $btnText.text('Sending…');
      $spinner.show();
      $form.find('button[type="submit"]').prop('disabled', true);

      // Simulate async submit (replace with real API call in production)
      setTimeout(function () {
        $form.slideUp(300, function () {
          $success.slideDown(300);
        });
      }, 1200);
    });
  }

  /* ----------------------------------------------------------------
     3. FAQ ACCORDION
  ---------------------------------------------------------------- */
  function initFaq() {
    var $items = $('.rego_contact_faq_item');
    if (!$items.length) return;

    $items.find('.rego_contact_faq_q').on('click', function () {
      var $item = $(this).closest('.rego_contact_faq_item');
      var isOpen = $item.hasClass('rego_faq_open');

      // Close all
      $items.removeClass('rego_faq_open')
            .find('.rego_contact_faq_q').attr('aria-expanded', 'false');

      // Open clicked (unless it was already open)
      if (!isOpen) {
        $item.addClass('rego_faq_open');
        $(this).attr('aria-expanded', 'true');
      }
    });

    // Keyboard support
    $items.find('.rego_contact_faq_q').on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });
  }

  /* ----------------------------------------------------------------
     4. OFFICE CARDS STAGGER ENTRANCE
  ---------------------------------------------------------------- */
  function initOfficeCards() {
    var $cards = $('.rego_contact_office_card');
    if (!$cards.length || !('IntersectionObserver' in window)) return;

    $cards.css({ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.45s ease, transform 0.45s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = $cards.index(entry.target);
          var $el = $(entry.target);
          setTimeout(function () {
            $el.css({ opacity: 1, transform: 'translateY(0)' });
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    $cards.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     5. OPTION CARD ENTRANCE
  ---------------------------------------------------------------- */
  function initOptionCards() {
    var $cards = $('.rego_contact_option_card');
    if (!$cards.length || !('IntersectionObserver' in window)) return;

    $cards.css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.45s ease, transform 0.45s ease' });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = $cards.index(entry.target);
          var $el = $(entry.target);
          setTimeout(function () {
            $el.css({ opacity: 1, transform: 'translateY(0)' });
          }, idx * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    $cards.each(function () { observer.observe(this); });
  }

  /* ----------------------------------------------------------------
     6. CHARACTER COUNTER FOR MESSAGE TEXTAREA
  ---------------------------------------------------------------- */
  function initCharCounter() {
    var $message = $('[name="message"]');
    if (!$message.length) return;

    var $counter = $('<span class="rego_char_counter" style="display:block;text-align:right;font-size:11px;color:#94a3b8;margin-top:3px;">0 / 1000</span>');
    $message.after($counter);

    $message.on('input', function () {
      var len = $(this).val().length;
      $counter.text(len + ' / 1000');
      if (len > 950) {
        $counter.css('color', '#e53e3e');
      } else {
        $counter.css('color', '#94a3b8');
      }
    });
  }

  /* ----------------------------------------------------------------
     7. SMOOTH SCROLL FOR IN-PAGE LINKS
  ---------------------------------------------------------------- */
  function initSmoothScroll() {
    var headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--rego-header-h')
    ) || 72;

    $(document).on('click', 'a[href^="#rego_contact_"]', function (e) {
      var target = $(this).attr('href');
      var $target = $(target);
      if (!$target.length) return;
      e.preventDefault();
      var top = $target.offset().top - headerH - 16;
      $('html, body').animate({ scrollTop: top }, 480, 'swing');
    });
  }

  /* ----------------------------------------------------------------
     INITIALISE
  ---------------------------------------------------------------- */
  $(document).ready(function () {
    initReveal();
    initContactForm();
    initFaq();
    initOfficeCards();
    initOptionCards();
    initCharCounter();
    initSmoothScroll();
  });

})(jQuery);
