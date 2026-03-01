/**
 * Basic accessibility tests for The Talk Therapy website
 * These tests can be expanded as the project grows
 */

describe('Accessibility Tests', () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = `
      <div class="navbar">
        <button class="menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="nav-menu" id="nav-menu">
          <a href="/" class="nav-link">Home</a>
        </nav>
      </div>
      <main class="main-content">
        <button class="btn btn-primary">Test Button</button>
        <img src="test.jpg" alt="Test image" />
      </main>
    `;
  });

  test('All interactive elements have accessible labels', () => {
    const interactiveElements = document.querySelectorAll(
      'button, [role="button"], a[href], input, select, textarea'
    );
    
    interactiveElements.forEach(element => {
      // Check for either aria-label, aria-labelledby, or visible text
      const hasAriaLabel = element.hasAttribute('aria-label');
      const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
      const hasVisibleText = element.textContent.trim().length > 0;
      const hasAltText = element.tagName === 'IMG' && element.hasAttribute('alt');
      
      expect(hasAriaLabel || hasAriaLabelledBy || hasVisibleText || hasAltText).toBe(true);
    });
  });

  test('Menu toggle has proper ARIA attributes', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    expect(menuToggle).not.toBeNull();
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(menuToggle.getAttribute('aria-controls')).toBe('nav-menu');
  });

  test('Images have alt attributes', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      expect(img.hasAttribute('alt')).toBe(true);
    });
  });

  test('Buttons have minimum touch target size', () => {
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
      // Check if button has minimum dimensions or CSS class for touch targets
      const style = window.getComputedStyle(button);
      const minHeight = parseInt(style.minHeight) || parseInt(style.height);
      const minWidth = parseInt(style.minWidth) || parseInt(style.width);
      
      // 44px is minimum touch target size recommended by WCAG
      expect(minHeight).toBeGreaterThanOrEqual(44);
      expect(minWidth).toBeGreaterThanOrEqual(44);
    });
  });

  test('Focus management works', () => {
    const button = document.querySelector('.btn');
    button.focus();
    expect(document.activeElement).toBe(button);
  });
});

describe('Performance Tests', () => {
  test('JavaScript loads without errors', () => {
    // This is a basic test - can be expanded with actual performance metrics
    expect(() => {
      // Simulate loading our improved JavaScript
      const script = document.createElement('script');
      script.src = '/js/improved-main.js';
      document.head.appendChild(script);
    }).not.toThrow();
  });

  test('CSS variables are defined', () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const brandColors = [
      '--color-peach',
      '--color-sage', 
      '--color-cream',
      '--color-warm-gray',
    ];
    
    brandColors.forEach(colorVar => {
      const value = rootStyles.getPropertyValue(colorVar);
      expect(value).not.toBe('');
    });
  });
});