// Mobile menu toggle
const mobileMenu = document.getElementById("mobile-menu");
const nav = document.getElementById("nav");

mobileMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Intersection Observer for animation on scroll
const observerTargets = document.querySelectorAll(".observer-target");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

observerTargets.forEach((target) => {
  observer.observe(target);
});

// Story cards animation on load
const storyCards = document.querySelectorAll(".story-card");

storyCards.forEach((card, index) => {
  card.style.animationDelay = `${0.1 * index}s`;
});

// Trending items animation on load
const trendingItems = document.querySelectorAll(".trending-item");

trendingItems.forEach((item, index) => {
  item.style.animationDelay = `${0.1 * index}s`;
});

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Particle background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(26, 115, 232, ${Math.random() * 0.3})`;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  const numberOfParticles = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.strokeStyle = `rgba(26, 115, 232, ${0.1 - (distance/1000)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  
  connectParticles();
  requestAnimationFrame(animate);
}

init();
animate();


// 3D parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 768) { // Only on desktop
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    heroContent.style.transform = `
      rotateY(${mouseX * 10}deg) 
      rotateX(${-mouseY * 10}deg)
      translateZ(0)
    `;
  }
});

// Advanced header animations
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add scrolled class after scrolling down 100px
  if (scrollTop > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Hide header when scrolling down, show when scrolling up
  if (scrollTop > lastScrollTop && scrollTop > 200) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop;
});


// Advanced scroll animations
const revealElements = document.querySelectorAll('.story-card, .trending-item, .section-title, .subscription-content');

// Apply scroll-reveal class to elements
revealElements.forEach(element => {
  element.classList.add('scroll-reveal');
});

// Scroll reveal observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Unobserve after revealing to improve performance
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// Parallax scrolling for background elements
const parallaxBgs = document.querySelectorAll('.parallax-bg');

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  
  parallaxBgs.forEach(bg => {
    const speed = bg.dataset.speed || 0.5;
    const yPos = -(scrollPosition * speed);
    bg.style.transform = `translateY(${yPos}px)`;
  });
});

// Apply parallax to hero section
// const hero = document.querySelector('.hero');
hero.classList.add('parallax-section');

// Create and append parallax background
const parallaxBg = document.createElement('div');
parallaxBg.classList.add('parallax-bg');
parallaxBg.setAttribute('data-speed', '0.3');
parallaxBg.style.background = 'linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)';
hero.prepend(parallaxBg);

// Scroll-based reveal animations
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-down');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Add classes to elements for reveal animations
document.querySelectorAll('.story-card:nth-child(odd)').forEach(el => {
  el.classList.add('reveal-left');
});
document.querySelectorAll('.story-card:nth-child(even)').forEach(el => {
  el.classList.add('reveal-right');
});
document.querySelectorAll('.section-title').forEach(el => {
  el.classList.add('reveal-up');
});

// Simulating dynamic content - Breaking news ticker
function createBreakingNews() {
  const container = document.createElement('div');
  container.className = 'breaking-news';
  
  const breakingNews = [
    "Breaking: Global Climate Summit announces major emissions reduction targets",
    "Flash: Tech giant unveils revolutionary quantum computing breakthrough",
    "Alert: International space mission discovers signs of ancient life on Mars",
    "Update: World leaders agree on new framework for AI governance"
  ];
  
  const randomNews = breakingNews[Math.floor(Math.random() * breakingNews.length)];
  
  container.innerHTML = `
    <div class="breaking-container">
      <span class="breaking-label">Breaking News</span>
      <p class="breaking-content">${randomNews}</p>
    </div>
  `;
  
  // Insert after header
  const header = document.querySelector('header');
  header.parentNode.insertBefore(container, header.nextSibling);
}

// Create dynamic content loading effect
function simulateContentLoading() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Loading fresh content...</p>
  `;
  
  document.body.appendChild(loadingIndicator);
  
  setTimeout(() => {
    loadingIndicator.classList.add('fade-out');
    setTimeout(() => {
      loadingIndicator.remove();
      createBreakingNews();
    }, 500);
  }, 1500);
}

// Simulate content loading on page load
window.addEventListener('load', simulateContentLoading);