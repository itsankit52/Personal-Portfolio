// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contact-form');
const typewriterElement = document.querySelector('.typewriter-text');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Loading Screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
loadingScreen.innerHTML = '<div class="loader"></div>';
document.body.appendChild(loadingScreen);

// Particle System
let particles = [];
let particleCount = 30;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize theme
  initTheme();

  // Initialize typewriter effect
  initTypewriter();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Initialize particle system
  initParticles();

  // Initialize scroll animations
  initScrollAnimations();

  // Event Listeners
  themeToggle.addEventListener('click', toggleTheme);
  menuToggle.addEventListener('click', toggleMobileMenu);
  backToTopBtn.addEventListener('click', scrollToTop);

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Hide loading screen after 1.5 seconds
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 1500);

  // Initial animations
  animateSkillBars();

  // Scroll event listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', animateSkillBars);
  window.addEventListener('scroll', handleNavbarScroll);

  // Resize event listener for responsive adjustments
  window.addEventListener('resize', handleResize);

  // Form input animations
  initFormAnimations();

  // Trigger initial scroll events
  handleScroll();
  handleNavbarScroll();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // Add transition after theme is set to avoid flash
  setTimeout(() => {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, 100);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Add transition class for smooth theme change
  document.body.classList.add('theme-changing');

  // Change theme
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);

  // Remove transition class after animation
  setTimeout(() => {
    document.body.classList.remove('theme-changing');
  }, 300);

  // Add click animation to button
  themeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    themeToggle.style.transform = 'scale(1)';
  }, 150);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
    icon.style.transform = 'rotate(0deg)';
  } else {
    icon.className = 'fas fa-sun';
    icon.style.transform = 'rotate(180deg)';
  }
}

// Mobile Menu Management
function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');

  if (navMenu.classList.contains('active')) {
    icon.className = 'fas fa-times';
    // Animate menu items
    document.querySelectorAll('.nav-link').forEach((link, index) => {
      link.style.animationDelay = `${index * 0.1}s`;
      link.classList.add('slide-in');
    });
  } else {
    icon.className = 'fas fa-bars';
    // Remove animation classes
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('slide-in');
    });
  }

  // Add button animation
  menuToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    menuToggle.style.transform = 'scale(1)';
  }, 150);
}

function closeMobileMenu() {
  navMenu.classList.remove('active');
  menuToggle.querySelector('i').className = 'fas fa-bars';

  // Remove animation classes
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('slide-in');
  });
}

// Navigation and Scrolling
function handleScroll() {
  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
}

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Add button animation
  backToTopBtn.style.transform = 'scale(0.9)';
  setTimeout(() => {
    backToTopBtn.style.transform = 'scale(1)';
  }, 150);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');

          // Add animation to active link
          link.style.transform = 'translateY(-3px)';
          setTimeout(() => {
            link.style.transform = '';
          }, 300);
        }
      });
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        closeMobileMenu();

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });

        // Add click animation to link
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      }
    });
  });
}

// Skills Animation
function animateSkillBars() {
  skillProgressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight - 50) && (rect.bottom >= 0);

    if (isVisible && !bar.classList.contains('animated')) {
      const width = bar.getAttribute('data-width') + '%';

      // Animate with delay based on position
      const delay = Array.from(skillProgressBars).indexOf(bar) * 100;

      setTimeout(() => {
        bar.style.width = width;
        bar.classList.add('animated');

        // Add completion animation
        bar.style.transform = 'scaleX(1)';
      }, delay);
    }
  });
}

// Typewriter Effect
function initTypewriter() {
  const texts = [
    "Web Developer🌐",
    "Problem Solver❓",
    "Tech Enthusiast🖥️"
  ];

  let speed = 100;
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeWriter() {
    if (isPaused) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
      // Deleting text
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      speed = 50;
    } else {
      // Writing text
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      speed = 100;
    }

    // If text is fully written
    if (!isDeleting && charIndex === currentText.length) {
      isPaused = true;
      speed = 1500; // Pause at end

      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        typeWriter();
      }, speed);
      return;
    }
    // If text is fully deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex++;

      // Reset to first text if at end of array
      if (textIndex === texts.length) {
        textIndex = 0;
      }
    }

    setTimeout(typeWriter, speed);
  }

  // Start the typewriter effect after a delay
  setTimeout(typeWriter, 1000);
}

// Contact Form Handling
function handleFormSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Simulate API call with timeout
  setTimeout(() => {
    // Show success message
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

    // Reset form
    contactForm.reset();

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Add success animation to form
    contactForm.classList.add('success');
    setTimeout(() => {
      contactForm.classList.remove('success');
    }, 2000);

  }, 2000);
}

// Form Input Animations
function initFormAnimations() {
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

  formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', function () {
      this.parentElement.classList.add('focused');
      this.style.transform = 'translateY(-2px)';
    });

    // Remove focus animation
    input.addEventListener('blur', function () {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
      this.style.transform = '';
    });

    // Add value check on input
    input.addEventListener('input', function () {
      if (this.value) {
        this.parentElement.classList.add('has-value');
      } else {
        this.parentElement.classList.remove('has-value');
      }
    });
  });
}

// Scroll Animations for Elements
function initScrollAnimations() {
  // Create Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Add staggered animation for child elements
        const children = entry.target.querySelectorAll('.fade-in-child');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('visible');
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Observe individual elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
}

