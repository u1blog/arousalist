/* =========================================================
   Storage
   ========================================================= */

const STORAGE_KEY = 'kdg_progress';

function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getExpData(id) {
  const p = getProgress();
  return p[id] || { tried: false, ratings: {}, notes: '', lastUpdated: null };
}

function saveExpData(id, updates) {
  const p = getProgress();
  p[id] = { ...getExpData(id), ...updates, lastUpdated: new Date().toISOString() };
  saveProgress(p);
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

/* =========================================================
   Progress stats
   ========================================================= */

function getStats() {
  const p = getProgress();
  let tried = 0, rated = 0;
  EXPERIENCES.forEach(e => {
    const d = p[e.id];
    if (!d) return;
    if (d.tried) tried++;
    if (d.ratings && Object.values(d.ratings).some(v => v)) rated++;
  });
  return { tried, rated, total: EXPERIENCES.length };
}

/* =========================================================
   Rating widget builder
   ========================================================= */

function buildRatingWidget(container, experienceId, ratingTypes) {
  const data = getExpData(experienceId);
  container.innerHTML = '';

  ratingTypes.forEach(type => {
    const group = document.createElement('div');
    group.className = 'rating-group';

    const labelEl = document.createElement('div');
    labelEl.className = 'rating-group-label';
    labelEl.textContent = RATING_LABELS[type];
    group.appendChild(labelEl);

    const btns = document.createElement('div');
    btns.className = 'rating-buttons';

    RATING_OPTIONS.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = `rating-btn rating-btn--${opt.value}`;
      btn.dataset.ratingType = type;
      btn.dataset.ratingValue = opt.value;
      btn.setAttribute('aria-label', `${RATING_LABELS[type]}: ${opt.label}`);
      btn.title = opt.label;

      const sym = document.createElement('span');
      sym.className = 'rating-symbol';
      sym.textContent = opt.symbol;

      const lbl = document.createElement('span');
      lbl.className = 'rating-label-text';
      lbl.textContent = opt.label;

      btn.appendChild(sym);
      btn.appendChild(lbl);

      if (data.ratings[type] === opt.value) {
        btn.classList.add('is-active');
      }

      btn.addEventListener('click', () => {
        const current = getExpData(experienceId).ratings[type];
        const newValue = (current === opt.value) ? null : opt.value;

        btns.querySelectorAll(`[data-rating-type="${type}"]`).forEach(b => b.classList.remove('is-active'));
        if (newValue) btn.classList.add('is-active');

        const ratings = { ...getExpData(experienceId).ratings, [type]: newValue };
        saveExpData(experienceId, { ratings });
        broadcastProgressUpdate();
      });

      btns.appendChild(btn);
    });

    group.appendChild(btns);
    container.appendChild(group);
  });
}

/* =========================================================
   Mini rating display (for cards)
   ========================================================= */

function buildMiniRating(experienceId, ratingTypes) {
  const data = getExpData(experienceId);
  const parts = [];

  ratingTypes.forEach(type => {
    const val = data.ratings && data.ratings[type];
    if (val) {
      const opt = RATING_OPTIONS.find(o => o.value === val);
      parts.push(`<span class="mini-rating mini-rating--${val}" title="${RATING_LABELS[type]}: ${opt.label}">
        <span class="mini-label">${RATING_LABELS[type]}</span>
        <span class="mini-symbol">${opt.symbol}</span>
      </span>`);
    }
  });

  return parts.join('');
}

/* =========================================================
   Experience page init
   ========================================================= */

function initExperiencePage() {
  const id = document.body.dataset.experienceId;
  if (!id) return;

  const exp = EXPERIENCES.find(e => e.id === id);
  if (!exp) return;

  const data = getExpData(id);

  // Rating widget
  const ratingContainer = document.getElementById('ratings-container');
  if (ratingContainer) {
    buildRatingWidget(ratingContainer, id, exp.ratingTypes);
  }

  // Tried checkbox
  const triedCheck = document.getElementById('tried-checkbox');
  if (triedCheck) {
    triedCheck.checked = data.tried;
    triedCheck.addEventListener('change', () => {
      saveExpData(id, { tried: triedCheck.checked });
      broadcastProgressUpdate();
    });
  }

  // Notes field
  const notesField = document.getElementById('notes-field');
  if (notesField) {
    notesField.value = data.notes || '';
    let debounce;
    notesField.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        saveExpData(id, { notes: notesField.value });
      }, 500);
      autoGrow(notesField);
    });
    autoGrow(notesField);
  }

  // Navigation
  const idx = EXPERIENCES.findIndex(e => e.id === id);
  const prevLink = document.getElementById('nav-prev');
  const nextLink = document.getElementById('nav-next');

  if (prevLink) {
    if (idx > 0) {
      const prev = EXPERIENCES[idx - 1];
      prevLink.href = `${prev.id}.html`;
      prevLink.querySelector('.nav-exp-title').textContent = prev.title;
    } else {
      prevLink.style.visibility = 'hidden';
    }
  }

  if (nextLink) {
    if (idx < EXPERIENCES.length - 1) {
      const next = EXPERIENCES[idx + 1];
      nextLink.href = `${next.id}.html`;
      nextLink.querySelector('.nav-exp-title').textContent = next.title;
    } else {
      nextLink.style.visibility = 'hidden';
    }
  }

  // Update header stats
  updateHeaderStats();
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

