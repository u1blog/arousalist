<script>
  import { base } from '$app/paths';
  import { EXPERIENCES_ORDERED } from '$lib/data.js';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';
  import { guidedPrefs } from '$lib/stores.js';

  let context = $state($guidedPrefs?.context ?? null);
  let anatomy = $state($guidedPrefs?.anatomy ?? null);

  let step = $derived(context === null ? 1 : anatomy === null ? 2 : 3);

  function selectContext(value) {
    context = value;
    anatomy = null;
    guidedPrefs.set({ context: value, anatomy: null });
  }

  function selectAnatomy(value) {
    anatomy = value;
    guidedPrefs.set({ context, anatomy: value });
  }

  function restart() {
    context = null;
    anatomy = null;
    guidedPrefs.reset();
  }

  const SOLO_TIERS = new Set(['solo', 'solo-or-partnered']);
  const PARTNER_TIERS = new Set(['partner-only', 'better-with-partner', 'solo-or-partnered']);

  let suggestions = $derived.by(() => {
    if (!context || !anatomy) return [];
    const tiers = context === 'solo' ? SOLO_TIERS : PARTNER_TIERS;
    return EXPERIENCES_ORDERED.filter(exp => {
      if (!tiers.has(exp.tier)) return false;
      const tags = exp.tags ?? [];
      if (anatomy === 'penis' && tags.includes('female anatomy')) return false;
      if (anatomy === 'vulva' && tags.includes('male anatomy')) return false;
      return true;
    });
  });

  const CONTEXT_LABELS = {
    solo: 'Solo',
    partner: 'With a partner',
  };

  const ANATOMY_LABELS = {
    penis: { solo: 'You have a penis', partner: 'Both have penises' },
    vulva: { solo: 'You have a vulva', partner: 'Both have vulvas' },
    mixed: { solo: '', partner: 'One of each' },
  };

  let summaryContext = $derived(context ? CONTEXT_LABELS[context] : '');
  let summaryAnatomy = $derived(context && anatomy ? ANATOMY_LABELS[anatomy][context] : '');
</script>

<svelte:head>
  <title>Find Your Starting Point — Arousalist</title>
  <meta name="description" content="Answer two questions to get a personalized list of experiences tailored to your situation." />
</svelte:head>

<div class="guided-header">
  <div class="container">
    <p class="eyebrow">Guided path</p>
    <h1 class="guided-title">Find your starting point</h1>
    <p class="guided-subtitle">Two questions to surface experiences matched to your situation.</p>
  </div>
</div>

