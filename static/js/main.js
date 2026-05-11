// Navbar scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('shadow-md', window.scrollY > 20);
  });
}

// Auto-dismiss flash messages (DaisyUI toast)
document.querySelectorAll('.toast .alert').forEach(alert => {
  setTimeout(() => {
    alert.style.transition = 'opacity .4s ease, transform .4s ease';
    alert.style.opacity = '0';
    alert.style.transform = 'translateX(100%)';
    setTimeout(() => alert.remove(), 400);
  }, 5000);
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// Skill badges — animation au scroll (fade-in stagger)
const skillBadges = document.querySelectorAll('.badge[class*="badge-outline"]');
if (skillBadges.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp .4s ease ${i * 30}ms both`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const style = document.createElement('style');
  style.textContent = `@keyframes fadeInUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`;
  document.head.appendChild(style);

  skillBadges.forEach(badge => {
    badge.style.opacity = '0';
    observer.observe(badge);
  });
}
