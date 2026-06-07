<script>
  import { progress } from '$lib/stores.js';
  import { EXPERIENCES } from '$lib/data.js';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';

  let tierFilter     = $state('all');
  let statusFilter   = $state('all');
  let categoryFilter = $state('all');

  let stats = $derived({
    tried: EXPERIENCES.filter(e => $progress[e.id]?.tried).length,
    rated: EXPERIENCES.filter(e => {
      const d = $progress[e.id];
      return d?.ratings && Object.values(d.ratings).some(Boolean);
    }).length,
    total: EXPERIENCES.length,
  });

  let filtered = $derived(
    EXPERIENCES.filter(exp => {
      const d = $progress[exp.id] ?? {};

      if (tierFilter !== 'all' && exp.tier !== tierFilter) return false;

      if (statusFilter === 'tried'     && !d.tried) return false;
      if (statusFilter === 'not-tried' && d.tried)  return false;
      if (statusFilter === 'rated') {
        if (!d.ratings || !Object.values(d.ratings).some(Boolean)) return false;
      }

      if (categoryFilter !== 'all' && exp.category !== categoryFilter) return false;

      return true;
    })
  );

  const tierOptions = [
    { value: 'all',                  label: 'All' },
    { value: 'solo-start',           label: 'Solo start' },
    { value: 'better-with-partner',  label: 'Better with a partner' },
    { value: 'partner-only',         label: 'Partner only' },
  ];
  const statusOptions = [
    { value: 'all',       label: 'All' },
    { value: 'tried',     label: 'Tried' },
    { value: 'not-tried', label: 'Not tried' },
    { value: 'rated',     label: 'Rated' },
  ];
  const categoryOptions = [
    { value: 'all',       label: 'All' },
    { value: 'sensation', label: 'Sensation-led' },
    { value: 'dynamic',   label: 'Dynamic-led' },
  ];

  let progressPct = $derived((stats.tried / stats.total) * 100);
</script>

<svelte:head>
  <title>Browse Experiences — Arousalist</title>
  <meta name="description" content="Browse all twelve experiences. Filter by tier, status, and category. Track your progress." />
</svelte:head>

<div class="browse-header">
  <div class="container">
    <h1 class="browse-title">Experiences</h1>
    <p class="browse-subtitle">Twelve structured exercises. Work through them at your own pace.</p>

    <div class="progress-wrap">
      <div class="progress-track">
        <div class="progress-fill" style="width: {progressPct}%"></div>
      </div>
      <div class="progress-labels">
        <span class="progress-stat"><strong>{stats.tried}</strong> of {stats.total} tried</span>
        <span class="progress-stat"><strong>{stats.rated}</strong> rated</span>
      </div>
    </div>
  </div>
</div>

<div class="filters-wrap">
  <div class="container filters-inner">
    <div class="filter-group">
      <span class="filter-label">Tier</span>
      {#each tierOptions as opt}
        <button
          class="filter-btn"
          class:is-active={tierFilter === opt.value}
          onclick={() => tierFilter = opt.value}
        >{opt.label}</button>
      {/each}
    </div>

    <div class="filter-divider"></div>

    <div class="filter-group">
      <span class="filter-label">Status</span>
      {#each statusOptions as opt}
        <button
          class="filter-btn"
          class:is-active={statusFilter === opt.value}
          onclick={() => statusFilter = opt.value}
        >{opt.label}</button>
      {/each}
    </div>

    <div class="filter-divider"></div>

    <div class="filter-group">
      <span class="filter-label">Type</span>
      {#each categoryOptions as opt}
        <button
          class="filter-btn"
          class:is-active={categoryFilter === opt.value}
          onclick={() => categoryFilter = opt.value}
        >{opt.label}</button>
      {/each}
    </div>

  </div>
</div>

<div class="browse-body">
  <div class="container">
    {#if filtered.length}
      <div class="experience-grid">
        {#each filtered as experience (experience.id)}
          <ExperienceCard {experience} />
        {/each}
      </div>
    {:else}
      <div class="no-results">
        <p>No experiences match the current filters.</p>
        <button class="btn-primary" onclick={() => { tierFilter = 'all'; statusFilter = 'all'; categoryFilter = 'all'; }}>
          Clear filters
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .browse-header {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    padding: 2.5rem 0 0;
  }

  .browse-title {
    font-family: var(--font-heading);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: 0.4rem;
  }

  .browse-subtitle {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: none;
  }

  .progress-wrap {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 0;
    border-top: 1px solid var(--border);
  }

  .progress-track {
    flex: 1;
    height: 4px;
    background: var(--border);
    border-radius: 100px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--sage);
    border-radius: 100px;
    transition: width 0.4s ease;
  }

  .progress-labels {
    display: flex;
    gap: 1rem;
    flex-shrink: 0;
  }

  .progress-stat {
    font-size: 0.8rem;
    color: var(--text-secondary);
    white-space: nowrap;
  }

  /* Filters */
  .filters-wrap {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    padding: 1rem 0;
    position: sticky;
    top: 62px;
    z-index: 90;
  }

  .filters-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
    white-space: nowrap;
  }

  .filter-divider {
    width: 1px;
    height: 20px;
    background: var(--border);
    flex-shrink: 0;
  }

  /* Grid */
  .browse-body { padding: 2.5rem 0 5rem; }

  .experience-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .no-results {
    text-align: center;
    padding: 5rem 1rem;
    color: var(--text-muted);
  }
  .no-results p { margin: 0 auto 1.5rem; font-size: 0.95rem; }

  @media (max-width: 700px) {
    .experience-grid { grid-template-columns: 1fr; }
    .filter-divider { display: none; }
    .filters-inner { gap: 0.75rem; }
  }
</style>