<div class="guided-body">
  <div class="container">

    {#if step === 1}
      <div class="question-block">
        <p class="q-label">Question 1 of 2</p>
        <h2 class="q-text">Are you exploring solo or with a partner?</h2>
        <div class="choice-grid">
          <button class="choice-card" onclick={() => selectContext('solo')}>
            <span class="choice-icon">🧍</span>
            <span class="choice-title">Solo</span>
            <span class="choice-desc">Experiences that work on your own — building self-knowledge before (or instead of) involving anyone else.</span>
          </button>
          <button class="choice-card" onclick={() => selectContext('partner')}>
            <span class="choice-icon">👫</span>
            <span class="choice-title">With a partner</span>
            <span class="choice-desc">Experiences designed for two people — where the other person's presence is part of what you're exploring.</span>
          </button>
        </div>
      </div>

    {:else if step === 2}
      <div class="question-block">
        <p class="q-label">Question 2 of 2</p>
        <h2 class="q-text">
          {#if context === 'solo'}
            What anatomy are you working with?
          {:else}
            What anatomy are you working with together?
          {/if}
        </h2>
        <div class="choice-grid {context === 'partner' ? 'choice-grid--three' : ''}">
          {#if context === 'solo'}
            <button class="choice-card" onclick={() => selectAnatomy('penis')}>
              <span class="choice-title">I have a penis</span>
              <span class="choice-desc">Filters out experiences that require vulva anatomy.</span>
            </button>
            <button class="choice-card" onclick={() => selectAnatomy('vulva')}>
              <span class="choice-title">I have a vulva</span>
              <span class="choice-desc">Filters out experiences that require penis anatomy.</span>
            </button>
          {:else}
            <button class="choice-card" onclick={() => selectAnatomy('penis')}>
              <span class="choice-title">We both have penises</span>
              <span class="choice-desc">Filters out experiences that require vulva anatomy.</span>
            </button>
            <button class="choice-card" onclick={() => selectAnatomy('vulva')}>
              <span class="choice-title">We both have vulvas</span>
              <span class="choice-desc">Filters out experiences that require penis anatomy.</span>
            </button>
            <button class="choice-card" onclick={() => selectAnatomy('mixed')}>
              <span class="choice-title">One of each</span>
              <span class="choice-desc">All anatomy-specific experiences are relevant — nothing filtered out.</span>
            </button>
          {/if}
        </div>
        <button class="back-btn" onclick={() => { context = null; anatomy = null; guidedPrefs.reset(); }}>
          ← Back
        </button>
      </div>

    {:else}
      <div class="results-header">
        <div class="results-summary">
          <span class="summary-chip">{summaryContext}</span>
          {#if summaryAnatomy}
            <span class="summary-sep">·</span>
            <span class="summary-chip">{summaryAnatomy}</span>
          {/if}
        </div>
        <h2 class="results-title">
          {suggestions.length} experience{suggestions.length === 1 ? '' : 's'} for you
        </h2>
        <p class="results-desc">Try a few that catch your eye — there's no prescribed order.</p>
        <button class="restart-btn" onclick={restart}>Start over</button>
      </div>

      <div class="experience-grid">
        {#each suggestions as experience (experience.id)}
          <ExperienceCard {experience} />
        {/each}
      </div>

      <div class="results-footer">
        <a href="{base}/experiences" class="btn-primary">Browse all experiences →</a>
      </div>
    {/if}

  </div>
</div>

<style>
  .guided-header {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    padding: 2.5rem 0 2rem;
  }

  .eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }

  .guided-title {
    font-family: var(--font-heading);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: 0.5rem;
  }

  .guided-subtitle {
    font-size: 0.975rem;
    color: var(--text-secondary);
    max-width: 50ch;
  }

  .guided-body {
    padding: 3rem 0 6rem;
  }

  /* Questions */
  .question-block {
    max-width: 700px;
  }

  .q-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }

  .q-text {
    font-family: var(--font-heading);
    font-size: clamp(1.4rem, 3vw, 1.85rem);
    font-weight: 400;
    margin-bottom: 2rem;
    line-height: 1.3;
  }

  .choice-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .choice-grid--three {
    grid-template-columns: repeat(3, 1fr);
  }

  .choice-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    background: var(--bg-surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.75rem 1.5rem;
    text-align: left;
    cursor: pointer;
    font-family: var(--font-body);
    transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
  }

  .choice-card:hover {
    border-color: var(--accent);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .choice-icon {
    font-size: 2rem;
    line-height: 1;
  }

  .choice-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text);
  }

  .choice-desc {
    font-size: 0.855rem;
    color: var(--text-secondary);
    line-height: 1.5;
    max-width: none;
  }

  .back-btn {
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color var(--transition);
  }

  .back-btn:hover { color: var(--accent); }

  /* Results */
  .results-header {
    margin-bottom: 2.5rem;
  }

  .results-summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .summary-chip {
    font-size: 0.8rem;
    font-weight: 500;
    background: var(--accent-dim);
    color: var(--accent);
    border: 1px solid var(--accent-light);
    border-radius: 100px;
    padding: 0.25rem 0.75rem;
  }

  .summary-sep {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .results-title {
    font-family: var(--font-heading);
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  .results-desc {
    font-size: 0.925rem;
    color: var(--text-secondary);
    max-width: 56ch;
    margin-bottom: 1.25rem;
  }

  .restart-btn {
    font-family: var(--font-body);
    font-size: 0.825rem;
    font-weight: 500;
    color: var(--text-muted);
    background: none;
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.3rem 0.85rem;
    cursor: pointer;
    transition: color var(--transition), border-color var(--transition);
  }

  .restart-btn:hover {
    color: var(--accent);
    border-color: var(--accent-light);
  }

  .experience-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
    margin-bottom: 3rem;
  }

  .results-footer {
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid var(--border);
  }

  @media (max-width: 700px) {
    .choice-grid { grid-template-columns: 1fr; }
    .choice-grid--three { grid-template-columns: 1fr; }
    .experience-grid { grid-template-columns: 1fr; }
  }
</style>
