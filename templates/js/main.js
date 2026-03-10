// The Talk Therapy - Minimal Editorial JS
// Three features: newsletter form, category filters, nav active state

// --- Toast helper ---

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Utility helpers ---

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

function estimateReadTime(text) {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

// --- Feature 1: Newsletter form handler ---

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const btn = form.querySelector('.btn-subscribe');
      const email = input?.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Subscribing...';

      // Placeholder — replace with real endpoint when newsletter is wired
      setTimeout(() => {
        showToast('Thank you for subscribing!', 'success');
        input.value = '';
        btn.disabled = false;
        btn.textContent = 'Subscribe';
      }, 1200);
    });
  }

  // --- Feature 2: Load articles from index.json ---
  // Used on both homepage (featured + recent) and archive page (full list)
  // Article content comes from our own blog-publish.py (trusted source).

  const featured = document.getElementById('featured');
  const recentGrid = document.getElementById('recent-articles');
  const archive = document.getElementById('article-archive');
  const pills = document.querySelectorAll('.category-pill');

  if (featured || recentGrid || archive) {
    fetch('/articles/index.json')
      .then((res) => res.ok ? res.json() : [])
      .then((articles) => {
        window._articles = articles;

        // Homepage: populate featured + recent
        if (featured && articles.length > 0) {
          const a = articles[0];
          const date = formatDate(a.date);
          featured.innerHTML = `
            <div class="featured-label">Featured</div>
            <h1 class="featured-title"><a href="/articles/${escapeHtml(a.slug)}.html">${escapeHtml(a.title)}</a></h1>
            <p class="featured-excerpt">${escapeHtml(a.description || '')}</p>
            <div class="featured-meta">${escapeHtml(a.category || 'Essay')} &middot; ${a.readTime || 2} min read</div>
          `;
        }

        if (recentGrid && articles.length > 1) {
          recentGrid.innerHTML = articles.slice(1, 5).map((a) => `
            <div class="article-item">
              <h2 class="article-item-title"><a href="/articles/${escapeHtml(a.slug)}.html">${escapeHtml(a.title)}</a></h2>
              <div class="article-item-meta">${escapeHtml(a.category || 'Essay')} &middot; ${a.readTime || 2} min read &middot; ${formatDate(a.date)}</div>
            </div>
          `).join('');
        }

        // Archive page: full list with category filters
        if (archive) {
          renderArchive(articles);

          pills.forEach((pill) => {
            pill.addEventListener('click', () => {
              pills.forEach((p) => p.classList.remove('active'));
              pill.classList.add('active');
              const cat = pill.dataset.category;
              renderArchive(cat === 'all' ? window._articles : window._articles.filter(
                (a) => slugifyCategory(a.category || '') === cat
              ));
            });
          });
        }
      })
      .catch(() => {
        if (featured) featured.innerHTML = '<p style="color:var(--color-text-muted);">No articles yet.</p>';
        if (archive) archive.textContent = 'Unable to load articles.';
      });
  }

  function renderArchive(articles) {
    if (!archive) return;
    if (!articles.length) {
      archive.innerHTML = '<p style="color:var(--color-text-muted);">No articles found.</p>';
      return;
    }
    archive.innerHTML = articles.map((a) => `
      <div class="article-item" data-category="${slugifyCategory(a.category || '')}">
        <h2 class="article-item-title"><a href="/articles/${escapeHtml(a.slug)}.html">${escapeHtml(a.title)}</a></h2>
        <div class="article-item-meta">${escapeHtml(a.category || 'Essay')} &middot; ${a.readTime || 2} min read &middot; ${formatDate(a.date)}</div>
        ${a.description ? `<p class="article-item-excerpt">${escapeHtml(a.description)}</p>` : ''}
      </div>
    `).join('');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // --- Feature 3: Nav active state ---

  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
