document.addEventListener('DOMContentLoaded', () => {
  // 1. Entrance animation trigger
  const animatedElements = document.querySelectorAll('.animate-on-load');
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.classList.add('animate-ready');
    });
  }, 100);

  // 2. Dynamic Premium Tech Particle Canvas Background
  initParticleBackground();

  // 3. Premium card 3D holographic tilt effect on desktop
  const card = document.querySelector('.profile-card');
  if (card && window.innerWidth > 768) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (max 5 degrees for subtle premium look)
      const rotateX = ((centerY - y) / centerY) * 5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Dynamic glossy glow overlay moving with cursor
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      card.style.background = `
        radial-gradient(
          circle at ${glowX}% ${glowY}%, 
          rgba(0, 240, 255, 0.08) 0%, 
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
      
      setTimeout(() => {
        card.style.transition = 'border-color 0.5s ease, box-shadow 0.5s ease';
      }, 500);
    });
  }
});

// Interactive Tech Particle Engine (Lightweight, fully responsive)
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const maxParticles = window.innerWidth < 768 ? 20 : 45; // Performance optimized for mobile
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(189, 0, 255, 0.3)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Populate particles list
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 120;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
