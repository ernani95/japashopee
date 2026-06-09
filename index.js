document.addEventListener('DOMContentLoaded', () => {
  // 1. Entrance animation trigger
  const animatedElements = document.querySelectorAll('.animate-on-load');
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.classList.add('animate-ready');
    });
  }, 100);

  // 2. Premium card 3D holographic tilt effect on desktop
  const card = document.querySelector('.profile-card');
  if (card && window.innerWidth > 768) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside the element.
      const y = e.clientY - rect.top;  // y coordinate inside the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (max 6 degrees for subtle effect)
      const rotateX = ((centerY - y) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Dynamic glossy glow overlay moving with cursor
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      card.style.background = `
        radial-gradient(
          circle at ${glowX}% ${glowY}%, 
          rgba(0, 240, 255, 0.1) 0%, 
          rgba(189, 0, 255, 0.05) 50%, 
          rgba(13, 9, 29, 0.45) 100%
        )
      `;
    });

    card.addEventListener('mouseleave', () => {
      // Reset transform smoothly
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      card.style.background = 'var(--panel-bg)';
      
      // Clean up transition property after transition completes so mousemove is responsive
      setTimeout(() => {
        card.style.transition = 'border-color 0.5s ease, box-shadow 0.5s ease';
      }, 500);
    });
  }
});
