// initialize elements for reveal animation
const elementsToReveal = document.querySelectorAll('.card, .service');
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
window.addEventListener('scroll', () => {
  elementsToReveal.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.6s ease-out';
    }
  });
});

// project modal
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
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

    if (screenshot) {
      modalImage.style.backgroundImage = `url('${screenshot}')`;
      modalImage.style.backgroundSize = 'cover';
      modalImage.style.backgroundPosition = 'center';
      modalImage.style.backgroundRepeat = 'no-repeat';
      modalImage.style.minHeight = '320px';
      modalImage.style.color = 'transparent';
    } else {
      modalImage.style.backgroundImage = '';
      modalImage.style.minHeight = '320px';
      modalImage.style.color = 'rgba(203, 213, 225, 0.7)';
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