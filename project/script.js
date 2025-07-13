// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.getElementById('modalBody');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars when they come into view
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observeSkills.observe(skillsSection);
}

// Project data
const projectData = {
    1: {
        title: "E-commerce Platform",
        description: "A comprehensive e-commerce solution built with WordPress and WooCommerce, featuring advanced product filtering, custom payment gateway integration, and inventory management system.",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["WordPress", "WooCommerce", "JavaScript", "PHP", "MySQL"],
        features: [
            "Custom WooCommerce theme development",
            "Advanced product filtering and search",
            "Multiple payment gateway integration",
            "Inventory management system",
            "Customer review and rating system",
            "Mobile-responsive design"
        ],
        challenges: "Integrating multiple payment gateways while maintaining security standards and optimizing for high traffic loads.",
        outcome: "Increased client's online sales by 150% and improved user engagement by 40%."
    },
    2: {
        title: "Corporate Website",
        description: "A professional corporate website with custom WordPress theme, advanced CMS features, and seamless content management capabilities for a multinational company.",
        image: "https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["WordPress", "Custom Theme", "PHP", "JavaScript", "CSS3"],
        features: [
            "Custom WordPress theme from scratch",
            "Multi-language support",
            "Advanced custom post types",
            "SEO optimization",
            "Contact form integration",
            "Blog and news section"
        ],
        challenges: "Creating a scalable architecture that could handle multiple languages and complex content hierarchies.",
        outcome: "Improved website loading speed by 60% and enhanced user experience leading to increased lead generation."
    },
    3: {
        title: "Blog Platform",
        description: "Modern blogging platform with social sharing, advanced comment system, and REST API integration for seamless content distribution across multiple channels.",
        image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["WordPress", "React", "REST API", "JavaScript", "PHP"],
        features: [
            "Custom React-based frontend",
            "WordPress REST API integration",
            "Social media sharing",
            "Advanced comment system",
            "Author profiles and bio pages",
            "Newsletter subscription"
        ],
        challenges: "Building a headless WordPress solution with React while maintaining SEO capabilities.",
        outcome: "Created a lightning-fast blog platform that improved page load times by 70% and increased user engagement."
    },
    4: {
        title: "Portfolio Website",
        description: "Creative portfolio website with smooth animations, interactive elements, and modern design principles to showcase creative work and professional achievements.",
        image: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "WebGL"],
        features: [
            "Interactive animations with GSAP",
            "WebGL-powered visual effects",
            "Responsive grid layout",
            "Image gallery with lightbox",
            "Contact form with validation",
            "Dark/light theme toggle"
        ],
        challenges: "Balancing visual appeal with performance optimization and ensuring smooth animations across all devices.",
        outcome: "Delivered a stunning portfolio that helped the client secure 3 major projects within the first month."
    }
};

// Project modal functionality
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            showProjectModal(project);
        }
    });
});

function showProjectModal(project) {
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <div class="modal-project-details">
                <h2 class="modal-project-title">${project.title}</h2>
                <p class="modal-project-description">${project.description}</p>
                
                <div class="modal-section">
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul class="modal-features-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>Challenges</h3>
                    <p>${project.challenges}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Outcome</h3>
                    <p>${project.outcome}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: '#ffffff',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        minWidth: '300px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observeElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Add animation styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .about-stats .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observeElements.observe(el);
    });
});

// Add additional styles for modal content
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .project-modal-content {
        display: grid;
        gap: 2rem;
    }
    
    .modal-project-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 12px;
    }
    
    .modal-project-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #ffffff;
    }
    
    .modal-project-description {
        font-size: 1.1rem;
        color: #cccccc;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .modal-section {
        margin-bottom: 2rem;
    }
    
    .modal-section h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: #00d4ff;
        margin-bottom: 1rem;
    }
    
    .modal-tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .modal-features-list {
        list-style: none;
        padding: 0;
    }
    
    .modal-features-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #cccccc;
    }
    
    .modal-features-list li:before {
        content: "✓";
        color: #00d4ff;
        font-weight: bold;
        margin-right: 0.5rem;
    }
    
    .modal-section p {
        color: #cccccc;
        line-height: 1.6;
    }
    
    @media (max-width: 768px) {
        .modal-project-title {
            font-size: 1.5rem;
        }
        
        .modal-project-image {
            height: 200px;
        }
    }
`;
document.head.appendChild(modalStyles);