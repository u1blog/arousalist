<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { progress, wishlist } from '$lib/stores.js';
  import { EXPERIENCES, ALL_TAGS } from '$lib/data.js';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';

  let tierFilter   = $state(browser ? ($page.url.searchParams.get('tier')   ?? 'all') : 'all');
  let statusFilter = $state(browser ? ($page.url.searchParams.get('status') ?? 'all') : 'all');
  let tagFilter    = $state(browser ? ($page.url.searchParams.get('tag')    ?? 'all') : 'all');
  let search       = $state(browser ? ($page.url.searchParams.get('q')      ?? '')    : '');
  let filtersOpen  = $state(tierFilter !== 'all' || statusFilter !== 'all' || tagFilter !== 'all');

  $effect(() => {
    const params = new URLSearchParams();
    if (tierFilter !== 'all')   params.set('tier',   tierFilter);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (tagFilter !== 'all')    params.set('tag',    tagFilter);
    if (search.trim())          params.set('q',      search.trim());
    const qs = params.toString();
    goto(qs ? `?${qs}` : '?', { replaceState: true, noScroll: true, keepFocus: true });
  });

  let filtered = $derived.by(() => {
    const q = search.trim().toLowerCase();
    return EXPERIENCES.filter(exp => {
      const d = $progress[exp.id] ?? {};

      if (tierFilter !== 'all' && exp.tier !== tierFilter) return false;

      if (statusFilter === 'tried'      && !d.tried) return false;
      if (statusFilter === 'not-tried'  && d.tried)  return false;
      if (statusFilter === 'rated') {
        if (!d.ratings || !Object.values(d.ratings).some(Boolean)) return false;
      }
      if (statusFilter === 'wishlisted' && !$wishlist.has(exp.id)) return false;

      if (tagFilter !== 'all' && !exp.tags?.includes(tagFilter)) return false;

      if (q) {
        const inTitle = exp.title.toLowerCase().includes(q);
        const inDesc  = exp.description?.toLowerCase().includes(q);
        const inTags  = exp.tags?.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inTags) return false;
      }

      return true;
    });
  });

  let isFiltered = $derived(
    tierFilter !== 'all' || statusFilter !== 'all' || tagFilter !== 'all'
  );

  let hasAnyFilter = $derived(isFiltered || search.trim() !== '');

  const tierOptions = [
    { value: 'all',                  label: 'All' },
    { value: 'solo',                 label: 'Solo' },
    { value: 'solo-or-partnered',    label: 'Solo or partnered' },
    { value: 'better-with-partner',  label: 'Better with a partner' },
    { value: 'partner-only',         label: 'Partner only' },
  ];
  const statusOptions = [
    { value: 'all',        label: 'All' },
    { value: 'tried',      label: 'Tried' },
    { value: 'not-tried',  label: 'Not tried' },
    { value: 'rated',      label: 'Rated' },
    { value: 'wishlisted', label: 'Wishlisted' },
  ];
  const tagOptions = [
    { value: 'all', label: 'All' },
    ...ALL_TAGS.map(t => ({ value: t, label: t })),
  ];

  function clearFilters() {
    tierFilter = 'all';
    statusFilter = 'all';
    tagFilter = 'all';
    search = '';
  }
</script>

<svelte:head>
  <title>Browse Experiences — Arousalist</title>
  <meta name="description" content="Browse all experiences. Filter by tier, status, and category. Track your progress." />
</svelte:head>

<div class="browse-header">
  <div class="container">
    <h1 class="browse-title">Experiences</h1>

  </div>
</div>

<div class="filters-wrap">
  <div class="container filters-bar">
    <button
      class="filter-toggle-btn"
      class:has-filters={isFiltered}
      onclick={() => filtersOpen = !filtersOpen}
      aria-expanded={filtersOpen}
    >
      <span class="filter-toggle-icon" class:open={filtersOpen}>▾</span>
      Filters
      {#if isFiltered}<span class="filter-active-dot" aria-hidden="true"></span>{/if}
    </button>

    <span class="results-count">
      {#if hasAnyFilter}
        {filtered.length} of {EXPERIENCES.length}
      {:else}
        {EXPERIENCES.length} experiences
      {/if}
    </span>

    {#if hasAnyFilter}
      <button class="clear-btn" onclick={clearFilters}>Clear</button>
    {/if}

    <div class="search-wrap">
      <input
        class="search-input"
        type="search"
        placeholder="Search…"
        bind:value={search}
        aria-label="Search experiences"
      />
    </div>
  </div>

  {#if filtersOpen}
    <div class="container filters-inner">
      <div class="filters-row">
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
      </div>

      <div class="filter-group filter-group--tags">
        <span class="filter-label">Tag</span>
        {#each tagOptions as opt}
          <button
            class="filter-btn"
            class:is-active={tagFilter === opt.value}
            onclick={() => tagFilter = opt.value}
          >{opt.label}</button>
        {/each}
      </div>
    </div>
  {/if}
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
        <button class="btn-primary" onclick={clearFilters}>
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
    padding: 1.5rem 0 1.5rem;
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

  /* Filters */
  .filters-wrap {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 62px;
    z-index: 90;
  }

  .filters-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .filter-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--font-body);
    font-size: 0.825rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.35rem 0.75rem;
    cursor: pointer;
    transition: border-color var(--transition), color var(--transition);
    white-space: nowrap;
  }
  .filter-toggle-btn:hover { border-color: var(--accent-light); color: var(--text); }
  .filter-toggle-btn.has-filters { border-color: var(--accent-light); color: var(--accent); }

  .filter-toggle-icon {
    font-size: 0.75rem;
    transition: transform 0.15s ease;
    display: inline-block;
  }
  .filter-toggle-icon.open { transform: rotate(180deg); }

  .filter-active-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  .results-count {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .search-wrap {
    margin-left: auto;
  }

  .search-input {
    font-family: var(--font-body);
    font-size: 0.825rem;
    color: var(--text);
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.35rem 0.75rem;
    width: 180px;
    outline: none;
    transition: border-color var(--transition), width var(--transition);
  }
  .search-input::placeholder { color: var(--text-muted); }
  .search-input:focus {
    border-color: var(--accent-light);
    width: 240px;
  }

  .clear-btn {
    font-size: 0.775rem;
    font-weight: 500;
    color: var(--accent);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: var(--font-body);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .clear-btn:hover { opacity: 0.75; }

  .filters-inner {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0;
    padding-bottom: 0.75rem;
  }

  .filters-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-group--tags {
    width: 100%;
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
  }
</style>
