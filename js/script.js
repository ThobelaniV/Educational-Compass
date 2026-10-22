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
      const isOpen = toggle.classList.toggle('open');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
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
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Scrollspy: highlight the nav link for the section in view ---- */
  const spySections = document.querySelectorAll('section[id]');
  const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (spySections.length && spyLinks.length && 'IntersectionObserver' in window) {
    const spyIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          spyLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    spySections.forEach(sec => spyIO.observe(sec));
  }

  /* ---- Animated count-up stats ---- */
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const countIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(el => countIO.observe(el));
    } else {
      counters.forEach(el => { el.textContent = el.dataset.target; });
    }
  }

  /* ---- Live countdown to the next event ---- */
  const countdown = document.querySelector('.countdown');
  if (countdown) {
    const targetDate = new Date(countdown.dataset.targetDate);
    const numEls = {
      days: countdown.querySelector('[data-unit="days"]'),
      hours: countdown.querySelector('[data-unit="hours"]'),
      minutes: countdown.querySelector('[data-unit="minutes"]'),
      seconds: countdown.querySelector('[data-unit="seconds"]')
    };
    const pad = (n) => String(n).padStart(2, '0');
    let timer;
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        countdown.classList.add('is-past');
        numEls.days.textContent = '00';
        numEls.hours.textContent = '00';
        numEls.minutes.textContent = '00';
        numEls.seconds.textContent = '00';
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      numEls.days.textContent = pad(days);
      numEls.hours.textContent = pad(hours);
      numEls.minutes.textContent = pad(minutes);
      numEls.seconds.textContent = pad(seconds);
    };
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Back to top ---- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Subtle hero compass parallax on pointer move ---- */
  const heroRose = document.querySelector('.hero-rose');
  const heroSection = document.querySelector('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroRose && heroSection && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      heroRose.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;
    });
  }

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

    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('input, textarea').forEach(field => {
        if (!validateField(field)) valid = false;
      });

      if (valid) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        const body = `${message}\n\n— ${name} (${email})`;
        const mailto = `mailto:info@educationalcompass.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Opening your email app…';
        }

        status.textContent = "Thanks! We're opening your email app with your message ready to send — just hit send there to reach us.";
        status.classList.add('show');
        window.location.href = mailto;

        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        }, 600);
      } else {
        status.textContent = 'Please correct the highlighted fields before sending.';
        status.classList.add('show');
      }
    });
  }

  /* ---- Gallery tabs ---- */
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  if (galleryTabs.length) {
    galleryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panelId = tab.dataset.panel;
        galleryTabs.forEach(t => {
          t.classList.toggle('active', t === tab);
          t.setAttribute('aria-selected', String(t === tab));
        });
        document.querySelectorAll('.gallery-panel').forEach(panel => {
          panel.classList.toggle('active', panel.id === `panel-${panelId}`);
        });
      });
    });
  }

  /* ---- Lightbox for gallery images ---- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const counter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    const groups = {};
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      const group = item.dataset.lightbox;
      if (!groups[group]) groups[group] = [];
      groups[group].push(item.getAttribute('href'));
    });

    let currentGroup = null;
    let currentIndex = 0;

    const show = (group, index) => {
      const items = groups[group];
      if (!items || !items.length) return;
      currentGroup = group;
      currentIndex = (index + items.length) % items.length;
      lightboxImg.src = items[currentIndex];
      counter.textContent = `${currentIndex + 1} / ${items.length}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        show(item.dataset.lightbox, parseInt(item.dataset.index, 10) || 0);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => show(currentGroup, currentIndex - 1));
    nextBtn.addEventListener('click', () => show(currentGroup, currentIndex + 1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(currentGroup, currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentGroup, currentIndex + 1);
    });
  }

});
