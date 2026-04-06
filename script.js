// hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// initialize elements for reveal animation
const elementsToReveal = document.querySelectorAll('.card, .service, .case-study-card');
elementsToReveal.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// reveal on scroll
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
  elementsToReveal.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.6s ease-out';
    }
  });

  if (heroImage) {
    const offset = window.scrollY * 0.06;
    heroImage.style.transform = `translateY(${offset}px)`;
  }
});

// Google Analytics event tracking for button clicks
document.querySelector('.btn-primary').addEventListener('click', function() {
  gtag('event', 'click', {
    event_category: 'engagement',
    event_label: 'get_in_touch_button'
  });
});

document.querySelector('.btn-secondary').addEventListener('click', function() {
  gtag('event', 'click', {
    event_category: 'engagement',
    event_label: 'download_cv_button'
  });
});

// project modal
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalLink = document.getElementById('modalLink');
const modalImage = document.getElementById('modalImage');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.dataset.title || 'Project';
    const description = card.dataset.description || 'Project details';
    const link = card.dataset.link || '#';
    const screenshot = card.dataset.screenshot || '';

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalLink.href = link;
    modalLink.textContent = link === '#' ? 'View details' : 'Visit project';

    const techString = card.dataset.tech || '';
    modalTech.innerHTML = techString
      .split(',')
      .map(tag => `<span class="project-badge">${tag.trim()}</span>`)
      .join('');

    if (link === '#') {
      modalLink.href = 'javascript:void(0)';
      modalLink.style.cursor = 'default';
      modalLink.style.opacity = '0.6';
      modalLink.onclick = null;
    } else {
      modalLink.style.cursor = 'pointer';
      modalLink.style.opacity = '1';
      modalLink.onclick = function(e) {
        e.preventDefault();
        window.open(link, '_blank');
      };
    }

    if (screenshot) {
      modalImage.style.backgroundImage = `url('${screenshot}')`;
      modalImage.style.backgroundSize = 'cover';
      modalImage.style.backgroundPosition = 'center';
      modalImage.style.backgroundRepeat = 'no-repeat';
      modalImage.style.minHeight = '320px';
      modalImage.style.color = 'transparent';
      modalImage.classList.add('has-image');
    } else {
      modalImage.style.backgroundImage = '';
      modalImage.style.minHeight = '320px';
      modalImage.style.color = 'rgba(203, 213, 225, 0.7)';
      modalImage.classList.remove('has-image');
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
  });
});

const closeModal = () => {
  projectModal.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
};

modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeModal();
  }
});