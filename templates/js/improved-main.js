// The Talk Therapy - Improved JavaScript
// Enhanced for performance, accessibility, and maintainability

(function() {
  'use strict';
    
  // Configuration
  const CONFIG = {
    debounceDelay: 150,
    throttleDelay: 200,
    lazyLoadThreshold: 0.1,
    toastDuration: 5000,
    focusTrapClass: 'focus-trap',
  };
    
  // State management
  const state = {
    isMenuOpen: false,
    currentToast: null,
    observers: new Map(),
    eventListeners: new Map(),
  };
    
  // DOM Ready with fallback
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
    
  function init() {
    try {
      setupAccessibility();
      setupNavigation();
      setupForms();
      setupLazyLoading();
      setupSmoothScrolling();
      setupCardInteractions();
      setupPerformanceMonitoring();
            
      // Clean up on page unload
      window.addEventListener('beforeunload', cleanup);
            
      console.log('The Talk Therapy - Enhanced JavaScript initialized');
    } catch (error) {
      console.error('Initialization error:', error);
      // Fallback to basic functionality
      setupBasicNavigation();
    }
  }
    
  // ===== Accessibility Setup =====
  function setupAccessibility() {
    // Add skip to content link if not present
    if (!document.querySelector('.skip-to-content')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-to-content';
      skipLink.textContent = 'Skip to main content';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
        
    // Ensure all interactive elements have proper labels
    document.querySelectorAll('button:not([aria-label]), [role="button"]:not([aria-label])').forEach((button) => {
      if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });
        
    // Add aria-current to current page in navigation
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach((link) => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || 
                (currentPath.includes(linkPath) && linkPath !== '/')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }
    
  // ===== Navigation - Enhanced =====
  function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
        
    if (!menuToggle || !navMenu) return;
        
    // Set initial ARIA attributes
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'nav-menu');
    navMenu.setAttribute('id', 'nav-menu');
        
    // Toggle menu function
    const toggleMenu = (expanded) => {
      const isExpanded = expanded !== undefined ? expanded : !state.isMenuOpen;
      state.isMenuOpen = isExpanded;
            
      menuToggle.setAttribute('aria-expanded', isExpanded.toString());
      navMenu.classList.toggle('active', isExpanded);
      menuToggle.classList.toggle('active', isExpanded);
            
      // Trap focus when menu is open
      if (isExpanded) {
        trapFocus(navMenu);
      } else {
        releaseFocus();
      }
            
      // Announce state change to screen readers
      announceToScreenReader(isExpanded ? 'Menu opened' : 'Menu closed');
    };
        
    // Toggle on button click
    addEventListener(menuToggle, 'click', () => toggleMenu());
        
    // Close on escape key
    addEventListener(document, 'keydown', (e) => {
      if (e.key === 'Escape' && state.isMenuOpen) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });
        
    // Close when clicking outside
    addEventListener(document, 'click', (e) => {
      if (state.isMenuOpen && 
                !menuToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
        toggleMenu(false);
      }
    });
        
    // Close when clicking a link (with debounce)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      addEventListener(link, 'click', debounce(() => {
        if (state.isMenuOpen) {
          toggleMenu(false);
        }
      }, CONFIG.debounceDelay));
    });
  }
    
  // ===== Forms - Enhanced =====
  function setupForms() {
    const forms = document.querySelectorAll('form[data-validate]');
        
    forms.forEach((form) => {
      // Add live region for form announcements
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      form.appendChild(liveRegion);
            
      // Enhanced validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach((input) => {
        // Add ARIA attributes
        if (!input.id) {
          input.id = `input-${Math.random().toString(36).substr(2, 9)}`;
        }
                
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label && !input.getAttribute('aria-labelledby')) {
          if (!label.id) {
            label.id = `label-${input.id}`; 
          } input.setAttribute('aria-labelledby', label.id);
        }
                
        // Real-time validation
        addEventListener(input, 'input', debounce(() => {
          validateInput(input);
        }, CONFIG.debounceDelay));
                
        addEventListener(input, 'blur', () => {
          validateInput(input);
        });
      });
            
      // Form submission
      addEventListener(form, 'submit', async (e) => {
        e.preventDefault();
                
        if (!validateForm(form)) {
          announceToScreenReader('Please fix the errors in the form');
          return;
        }
                
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
                
        // Disable and show loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
          submitBtn.setAttribute('aria-busy', 'true');
        }
                
        try {
          // Simulate API call
          await submitForm(form);
                    
          // Success
          showToast('Thank you for your submission!', 'success');
          form.reset();
          announceToScreenReader('Form submitted successfully');
        } catch (error) {
          // Error
          showToast('There was an error submitting the form. Please try again.', 'error');
          console.error('Form submission error:', error);
          announceToScreenReader('Form submission failed');
        } finally {
          // Reset button state
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.setAttribute('aria-busy', 'false');
          }
        }
      });
    });
  }
    
  // ===== Lazy Loading - Enhanced =====
  function setupLazyLoading() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      document.querySelectorAll('img[data-src]').forEach((img) => {
        img.src = img.dataset.src;
      });
      return;
    }
        
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
                    
          // Load image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
                    
          // Load background images
          if (img.dataset.bg) {
            img.style.backgroundImage = `url(${img.dataset.bg})`;
            img.removeAttribute('data-bg');
          }
                    
          // Add loaded class for transitions
          img.classList.add('loaded');
                    
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: `${CONFIG.lazyLoadThreshold * 100}%`,
      threshold: 0.1,
    });
        
    // Observe images
    document.querySelectorAll('img[data-src], [data-bg]').forEach((element) => {
      imageObserver.observe(element);
    });
        
    // Store observer for cleanup
    state.observers.set('images', imageObserver);
  }
    
  // ===== Smooth Scrolling - Enhanced =====
  function setupSmoothScrolling() {
    addEventListener(document, 'click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link || link.hash === '#') return;
            
      e.preventDefault();
      const targetId = link.hash;
      const targetElement = document.querySelector(targetId);
            
      if (targetElement) {
        // Update URL without scrolling
        history.pushState(null, null, targetId);
                
        // Scroll to element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
                
        // Focus the target for accessibility
        setTimeout(() => {
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          targetElement.removeAttribute('tabindex');
        }, 1000);
      }
    });
  }
    
  // ===== Card Interactions =====
  function setupCardInteractions() {
    const cards = document.querySelectorAll('.card[data-interactive]');
        
    cards.forEach((card) => {
      // Make entire card clickable if it has a link
      const link = card.querySelector('a[href]');
      if (link && !card.hasAttribute('role')) {
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Go to ${link.textContent.trim()}`);
                
        addEventListener(card, 'click', (e) => {
          if (e.target.tagName !== 'A' && !e.target.closest('a')) {
            link.click();
          }
        });
                
        addEventListener(card, 'keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
          }
        });
      }
            
      // Hover effects with performance optimization
      let hoverTimeout;
      addEventListener(card, 'mouseenter', () => {
        clearTimeout(hoverTimeout);
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
            
      addEventListener(card, 'mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          card.style.transition = '';
        }, 300);
      });
    });
  }
    
  // ===== Performance Monitoring =====
  function setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor largest contentful paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
            
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      state.observers.set('lcp', lcpObserver);
            
      // Monitor layout shifts
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        });
      });
            
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      state.observers.set('cls', clsObserver);
    }
  }
    
  // ===== Utility Functions =====
  function validateInput(input) {
    const isValid = input.checkValidity();
    const errorElement = document.getElementById(`${input.id}-error`) || 
                           createErrorElement(input);
        
    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
      errorElement.textContent = input.validationMessage;
      errorElement.classList.remove('hidden');
    } else {
      input.setAttribute('aria-invalid', 'false');
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
    }
        
    return isValid;
  }
    
  function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
        
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
        
    return isValid;
  }
    
  function createErrorElement(input) {
    const errorElement = document.createElement('div');
    errorElement.id = `${input.id}-error`;
    errorElement.className = 'error-message';
    errorElement.setAttribute('aria-live', 'polite');
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    return errorElement;
  }
    
  async function submitForm(form) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for simulation
        Math.random() > 0.1 ? resolve() : reject(new Error('Network error'));
      }, 1500);
    });
  }
    
  function showToast(message, type = 'info') {
    // Remove existing toast
    if (state.currentToast) {
      state.currentToast.remove();
    }
        
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.textContent = message;
        
    // Style
    toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: ${type === 'success' ? '#C8D8C8' : 
    type === 'error' ? '#FFD8C8' : '#E8E0D8'};
            color: #333;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;
        
    document.body.appendChild(toast);
    state.currentToast = toast;
        
    // Auto-remove
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }
    }, CONFIG.toastDuration);
        
    // Add CSS for animations if not present
    if (!document.querySelector('#toast-animations')) {
      const style = document.createElement('style');
      style.id = 'toast-animations';
      style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
                
                .error-message {
                    color: #F44336;
                    font-size: 0.875rem;
                    margin-top: 4px;
                }
                
                .error-message.hidden {
                    display: none;
                }
            `;
      document.head.appendChild(style);
    }
  }
    
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
        
    if (focusableElements.length === 0) return;
        
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
        
    element.addEventListener('keydown', trapFocusHandler);
        
    function trapFocusHandler(e) {
      if (e.key !== 'Tab') return;
            
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
        
    // Store handler for cleanup
    state.eventListeners.set('trapFocus', trapFocusHandler);
  }
    
  function releaseFocus() {
    const handler = state.eventListeners.get('trapFocus');
    if (handler) {
      document.removeEventListener('keydown', handler);
      state.eventListeners.delete('trapFocus');
    }
  }
    
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
        
    document.body.appendChild(announcement);
        
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }
    
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }


  function cleanup() {
    // Remove event listeners on page unload
  }

  function setupBasicNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
      });
    }
  }

  init();
})();
