<script>
  import { progress } from '$lib/stores.js';
  import { RATING_OPTIONS, RATING_LABELS } from '$lib/data.js';

  let { experienceId, ratingTypes } = $props();

  function currentRating(type) {
    return $progress[experienceId]?.ratings?.[type] ?? null;
  }

  function toggle(type, value) {
    const current = currentRating(type);
    progress.updateExperience(experienceId, {
      ratings: { [type]: current === value ? null : value },
    });
  }
</script>

<div class="rating-widget">
  {#each ratingTypes as type}
    <div class="rating-group">
      <div class="rating-group-label">{RATING_LABELS[type]}</div>
      <div class="rating-buttons">
        {#each RATING_OPTIONS as opt}
          {@const active = currentRating(type) === opt.value}
          <button
            class="rating-btn rating-btn--{opt.value}"
            class:is-active={active}
            onclick={() => toggle(type, opt.value)}
            title={opt.label}
            aria-label="{RATING_LABELS[type]}: {opt.label}"
            aria-pressed={active}
          >
            <span class="rating-symbol">{opt.symbol}</span>
            <span class="rating-label-text">{opt.label}</span>
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .rating-widget {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .rating-group {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .rating-group-label {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .rating-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .rating-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.75rem 1.1rem;
    border-radius: var(--radius);
    border: 1.5px solid var(--border);
    background: var(--bg-surface);
    cursor: pointer;
    font-family: var(--font-body);
    transition: all var(--transition);
    min-width: 72px;
  }
  .rating-btn:hover { transform: translateY(-1px); }

  .rating-symbol {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1;
    display: block;
  }

  .rating-label-text {
    font-size: 0.625rem;
    font-weight: 500;
    text-align: center;
    line-height: 1.3;
    white-space: nowrap;
  }

  /* Colours */
  .rating-btn--no       { color: var(--rating-no-color); }
  .rating-btn--curious  { color: var(--rating-curious-color); }
  .rating-btn--yes      { color: var(--rating-yes-color); }
  .rating-btn--yes-plus { color: var(--rating-yes-plus-color); }

  .rating-btn--no:hover        { border-color: var(--rating-no-color);       background: var(--rating-no-bg); }
  .rating-btn--curious:hover   { border-color: var(--rating-curious-color);  background: var(--rating-curious-bg); }
  .rating-btn--yes:hover       { border-color: var(--rating-yes-color);      background: var(--rating-yes-bg); }
  .rating-btn--yes-plus:hover  { border-color: var(--rating-yes-plus-color); background: var(--rating-yes-plus-bg); }

  .rating-btn--no.is-active       { background: var(--rating-no-active-bg);  border-color: var(--rating-no-color); }
  .rating-btn--curious.is-active  { background: var(--rating-curious-bg);    border-color: var(--rating-curious-color); }
  .rating-btn--yes.is-active      { background: var(--rating-yes-bg);        border-color: var(--rating-yes-color); }
  .rating-btn--yes-plus.is-active { background: var(--rating-yes-plus-bg);   border-color: var(--rating-yes-plus-color); }

  .is-active { box-shadow: var(--shadow); }

  @media (max-width: 480px) {
    .rating-btn { min-width: 60px; padding: 0.65rem 0.75rem; }
  }
</style>
