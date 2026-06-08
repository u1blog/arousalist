<script>
  import { base } from '$app/paths';
  import { progress, wishlist } from '$lib/stores.js';
  import { TIER_INFO, CATEGORY_INFO, RATING_OPTIONS, RATING_LABELS } from '$lib/data.js';

  let { experience } = $props();

  let data = $derived($progress[experience.id] ?? { tried: false, ratings: {}, notes: '' });
  let tier = $derived(TIER_INFO[experience.tier]);
  let cat  = $derived(CATEGORY_INFO[experience.category]);

  let ratedEntries = $derived(
    experience.ratingTypes
      .map(type => ({ type, value: data.ratings?.[type] }))
      .filter(r => r.value)
  );

  let isWishlisted = $derived($wishlist.has(experience.id));

  function optionFor(value) {
    return RATING_OPTIONS.find(o => o.value === value);
  }
</script>

<a href="{base}/experiences/{experience.id}" class="exp-card" class:is-tried={data.tried}>
  <div class="card-header">
    <div class="card-badges">
      <span class="tier-badge tier-badge--{experience.tier}">{tier.icon} {tier.label}</span>
      <span class="cat-badge">{cat.label}</span>
    </div>
    {#if data.tried}
      <span class="tried-indicator" title="Tried">✓</span>
    {/if}
    <button
      class="wishlist-btn"
      class:is-wishlisted={isWishlisted}
      onclick={(e) => { e.preventDefault(); e.stopPropagation(); wishlist.toggle(experience.id); }}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >♥</button>
  </div>

  <h2 class="card-title">{experience.title}</h2>
  <p class="card-description">{experience.description}</p>

  {#if experience.tags?.length}
    <div class="card-tags">
      {#each experience.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  {/if}

  <div class="card-status">
    {#if ratedEntries.length}
      {#each ratedEntries as { type, value }}
        {@const opt = optionFor(value)}
        <span class="mini-rating mini-rating--{value}" title="{RATING_LABELS[type]}: {opt.label}">
          <span class="mini-label">{RATING_LABELS[type]}</span>
          <span class="mini-symbol">{opt.symbol}</span>
        </span>
      {/each}
    {:else}
      <span class="card-status-empty">Not yet rated</span>
    {/if}
  </div>
</a>

<style>
  .exp-card {
    display: block;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: box-shadow var(--transition), border-color var(--transition), transform var(--transition);
  }
  .exp-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--accent-light);
    transform: translateY(-2px);
    color: inherit;
  }
  .exp-card.is-tried { border-left: 3px solid var(--sage); }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .card-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    flex: 1;
  }

  .tried-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--sage);
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .wishlist-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.95rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color var(--transition), background var(--transition);
    flex-shrink: 0;
  }
  .wishlist-btn:hover { color: var(--accent); background: var(--bg-dim); }
  .wishlist-btn.is-wishlisted { color: var(--accent); }

  .card-title {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .card-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.55;
    max-width: none;
    margin-bottom: 0.75rem;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .tag {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
    border-radius: 100px;
    padding: 0.15rem 0.55rem;
    white-space: nowrap;
  }

  .card-status {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
  }

  .card-status-empty {
    font-size: 0.775rem;
    color: var(--text-muted);
    font-style: italic;
  }
</style>
