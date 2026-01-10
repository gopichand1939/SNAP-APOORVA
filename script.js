// Chatbot Toggle
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
}

// Modal Functions
function openModal() {
    const modal = document.getElementById('cautionModal');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('cautionModal');
    modal.classList.remove('active');
}

// Open modal when caution notice is clicked
document.addEventListener('DOMContentLoaded', function() {
    const cautionBtn = document.querySelector('.caution-notice-btn');
    if (cautionBtn) {
        cautionBtn.addEventListener('click', openModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('cautionModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.institute-card, .excellence-item, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Chatbot functionality (basic)
    const chatbotBody = document.querySelector('.chatbot-body');
    if (chatbotBody) {
        // Add input field and send button
        const chatInput = document.createElement('div');
        chatInput.className = 'chat-input-container';
        chatInput.innerHTML = `
            <div class="chat-input-wrapper">
                <input type="text" id="chatInput" placeholder="Type your message..." class="chat-input">
                <button onclick="sendMessage()" class="chat-send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        chatbotBody.appendChild(chatInput);
    }
});

// Send message function
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        const chatbotBody = document.querySelector('.chatbot-body');
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user-message';
        userMessage.textContent = message;
        chatbotBody.insertBefore(userMessage, chatbotBody.lastElementChild);
        
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = document.createElement('div');
            botResponse.className = 'chat-message bot-message';
            botResponse.textContent = 'Thank you for your message. Our team will get back to you soon. For immediate assistance, please call 9071011959 or email info@snaptest.org';
            chatbotBody.insertBefore(botResponse, chatbotBody.lastElementChild);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 1000);
    }
}

// Allow Enter key to send message
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('chatInput') === document.activeElement) {
        sendMessage();
    }
});

// Navbar scroll effect - fixed to prevent overlapping
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100 && window.innerWidth > 768) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    body.appendChild(overlay);
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Close menu when clicking a link (mobile)
    if (window.innerWidth <= 768) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (!this.parentElement.classList.contains('dropdown')) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Dropdown menu mobile handling
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                const isActive = menu.classList.contains('active');
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.classList.remove('active');
                });
                // Toggle current dropdown
                if (!isActive) {
                    menu.classList.add('active');
                }
            }
        }
    });
});

