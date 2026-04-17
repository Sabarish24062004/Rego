(function ($) {
  'use strict';

  var HEADER_TEMPLATE = `
<header class="rego_header" id="rego_header">
  <div class="rego_container rego_header_inner">
    <a href="index.html" class="rego_header_logo" aria-label="RegO Home">
      <img src="images/rego-logo.png" alt="RegO logo" class="rego_logo_icon" aria-hidden="true" />
    </a>

    <nav class="rego_header_nav" id="rego_main_nav" aria-label="Main navigation">
      <div class="rego_nav_item rego_has_dropdown">
        <button class="rego_nav_link" aria-haspopup="true" aria-expanded="false">
          Product
          <svg class="rego_nav_chevron" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="rego_dropdown rego_dropdown_wide" role="menu">
          <div class="rego_dropdown_inner">
            <div class="rego_dropdown_col">
              <p class="rego_dropdown_label">Platform</p>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_platform"></span><span><strong>Platform Overview</strong><small>End-to-end compliance lifecycle</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_dashboard"></span><span><strong>Compliance Dashboard</strong><small>Real-time compliance scores</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_workflow"></span><span><strong>Workflow Automation</strong><small>Eliminate manual processes</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_analytics"></span><span><strong>Analytics &amp; Reporting</strong><small>Actionable compliance insights</small></span></a>
            </div>
            <div class="rego_dropdown_col">
              <p class="rego_dropdown_label">Capabilities</p>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_evidence"></span><span><strong>Evidence Collection</strong><small>Automated artifact gathering</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_monitor"></span><span><strong>Continuous Monitoring</strong><small>Always-on compliance checks</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_audit"></span><span><strong>Audit Management</strong><small>Streamlined audit readiness</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_risk"></span><span><strong>Risk Management</strong><small>Quantify and mitigate risk</small></span></a>
            </div>
            <div class="rego_dropdown_feature_card">
              <div class="rego_dropdown_feature_badge">New</div>
              <h4>AI-Powered Control Mapping</h4>
              <p>Automatically map controls across multiple frameworks with intelligent cross-walking technology.</p>
              <a href="#" class="rego_dropdown_feature_link">Learn more -></a>
            </div>
          </div>
        </div>
      </div>

      <div class="rego_nav_item rego_has_dropdown">
        <button class="rego_nav_link" aria-haspopup="true" aria-expanded="false">
          Solutions
          <svg class="rego_nav_chevron" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="rego_dropdown rego_dropdown_wide" role="menu">
          <div class="rego_dropdown_inner">
            <div class="rego_dropdown_col">
              <p class="rego_dropdown_label">By Framework</p>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_fw_badge">FED</span> FedRAMP</a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_fw_badge">SOC</span> SOC 2 Type II</a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_fw_badge">NIST</span> NIST CSF 2.0</a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_fw_badge">ISO</span> ISO 27001</a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_fw_badge">PCI</span> PCI DSS 4.0</a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_fw_badge">CMC</span> CMMC 2.0</a>
            </div>
            <div class="rego_dropdown_col">
              <p class="rego_dropdown_label">By Use Case</p>
              <a href="continuous-compliance-for-devsecops.html" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_devsecops"></span><span><strong>DevSecOps</strong><small>Compliance in the pipeline</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_gov"></span><span><strong>Federal Government</strong><small>DoD and civilian agencies</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_health"></span><span><strong>Healthcare</strong><small>HIPAA and HITRUST alignment</small></span></a>
              <a href="#" class="rego_dropdown_link" role="menuitem"><span class="rego_dropdown_icon rego_icon_finance"></span><span><strong>Financial Services</strong><small>SOX and FFIEC readiness</small></span></a>
            </div>
            <div class="rego_dropdown_feature_card">
              <div class="rego_dropdown_feature_badge">Guide</div>
              <h4>Multi-Framework Mapping</h4>
              <p>See how teams map one control set to FedRAMP, ISO 27001, SOC 2, and NIST in minutes.</p>
              <a href="#" class="rego_dropdown_feature_link">Read playbook -></a>
            </div>
          </div>
        </div>
      </div>

      <a href="resource-center.html" class="rego_nav_link">Resources</a>
      <a href="about-us.html" class="rego_nav_link">Company</a>
      <a href="contact.html" class="rego_nav_link">Contact</a>
    </nav>

    <div class="rego_header_actions">
      <a href="schedule-demo.html" class="rego_btn rego_btn_ghost">Schedule Demo</a>
      <a href="download-regscale.html" class="rego_btn rego_btn_primary">Get Started</a>
    </div>

    <button class="rego_mobile_toggle" id="rego_mobile_toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="rego_mobile_nav">
      <span></span><span></span><span></span>
    </button>
  </div>

  <nav class="rego_mobile_nav" id="rego_mobile_nav" aria-label="Mobile navigation" aria-hidden="true">
    <div class="rego_mobile_nav_inner">
      <a href="index.html" class="rego_mobile_link">Home</a>
      <button class="rego_mobile_section_toggle" type="button">Product</button>
      <div class="rego_mobile_section_body">
        <a href="#" class="rego_mobile_link">Platform Overview</a>
        <a href="#" class="rego_mobile_link">Compliance Dashboard</a>
        <a href="#" class="rego_mobile_link">Workflow Automation</a>
      </div>
      <button class="rego_mobile_section_toggle" type="button">Solutions</button>
      <div class="rego_mobile_section_body">
        <a href="continuous-compliance-for-devsecops.html" class="rego_mobile_link">DevSecOps</a>
        <a href="#" class="rego_mobile_link">FedRAMP</a>
        <a href="#" class="rego_mobile_link">SOC 2</a>
      </div>
      <a href="resource-center.html" class="rego_mobile_link">Resources</a>
      <a href="about-us.html" class="rego_mobile_link">Company</a>
      <a href="contact.html" class="rego_mobile_link">Contact</a>
      <a href="schedule-demo.html" class="rego_btn rego_btn_primary rego_mobile_cta">Schedule Demo</a>
    </div>
  </nav>
</header>`;

  var FOOTER_TEMPLATE = `
<footer class="rego_footer" id="rego_footer" aria-label="Site footer">
  <div class="rego_container rego_footer_inner">
    <div class="rego_footer_brand">
      <a href="index.html" class="rego_header_logo rego_footer_logo" aria-label="RegO Home">
        <svg class="rego_logo_icon" width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="36" height="36" rx="8" fill="url(#footer_logo_grad_shared)"/>
          <path d="M10 10h10a6 6 0 0 1 0 12h-4l6 4H18l-6-4v4h-2V10z" fill="#fff"/>
          <defs>
            <linearGradient id="footer_logo_grad_shared" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stop-color="#4a569e"/>
              <stop offset="1" stop-color="#842573"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="rego_logo_text">Reg<span class="rego_logo_o">O</span></span>
      </a>
      <p class="rego_footer_tagline">Compliance, orchestrated. Automate your GRC program and achieve continuous compliance at enterprise scale.</p>
      <div class="rego_footer_social" aria-label="Social media links">
        <a href="#" class="rego_social_link" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></a>
        <a href="#" class="rego_social_link" aria-label="Twitter/X"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4l7 7m0 0L4 20h4l5-5m-2-2 7-9h-4l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <a href="#" class="rego_social_link" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703C6.667 19.854 6.07 18 6.07 18c-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.097-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" stroke="currentColor" stroke-width="1.5"/></svg></a>
        <a href="#" class="rego_social_link" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M10 9l5 3-5 3V9z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></a>
      </div>
    </div>

    <div class="rego_footer_col">
      <h4 class="rego_footer_col_title">Product</h4>
      <ul class="rego_footer_links">
        <li><a href="#">Platform Overview</a></li>
        <li><a href="#">Compliance Dashboard</a></li>
        <li><a href="#">Workflow Automation</a></li>
        <li><a href="#">Analytics &amp; Reporting</a></li>
        <li><a href="#">Risk Management</a></li>
        <li><a href="#">Integrations</a></li>
        <li><a href="#">Pricing</a></li>
      </ul>
    </div>

    <div class="rego_footer_col">
      <h4 class="rego_footer_col_title">Solutions</h4>
      <ul class="rego_footer_links">
        <li><a href="continuous-compliance-for-devsecops.html">DevSecOps</a></li>
        <li><a href="#">FedRAMP</a></li>
        <li><a href="#">SOC 2 Type II</a></li>
        <li><a href="#">NIST CSF 2.0</a></li>
        <li><a href="#">CMMC 2.0</a></li>
        <li><a href="#">PCI DSS 4.0</a></li>
        <li><a href="#">HIPAA</a></li>
      </ul>
    </div>

    <div class="rego_footer_col">
      <h4 class="rego_footer_col_title">Resources</h4>
      <ul class="rego_footer_links">
        <li><a href="#">Blog</a></li>
        <li><a href="#">Documentation</a></li>
        <li><a href="#">Webinars</a></li>
        <li><a href="#">Case Studies</a></li>
        <li><a href="#">White Papers</a></li>
        <li><a href="#">API Reference</a></li>
        <li><a href="#">Community</a></li>
      </ul>
    </div>

    <div class="rego_footer_col rego_footer_col_last">
      <h4 class="rego_footer_col_title">Company</h4>
      <ul class="rego_footer_links">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Leadership</a></li>
        <li><a href="#">Careers <span class="rego_hiring_badge">Hiring</span></a></li>
        <li><a href="#">Partners</a></li>
        <li><a href="#">News &amp; Press</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div class="rego_footer_newsletter">
        <h4 class="rego_footer_col_title">Stay Updated</h4>
        <p>Get DevSecOps compliance insights delivered to your inbox.</p>
        <form class="rego_newsletter_form" id="rego_newsletter_form" novalidate>
          <input type="email" placeholder="Enter your email" class="rego_newsletter_input" aria-label="Email address" required />
          <button type="submit" class="rego_newsletter_btn" aria-label="Subscribe">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </form>
      </div>
    </div>
  </div>

  <div class="rego_footer_bottom">
    <div class="rego_container rego_footer_bottom_inner">
      <p class="rego_footer_copy">(c) 2025 RegO, Inc. All rights reserved.</p>
      <div class="rego_footer_certifications" aria-label="Security certifications">
        <span class="rego_cert_badge">SOC 2</span>
        <span class="rego_cert_badge">ISO 27001</span>
        <span class="rego_cert_badge">FedRAMP</span>
      </div>
      <div class="rego_footer_legal">
        <a href="#">Privacy Policy</a>
        <a href="enterprise-software-license-agreement.html">Terms of Service</a>
        <a href="#">Cookie Settings</a>
        <a href="security.html">Security</a>
      </div>
    </div>
  </div>
</footer>`;

  function injectSharedLayout() {
    if (!document.getElementById('rego_header')) {
      var headerMount = document.getElementById('rego_header_mount');
      if (headerMount) {
        headerMount.outerHTML = HEADER_TEMPLATE;
      } else if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', HEADER_TEMPLATE);
      }
    }

    if (!document.getElementById('rego_footer')) {
      var footerMount = document.getElementById('rego_footer_mount');
      if (footerMount) {
        footerMount.outerHTML = FOOTER_TEMPLATE;
      } else if (document.body) {
        document.body.insertAdjacentHTML('beforeend', FOOTER_TEMPLATE);
      }
    }
  }

  function initHeaderBehavior() {
    var $header = $('#rego_header');
    var $mobileToggle = $('#rego_mobile_toggle');
    var $mobileNav = $('#rego_mobile_nav');
    var $body = $('body');

    function handleScroll() {
      if ($(window).scrollTop() > 10) {
        $header.addClass('rego_header_scrolled');
      } else {
        $header.removeClass('rego_header_scrolled');
      }
    }

    $(window).on('scroll.regoHeader', handleScroll);
    handleScroll();

    $mobileToggle.on('click.regoHeader', function () {
      var isOpen = $mobileNav.hasClass('rego_is_open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    function openMobileNav() {
      $mobileToggle.addClass('rego_is_open').attr('aria-expanded', 'true');
      $mobileNav.addClass('rego_is_open').attr('aria-hidden', 'false');
      $body.css('overflow', 'hidden');
    }

    function closeMobileNav() {
      $mobileToggle.removeClass('rego_is_open').attr('aria-expanded', 'false');
      $mobileNav.removeClass('rego_is_open').attr('aria-hidden', 'true');
      $body.css('overflow', '');
    }

    $mobileNav.on('click.regoHeader', '.rego_mobile_section_toggle', function () {
      var $toggle = $(this);
      var $sectionBody = $toggle.next('.rego_mobile_section_body');
      var isOpen = $toggle.hasClass('rego_is_open');

      $('.rego_mobile_section_toggle.rego_is_open').not($toggle).each(function () {
        $(this).removeClass('rego_is_open');
        $(this).next('.rego_mobile_section_body').removeClass('rego_is_open').slideUp(220);
      });

      if (isOpen) {
        $toggle.removeClass('rego_is_open');
        $sectionBody.removeClass('rego_is_open').slideUp(220);
      } else {
        $toggle.addClass('rego_is_open');
        $sectionBody.addClass('rego_is_open').slideDown(220);
      }
    });

    $(document).on('click.regoHeader', function (e) {
      if ($mobileNav.hasClass('rego_is_open') && !$(e.target).closest('#rego_mobile_nav, #rego_mobile_toggle').length) {
        closeMobileNav();
      }
    });

    $(window).on('resize.regoHeader', function () {
      if ($(window).width() > 1024 && $mobileNav.hasClass('rego_is_open')) {
        closeMobileNav();
      }
    });

    var $navItems = $('.rego_nav_item.rego_has_dropdown');
    $navItems.each(function () {
      var $item = $(this);
      var $trigger = $item.find('> .rego_nav_link');
      var $dropdown = $item.find('.rego_dropdown');

      $trigger.on('focus.regoHeader', function () {
        $trigger.attr('aria-expanded', 'true');
      });

      $item.on('focusout.regoHeader', function () {
        setTimeout(function () {
          if (!$item[0].contains(document.activeElement)) {
            $trigger.attr('aria-expanded', 'false');
          }
        }, 100);
      });

      $dropdown.on('keydown.regoHeader', function (e) {
        if (e.key === 'Escape') {
          $trigger.attr('aria-expanded', 'false').focus();
        }
      });
    });

    $(document).on('click.regoHeader', 'a[href^="#"]', function (e) {
      var target = $(this).attr('href');
      if (target === '#' || target === '#!') {
        return;
      }

      var $target = $(target);
      if ($target.length) {
        e.preventDefault();

        if ($mobileNav.hasClass('rego_is_open')) {
          closeMobileNav();
        }

        var headerH = $header.outerHeight() || 72;
        var offset = $target.offset().top - headerH - 16;
        $('html, body').animate({ scrollTop: offset }, 500, 'swing');
      }
    });

    var $sections = $('section[id]');
    var $navLinks = $('.rego_header_nav .rego_nav_link');

    function updateActiveNav() {
      var scrollTop = $(window).scrollTop() + 100;

      $sections.each(function () {
        var sectionTop = $(this).offset().top;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var sectionId = $(this).attr('id');

        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          $navLinks.removeClass('rego_nav_active');
          $navLinks.filter('[href="#' + sectionId + '"]').addClass('rego_nav_active');
        }
      });
    }

    $(window).on('scroll.regoNavHighlight', updateActiveNav);
  }

  function initFooterBehavior() {
    var $form = $('#rego_newsletter_form');
    var $input = $form.find('.rego_newsletter_input');
    var $btn = $form.find('.rego_newsletter_btn');

    $form.on('submit.regoFooter', function (e) {
      e.preventDefault();

      var email = $.trim($input.val());
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        shakeInput();
        $input.attr('placeholder', 'Please enter a valid email');
        return;
      }

      $btn.attr('disabled', true).css('opacity', 0.6);
      $input.attr('disabled', true);

      setTimeout(function () {
        $form.html(
          '<p class="rego_newsletter_success">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="vertical-align:middle;margin-right:6px">' +
          '<path d="M2 8l4 4 8-8" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          'You\'re subscribed - thanks!' +
          '</p>'
        );
      }, 900);
    });

    function shakeInput() {
      $input.addClass('rego_input_shake');
      setTimeout(function () {
        $input.removeClass('rego_input_shake');
      }, 600);
    }

    if (!$('#rego_shake_style').length) {
      $('<style id="rego_shake_style">' +
        '@keyframes rego_shake {' +
        '0%,100%{transform:translateX(0)}' +
        '20%,60%{transform:translateX(-5px)}' +
        '40%,80%{transform:translateX(5px)}' +
        '}' +
        '.rego_input_shake{animation:rego_shake 0.5s ease;}' +
        '.rego_newsletter_success{font-size:13px;color:#4ade80;font-family:var(--rego-font);padding:10px 0;display:flex;align-items:center;}' +
      '</style>').appendTo('head');
    }

    var $backTop = $('<button class="rego_back_top" id="rego_back_top" aria-label="Back to top" title="Back to top">' +
      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 11l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>').appendTo('body');

    if (!$('#rego_backtop_style').length) {
      $('<style id="rego_backtop_style">' +
        '.rego_back_top{' +
          'position:fixed;bottom:28px;right:28px;width:44px;height:44px;border-radius:50%;background:var(--rego-gradient);color:#fff;border:none;cursor:pointer;z-index:900;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(74,86,158,0.35);opacity:0;visibility:hidden;transform:translateY(10px);transition:opacity 0.25s,visibility 0.25s,transform 0.25s;' +
        '}' +
        '.rego_back_top.rego_show{opacity:1;visibility:visible;transform:translateY(0);}' +
        '.rego_back_top:hover{transform:translateY(-3px)!important;box-shadow:0 8px 24px rgba(74,86,158,0.45);}' +
      '</style>').appendTo('head');
    }

    $(window).on('scroll.regoBackTop', function () {
      if ($(window).scrollTop() > 400) {
        $backTop.addClass('rego_show');
      } else {
        $backTop.removeClass('rego_show');
      }
    });

    $backTop.on('click.regoBackTop', function () {
      $('html, body').animate({ scrollTop: 0 }, 500, 'swing');
    });

    var certTips = {
      'SOC 2': 'RegO is SOC 2 Type II certified - independently audited annually',
      'ISO 27001': 'RegO is ISO 27001 certified for information security management',
      'FedRAMP': 'RegO maintains FedRAMP Moderate authorization for federal use'
    };

    $('.rego_cert_badge').each(function () {
      var label = $.trim($(this).text());
      if (certTips[label]) {
        $(this).attr('title', certTips[label]);
      }
    });

    var $copy = $('.rego_footer_copy');
    if ($copy.length) {
      $copy.html($copy.html().replace(/\d{4}/, new Date().getFullYear()));
    }
  }

  $(function () {
    injectSharedLayout();
    initHeaderBehavior();
    initFooterBehavior();
  });
})(jQuery);
