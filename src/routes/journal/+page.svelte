<script>
  import { base } from '$app/paths';
  import { progress } from '$lib/stores.js';
  import { EXPERIENCES } from '$lib/data.js';

  const TIER_LABELS = {
    'solo':                  'Solo',
    'solo-or-partnered':     'Solo or partnered',
    'better-with-partner':   'Better with a partner',
    'partner-only':          'Partner only',
  };

  const RATING_ORDER    = { 'yes-plus': 3, 'yes': 2, 'curious': 1, 'no': 0 };
  const RATING_PRIORITY = { 'yes-plus': 0, 'yes': 1, 'curious': 2, 'no': 3 };
  const RATING_SYMBOLS  = { 'yes-plus': '🔥', 'yes': '✅', 'curious': '?', 'no': '🙅' };
  const RATING_LABELS_MAP = {
    'yes-plus': 'Yes — I really liked this',
    'yes':      'Yes — I liked this',
    'curious':  'Curious — would try again',
    'no':       'Not for me',
  };

  function bestRating(id) {
    const ratings = $progress[id]?.ratings ?? {};
    const values = Object.values(ratings).filter(Boolean);
    if (!values.length) return null;
    return values.reduce((best, r) =>
      (RATING_ORDER[r] ?? -1) > (RATING_ORDER[best] ?? -1) ? r : best
    );
  }

  // --- Tiny dot grid ---
  const COLS = 13;
  const CELL = 6;
  const DOT_R = 2.2;
  const SVG_W = COLS * CELL;                                    // 78
  const SVG_H = Math.ceil(EXPERIENCES.length / COLS) * CELL;   // 60

  let gridDots = $derived(
    [...EXPERIENCES]
      .sort((a, b) => {
        const aT = $progress[a.id]?.tried;
        const bT = $progress[b.id]?.tried;
        if (aT && !bT) return -1;
        if (!aT && bT) return 1;
        if (!aT && !bT) return 0;
        const aR = RATING_PRIORITY[bestRating(a.id)] ?? 4;
        const bR = RATING_PRIORITY[bestRating(b.id)] ?? 4;
        return aR - bR;
      })
      .map((e, i) => ({
        id: e.id,
        x: (i % COLS) * CELL + CELL / 2,
        y: Math.floor(i / COLS) * CELL + CELL / 2,
      }))
  );

  // --- Stats ---
  let tried = $derived(EXPERIENCES.filter(e => $progress[e.id]?.tried));
  let triedCount = $derived(tried.length);
  let totalCount = $derived(EXPERIENCES.length);

  let ratingCounts = $derived(
    tried.reduce((acc, e) => {
      const best = bestRating(e.id);
      acc[best ?? '_unrated'] = (acc[best ?? '_unrated'] || 0) + 1;
      return acc;
    }, {})
  );

  // --- Tried list ---
  const GROUP_ORDER = ['yes-plus', 'yes', 'curious', 'no', '_unrated'];
  const GROUP_HEADINGS = {
    'yes-plus': '🔥 Loved it',
    'yes':      '✅ Liked it',
    'curious':  '? Curious',
    'no':       '🙅 Not for me',
    '_unrated': 'Tried — unrated',
  };

  let triedGroups = $derived(
    GROUP_ORDER.map(key => ({
      key,
      heading: GROUP_HEADINGS[key],
      items: tried
        .filter(e => (bestRating(e.id) ?? '_unrated') === key)
        .sort((a, b) => a.title.localeCompare(b.title)),
    })).filter(g => g.items.length > 0)
  );
</script>

<svelte:head>
  <title>Your Journey — Arousalist</title>
  <meta name="description" content="A map of the experiences you've explored and how they felt." />
</svelte:head>

