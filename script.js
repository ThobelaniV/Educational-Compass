// ===========================================================
// Educational Compass — shared interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky nav background on scroll ---- */
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- Contact form validation ---- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');

    const validators = {
      name: v => v.trim().length >= 2 || 'Enter your full name.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
      subject: v => v.trim().length >= 2 || 'Enter a subject.',
      message: v => v.trim().length >= 10 || 'Message should be at least 10 characters.'
    };

    const validateField = (field) => {
      const errorEl = field.closest('.field').querySelector('.error');
      const result = validators[field.name](field.value);
      if (result === true) {
        errorEl.textContent = '';
        return true;
      } else {
        errorEl.textContent = result;
        return false;
      }
    };

    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('input, textarea').forEach(field => {
        if (!validateField(field)) valid = false;
      });

      if (valid) {
        status.textContent = "Thanks — your message has been received. We'll reply within two business days.";
        status.classList.add('show');
        form.reset();
      } else {
        status.textContent = 'Please correct the highlighted fields before sending.';
        status.classList.add('show');
      }
    });
  }

});