/* =========================================================
   Browse page init
   ========================================================= */

function initBrowsePage() {
  const grid = document.getElementById('experience-grid');
  if (!grid) return;

  let filters = { tier: 'all', status: 'all', category: 'all' };

  function renderProgress() {
    const stats = getStats();
    const triedBar = document.getElementById('progress-tried-bar');
    const triedCount = document.getElementById('progress-tried-count');
    const ratedCount = document.getElementById('progress-rated-count');

    if (triedBar) triedBar.style.width = `${(stats.tried / stats.total) * 100}%`;
    if (triedCount) triedCount.textContent = `${stats.tried} of ${stats.total} tried`;
    if (ratedCount) ratedCount.textContent = `${stats.rated} rated`;
  }

  function matchesFilters(exp) {
    const data = getExpData(exp.id);

    if (filters.tier !== 'all' && exp.tier !== filters.tier) return false;

    if (filters.status === 'tried' && !data.tried) return false;
    if (filters.status === 'not-tried' && data.tried) return false;
    if (filters.status === 'rated') {
      const hasRating = data.ratings && Object.values(data.ratings).some(v => v);
      if (!hasRating) return false;
    }

    if (filters.category !== 'all' && exp.category !== filters.category) return false;

    return true;
  }

  function renderCards() {
    const visible = EXPERIENCES.filter(matchesFilters);
    grid.innerHTML = '';

    if (visible.length === 0) {
      grid.innerHTML = '<div class="no-results"><p>No experiences match the current filters.</p></div>';
      return;
    }

    visible.forEach(exp => {
      const data = getExpData(exp.id);
      const tier = TIER_INFO[exp.tier];
      const cat = CATEGORY_INFO[exp.category];
      const hasRating = data.ratings && Object.values(data.ratings).some(v => v);
      const miniRatings = buildMiniRating(exp.id, exp.ratingTypes);
      const numStr = String(exp.number).padStart(2, '0');

      const card = document.createElement('a');
      card.href = `${exp.id}.html`;
      card.className = `exp-card${data.tried ? ' is-tried' : ''}`;
      card.setAttribute('aria-label', exp.title);

      card.innerHTML = `
        <div class="card-header">
          <span class="card-number">${numStr}</span>
          <div class="card-badges">
            <span class="tier-badge tier-badge--${exp.tier}" title="${tier.hint}">${tier.icon} ${tier.label}</span>
            <span class="cat-badge cat-badge--${exp.category}">${cat.label}</span>
          </div>
          ${data.tried ? '<span class="tried-indicator" title="Tried">✓</span>' : ''}
        </div>
        <h2 class="card-title">${exp.title}</h2>
        <p class="card-description">${exp.description}</p>
        <div class="card-status">
          ${miniRatings || '<span class="card-status-empty">Not yet rated</span>'}
        </div>
      `;

      grid.appendChild(card);
    });
  }

  function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.filterGroup;
        const val = btn.dataset.filterValue;

        document.querySelectorAll(`[data-filter-group="${group}"]`).forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        filters[group] = val;
        renderCards();
      });
    });
  }

  renderProgress();
  renderCards();
  setupFilters();
  updateHeaderStats();
}

/* =========================================================
   Header stats (shown on all pages)
   ========================================================= */

function updateHeaderStats() {
  const stats = getStats();
  document.querySelectorAll('.header-progress').forEach(el => {
    el.textContent = `${stats.tried}/${stats.total} tried`;
  });
}

/* =========================================================
   Reset data
   ========================================================= */

function setupReset() {
  const btn = document.getElementById('reset-btn');
  const confirm = document.getElementById('reset-confirm');
  const cancelBtn = document.getElementById('reset-cancel');
  const confirmBtn = document.getElementById('reset-confirm-btn');

  if (!btn) return;

  btn.addEventListener('click', () => {
    confirm.hidden = false;
    btn.hidden = true;
  });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      confirm.hidden = true;
      btn.hidden = false;
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      clearProgress();
      window.location.reload();
    });
  }
}

/* =========================================================
   Cross-page progress events
   ========================================================= */

function broadcastProgressUpdate() {
  updateHeaderStats();
}

/* =========================================================
   Boot
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initExperiencePage();
  initBrowsePage();
  setupReset();
});