<!-- ── Header ── -->
<div class="journal-header">
  <div class="container">
    <h1 class="journal-title">Your Journey</h1>

    <div class="header-body">
      <!-- Tiny dot map -->
      <svg
        viewBox="0 0 {SVG_W} {SVG_H}"
        width={SVG_W}
        height={SVG_H}
        xmlns="http://www.w3.org/2000/svg"
        class="dot-map"
        aria-hidden="true"
      >
        {#each gridDots as dot}
          {@const tried_entry = $progress[dot.id]?.tried}
          {@const best = bestRating(dot.id)}
          <circle
            cx={dot.x}
            cy={dot.y}
            r={DOT_R}
            class="dot"
            class:dot--untried={!tried_entry}
            class:dot--unrated={tried_entry && !best}
            class:dot--no={best === 'no'}
            class:dot--curious={best === 'curious'}
            class:dot--yes={best === 'yes'}
            class:dot--yes-plus={best === 'yes-plus'}
          />
        {/each}
      </svg>

      <!-- Stats -->
      <div class="header-meta">
        <p class="journal-subtitle">
          {#if triedCount === 0}
            Begin exploring — your map will grow with you
          {:else}
            {triedCount} of {totalCount} experiences explored
          {/if}
        </p>

        {#if triedCount > 0}
          <div class="stat-chips">
            {#each ['yes-plus', 'yes', 'curious', 'no'] as key}
              {#if ratingCounts[key]}
                <span class="stat-chip stat-chip--{key}">
                  {RATING_SYMBOLS[key]} {ratingCounts[key]}
                </span>
              {/if}
            {/each}
            {#if ratingCounts['_unrated']}
              <span class="stat-chip stat-chip--unrated">
                · {ratingCounts['_unrated']} tried
              </span>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- ── Tried list ── -->
<div class="list-section">
  <div class="container list-container">
    {#if triedCount === 0}
      <div class="empty-state">
        <p class="empty-text">No experiences logged yet. Visit any experience and mark it as tried.</p>
        <a href="{base}/experiences" class="empty-link">Browse experiences →</a>
      </div>
    {:else}
      {#each triedGroups as group}
        <section class="list-group">
          <h2 class="group-heading">{group.heading}</h2>
          <ul class="experience-list">
            {#each group.items as exp}
              <li class="exp-row">
                <a href="{base}/experiences/{exp.id}" class="exp-title">{exp.title}</a>
                <span class="tier-badge tier-badge--{exp.tier.replace(/-/g, '_')}">{TIER_LABELS[exp.tier]}</span>
              </li>
            {/each}
          </ul>
        </section>
      {/each}
    {/if}
  </div>
</div>

<style>
  /* ── Header ── */
  .journal-header {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    padding: 3rem 0 2.5rem;
  }
  .journal-title {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 400;
    color: var(--text);
    margin: 0 0 1.5rem;
    letter-spacing: -0.01em;
  }

  .header-body {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
  }

  /* Dot map */
  .dot-map {
    flex-shrink: 0;
    display: block;
  }

  .dot { pointer-events: none; }
  .dot--untried  { fill: var(--border); opacity: 0.25; }
  .dot--unrated  { fill: var(--text-muted); opacity: 0.5; }
  .dot--no       { fill: #d95f3b; }
  .dot--curious  { fill: #d4900a; }
  .dot--yes      { fill: #3d9e70; }
  .dot--yes-plus { fill: #2ec87a; }

  /* Header meta */
  .header-meta {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .journal-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .stat-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.25rem 0.7rem;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1.5px solid var(--border);
    background: var(--bg-dim);
    color: var(--text-secondary);
  }
  .stat-chip--yes-plus { color: var(--sage);   border-color: var(--sage);   background: var(--sage-dim); }
  .stat-chip--yes      { color: var(--sage);   border-color: var(--sage);   background: var(--sage-dim); opacity: 0.75; }
  .stat-chip--curious  { color: var(--amber);  border-color: var(--amber);  background: var(--amber-dim); }
  .stat-chip--no       { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }
  .stat-chip--unrated  { color: var(--text-muted); }

  /* ── List ── */
  .list-section {
    background: var(--bg-surface);
    padding: 3rem 0 4rem;
  }
  .list-container { max-width: 640px; }

  .empty-state { padding: 2rem 0; text-align: center; }
  .empty-text { color: var(--text-secondary); margin: 0 0 1rem; }
  .empty-link { color: var(--accent); text-decoration: none; font-size: 0.9rem; }
  .empty-link:hover { text-decoration: underline; }

  .list-group { margin-bottom: 2.5rem; }
  .list-group:last-child { margin-bottom: 0; }

  .group-heading {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin: 0 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  .experience-list { list-style: none; margin: 0; padding: 0; }
  .exp-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.55rem 0;
    border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  }
  .exp-row:last-child { border-bottom: none; }

  .exp-title {
    flex: 1;
    color: var(--text);
    text-decoration: none;
    font-size: 0.92rem;
    transition: color var(--transition);
  }
  .exp-title:hover { color: var(--accent); }

  .tier-badge {
    font-size: 0.68rem;
    font-weight: 500;
    padding: 0.2rem 0.55rem;
    border-radius: 100px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .tier-badge--solo                { color: var(--sage);   background: var(--sage-dim); }
  .tier-badge--solo_or_partnered   { color: var(--amber);  background: var(--amber-dim); }
  .tier-badge--better_with_partner { color: var(--accent); background: var(--accent-dim); }
  .tier-badge--partner_only        { color: var(--accent); background: var(--accent-dim); opacity: 0.8; }
</style>