// Particle System
function initParticles() {
  const container = document.createElement('div');
  container.className = 'particles';
  document.body.appendChild(container);

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }

  // Animate particles
  animateParticles();
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Random properties
  const size = Math.random() * 4 + 2;
  const posX = Math.random() * 100;
  const delay = Math.random() * 20;
  const duration = Math.random() * 10 + 15;
  const color = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)';

  // Apply properties
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}%`;
  particle.style.background = color;
  particle.style.animationDelay = `${delay}s`;
  particle.style.animationDuration = `${duration}s`;

  container.appendChild(particle);
  particles.push(particle);
}

function animateParticles() {
  particles.forEach(particle => {
    // Random movement
    const currentLeft = parseFloat(particle.style.left);
    const newLeft = currentLeft + (Math.random() * 2 - 1);

    // Keep within bounds
    if (newLeft >= 0 && newLeft <= 100) {
      particle.style.left = `${newLeft}%`;
    }
  });

  requestAnimationFrame(animateParticles);
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    <span>${message}</span>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;

  // Add to document
  document.body.appendChild(notification);

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Close button event
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Add CSS for notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card-bg);
    border-left: 4px solid var(--primary-color);
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: var(--shadow-hover);
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 9999;
    transform: translateX(120%);
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    max-width: 350px;
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
  }
  
  .notification.show {
    transform: translateX(0);
  }
  
  .notification.success {
    border-left-color: #4ade80;
  }
  
  .notification i {
    font-size: 1.5rem;
  }
  
  .notification.success i {
    color: #4ade80;
  }
  
  .notification span {
    flex: 1;
    color: var(--text-color);
    font-weight: 500;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: var(--text-light);
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: var(--transition);
  }
  
  .notification-close:hover {
    color: var(--accent-color);
    background: rgba(247, 37, 133, 0.1);
  }
`;
document.head.appendChild(notificationStyles);

// Hover Effects for Cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.project-card, .stat-card, .skill-category');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = 'var(--shadow-hover)';
    });
 
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
}

// Initialize card hover effects
setTimeout(initCardHoverEffects, 1000);

// Handle Window Resize
function handleResize() {
  // Update particle count based on screen size
  const newParticleCount = Math.min(30, Math.floor(window.innerWidth / 20));

  if (newParticleCount !== particleCount) {
    particleCount = newParticleCount;

    // Remove existing particles
    const particleContainer = document.querySelector('.particles');
    if (particleContainer) {
      particleContainer.remove();
      particles = [];
    }

    // Recreate particles
    initParticles();
  }

  // Close mobile menu if open and screen is large
  if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
    closeMobileMenu();
  }
}

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  .theme-changing {
    animation: themeChange 0.3s ease;
  }
  
  @keyframes themeChange {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  
  .slide-in {
    animation: slideIn 0.5s ease forwards;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .form-group.focused label {
    transform: translateY(-25px) scale(0.85);
    color: var(--primary-color);
  }
  
  .form-group.has-value label {
    transform: translateY(-25px) scale(0.85);
    color: var(--primary-color);
  }
  
  .success {
    animation: successPulse 2s ease;
  }
  
  @keyframes successPulse {
    0% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.4); }
    70% { box-shadow: 0 0 0 20px rgba(67, 97, 238, 0); }
    100% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0); }
  }
  
  .fade-in-child {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-in-child.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Button click animations */
  button:active {
    transform: scale(0.95);
  }
  
  /* Link hover animations */
  a {
    transition: all 0.3s ease;
  }
  
  a:hover {
    color: var(--primary-color);
  }
  
  /* Image hover effects */
  .profile-img:hover {
    filter: grayscale(0) contrast(1.2);
    transform: scale(1.02);
  }
  
  /* Social icon hover effects */
  .social-icon:hover i {
    animation: iconWobble 0.5s ease;
  }
  
  @keyframes iconWobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-15deg); }
    75% { transform: rotate(15deg); }
  }
  
  /* Skill bar animation */
  .skill-progress.animated {
    animation: skillBarFill 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
  }
  
  @keyframes skillBarFill {
    from { width: 0; }
    to { width: attr(data-width); }
  }
`;
document.head.appendChild(additionalStyles);

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);

  // Keep only last 10 keys
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  // Check if sequence matches
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    showNotification('🎮 Konami Code Activated! Enjoy the portfolio!', 'success');

    // Add fun animation to all cards
    document.querySelectorAll('.card').forEach(card => {
      card.style.animation = 'rainbow 2s linear infinite';
    });

    // Reset after 5 seconds
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        card.style.animation = '';
      });
    }, 5000);

    // Reset konami code
    konamiCode = [];
  }
});

// Add rainbow animation for konami code
const konamiStyles = document.createElement('style');
konamiStyles.textContent = `
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  
  .card[style*="animation: rainbow"] {
    background: linear-gradient(
      90deg,
      #ff0000,
      #ff8000,
      #ffff00,
      #80ff00,
      #00ff80,
      #00ffff,
      #0080ff,
      #0000ff,
      #8000ff,
      #ff00ff,
      #ff0080
    );
    background-size: 1000% 100%;
  }
`;
document.head.appendChild(konamiStyles);

// Initialize tooltips for icons
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');

  tooltipElements.forEach(element => {
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);

    // Position tooltip on hover
    element.addEventListener('mouseenter', (e) => {
      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 10}px`;
      tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
      tooltip.classList.add('visible');
    });

    element.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
}

// Initialize tooltips after a delay
setTimeout(initTooltips, 2000);

// Add tooltip styles
const tooltipStyles = document.createElement('style');
tooltipStyles.textContent = `
  .tooltip {
    position: fixed;
    background: var(--text-color);
    color: var(--bg-color);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transform: translateX(-50%) translateY(-80%);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 10000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: var(--text-color) transparent transparent transparent;
  }
  
  .tooltip.visible {
    opacity: 1;
    transform: translateX(-50%) translateY(-100%);
  }
`;
