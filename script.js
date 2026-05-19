/* =============================================
   GIULIA SELMO — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── LOADER ───
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2200);
    document.body.style.overflow = 'hidden';
  }

  // ─── CUSTOM CURSOR ───
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (cursor && follower) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    const animateFollower = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // cursor states
    document.querySelectorAll('a, button, .work-item, .proj-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'var(--pink)';
        follower.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = '';
        follower.style.opacity = '1';
      });
    });
  }

  // ─── HAMBURGER / MENU OVERLAY ───
  const hamburger = document.querySelector('.hamburger');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (hamburger && menuOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      menuOverlay.classList.toggle('open');
      document.body.style.overflow = menuOverlay.classList.contains('open') ? 'hidden' : '';
    });

    menuOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ─── STAGGER DELAYS ───
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const children = container.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    children.forEach((child, i) => {
      child.dataset.delay = i * 120;
    });
  });

  // ─── SMOOTH PARALLAX on HERO IMAGE ───
  const heroImg = document.querySelector('.hero-image-inner');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.2}px)`;
    }, { passive: true });
  }

  // ─── ACTIVE NAV LINK ───
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── NUMBER COUNTER ANIMATION ───
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ─── MARQUEE DUPLICATE ───
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const clone = marqueeTrack.cloneNode(true);
    marqueeTrack.parentNode.appendChild(clone);
  }

  // ─── FORM INTERACTION ───
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    const label = group.querySelector('label');
    if (input && label) {
      input.addEventListener('focus', () => {
        label.style.color = 'var(--ink)';
      });
      input.addEventListener('blur', () => {
        label.style.color = '';
      });
    }
  });

  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const original = btn.textContent;
      btn.textContent = 'Messaggio inviato ✓';
      btn.style.background = 'var(--pink)';
      btn.style.color = 'var(--white)';
      btn.style.borderColor = 'var(--pink)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        form.reset();
      }, 3000);
    });
  }

  // ─── IMAGE TILT on hover (project items) ───
  document.querySelectorAll('.proj-item, .work-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      item.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.transition = 'transform 0.6s var(--ease-out)';
      setTimeout(() => item.style.transition = '', 600);
    });
  });

});
