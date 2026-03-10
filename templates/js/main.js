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

  // --- Feature 2: Category filters (archive page) ---
  // Article content comes from our own blog-publish.py (trusted source).
  // All dynamic values are escaped via escapeHtml() before insertion.

  const archive = document.getElementById('article-archive');
  const pills = document.querySelectorAll('.category-pill');

  if (archive && pills.length > 0) {
    fetch('/articles/index.json')
      .then((res) => res.json())
      .then((articles) => {
        window._articles = articles;
        renderArticles(articles);

        pills.forEach((pill) => {
          pill.addEventListener('click', () => {
            pills.forEach((p) => p.classList.remove('active'));
            pill.classList.add('active');

            const category = pill.dataset.category;
            if (category === 'all') {
              renderArticles(window._articles);
            } else {
              renderArticles(
                window._articles.filter(
                  (a) => slugifyCategory(a.category) === category
                )
              );
            }
          });
        });
      })
      .catch(() => {
        archive.textContent = 'Unable to load articles. Please try again later.';
      });
  }

  function renderArticles(articles) {
    while (archive.firstChild) archive.removeChild(archive.firstChild);
    articles.forEach((article) => {
      const readTime = estimateReadTime(article.excerpt || '');

      const div = document.createElement('div');
      div.className = 'article-item';

      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = article.title;
      div.appendChild(link);

      const meta = document.createElement('div');
      meta.className = 'article-meta';
      meta.textContent = `${article.date} \u00b7 ${readTime} min read \u00b7 ${article.category}`;
      div.appendChild(meta);

      const excerpt = document.createElement('p');
      excerpt.textContent = article.excerpt;
      div.appendChild(excerpt);

      archive.appendChild(div);
    });
  }

  // --- Feature 3: Nav active state ---

  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
