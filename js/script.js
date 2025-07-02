document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scroll --- //
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

    // --- Timeline Highlighting with Animation --- //
    const now = new Date();
    const endOf2025 = new Date('2025-12-31T23:59:59');
    const startOf2026 = new Date('2026-01-01T00:00:00');
    const endOfJuly2026 = new Date('2026-07-31T23:59:59');
    const fall2026 = new Date('2026-09-01T00:00:00');

    const steps = [
        { el: document.getElementById('step-1'), date: endOf2025, active: now <= endOf2025 },
        { el: document.getElementById('step-2'), date: endOfJuly2026, active: now >= startOf2026 && now <= endOfJuly2026 },
        { el: document.getElementById('step-3'), date: fall2026, active: now >= fall2026 }
    ];

    steps.forEach((step, index) => {
        if (step.el && step.active) {
            setTimeout(() => {
                step.el.classList.add('active-step');
            }, index * 300);
        }
    });

    // --- Enhanced Form Validation and Feedback --- //
    const form = document.querySelector('.contact-form-container form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation feedback
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                const button = form.querySelector('button[type="submit"]');
                button.innerHTML = '✔ Wird gesendet...';
                button.disabled = true;
                
                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    form.reset();
                    button.innerHTML = 'Nachricht senden';
                    button.disabled = false;
                    
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.';
                    form.parentNode.insertBefore(successMessage, form);
                    
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => successMessage.remove(), 300);
                    }, 5000);
                }, 1500);
            }
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        
        if (isRequired && value === '') {
            setInputStatus(input, false, 'Dieses Feld ist erforderlich');
            return false;
        }
        
        if (input.type === 'email' && value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                setInputStatus(input, false, 'Bitte gib eine gültige E-Mail-Adresse ein');
                return false;
            }
        }
        
        setInputStatus(input, true);
        return true;
    }

    function setInputStatus(input, isValid, message = '') {
        const container = input.parentElement;
        const errorDiv = container.querySelector('.error-message') || document.createElement('div');
        
        if (!container.querySelector('.error-message')) {
            errorDiv.className = 'error-message';
            container.appendChild(errorDiv);
        }
        
        input.style.borderColor = isValid ? '#ddd' : '#dc2626';
        errorDiv.textContent = message;
        errorDiv.style.display = isValid ? 'none' : 'block';
    }

    // --- Enhanced Scroll Reveal Animation --- //
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el, i) => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 50;

            if (elementTop < windowHeight - elementVisible) {
                setTimeout(() => {
                    el.classList.add('active');
                    
                    // Add extra animations for child elements
                    const children = el.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.transform = 'translateY(0)';
                            child.style.opacity = '1';
                        }, index * 200);
                    });
                }, i * 100);
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load

});
