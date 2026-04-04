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