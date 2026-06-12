<script>
  import { base } from '$app/paths';
  import { EXPERIENCES_ORDERED, JOURNEYS, THEMES, STARTING_POINT_IDS, TIER_INFO } from '$lib/data.js';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';
  import { guidedPrefs, progress } from '$lib/stores.js';

  let context = $state($guidedPrefs?.context ?? null);
  let anatomy = $state($guidedPrefs?.anatomy ?? null);
  let viewMode = $state('journeys');
  let expandedTheme = $state(null);

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

  function toggleTheme(id) {
    expandedTheme = expandedTheme === id ? null : id;
  }

  const SOLO_TIERS   = new Set(['solo', 'solo-or-partnered']);
  const PARTNER_TIERS = new Set(['partner-only', 'better-with-partner', 'solo-or-partnered']);

  const expById      = Object.fromEntries(EXPERIENCES_ORDERED.map(e => [e.id, e]));
  const topoPosition = Object.fromEntries(EXPERIENCES_ORDERED.map((e, i) => [e.id, i]));
  // First step of each journey, for "Start here" annotations
  const startJourneyMap = Object.fromEntries(JOURNEYS.map(j => [j.steps[0], j]));

  let suggestions = $derived.by(() => {
    if (!context || !anatomy) return [];
    const tiers = context === 'solo' ? SOLO_TIERS : PARTNER_TIERS;
    return EXPERIENCES_ORDERED.filter(exp => {
      if (!tiers.has(exp.tier)) return false;
      const tags = exp.tags ?? [];
      if (anatomy === 'penis' && tags.includes('female anatomy')) return false;
      if (anatomy === 'vulva'  && tags.includes('male anatomy'))   return false;
      return true;
    });
  });

  // Journeys: filter by anatomy only
  let visibleJourneys = $derived(
    JOURNEYS.filter(j => {
      if (!j.anatomyTag) return true;
      if (j.anatomyTag === 'female anatomy' && anatomy === 'penis') return false;
      if (j.anatomyTag === 'male anatomy'   && anatomy === 'vulva') return false;
      return true;
    })
  );

  function passesAnatomyFilter(exp) {
    const tags = exp?.tags ?? [];
    if (anatomy === 'penis' && tags.includes('female anatomy')) return false;
    if (anatomy === 'vulva'  && tags.includes('male anatomy'))   return false;
    return true;
  }

  // Themes: filter by anatomy, topo-sort within each theme
  let themeItems = $derived(
    THEMES.map(theme => ({
      ...theme,
      experiences: theme.experienceIds
        .map(id => expById[id])
        .filter(e => e && passesAnatomyFilter(e))
        .sort((a, b) => (topoPosition[a.id] ?? 999) - (topoPosition[b.id] ?? 999)),
    })).filter(t => t.experiences.length > 0)
  );

  // Starting points: filter by anatomy
  let startingPoints = $derived(
    STARTING_POINT_IDS.map(id => expById[id]).filter(e => e && passesAnatomyFilter(e))
  );

  const CONTEXT_LABELS = { solo: 'Solo', partner: 'With a partner' };
  const ANATOMY_LABELS = {
    penis: { solo: 'You have a penis',   partner: 'Both have penises' },
    vulva: { solo: 'You have a vulva',   partner: 'Both have vulvas'  },
    mixed: { solo: '',                   partner: 'One of each'       },
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
      <!-- Results -->
      <div class="results-header">
        <div class="results-meta">
          <div class="results-summary">
            <span class="summary-chip">{summaryContext}</span>
            {#if summaryAnatomy}
              <span class="summary-sep">·</span>
              <span class="summary-chip">{summaryAnatomy}</span>
            {/if}
            <span class="summary-sep">·</span>
            <span class="summary-count">{suggestions.length} experiences</span>
          </div>
          <button class="restart-btn" onclick={restart}>Start over</button>
        </div>
        <h2 class="results-title">Find your path</h2>
      </div>

      <!-- View switcher -->
      <div class="view-switcher">
        <button class="view-btn" class:is-active={viewMode === 'journeys'} onclick={() => viewMode = 'journeys'}>Journeys</button>
        <button class="view-btn" class:is-active={viewMode === 'themes'}   onclick={() => viewMode = 'themes'}>By theme</button>
        <button class="view-btn" class:is-active={viewMode === 'start'}    onclick={() => viewMode = 'start'}>Start here</button>
        <button class="view-btn" class:is-active={viewMode === 'all'}      onclick={() => viewMode = 'all'}>All</button>
      </div>

      <!-- Journey view -->
      {#if viewMode === 'journeys'}
        <p class="view-intro">Named paths through related experiences, ordered from first to last. Your progress is shown as you go.</p>
        <div class="journeys-list">
          {#each visibleJourneys as journey}
            {@const triedCount = journey.steps.filter(id => $progress[id]?.tried).length}
            <div class="journey-card">
              <div class="journey-header">
                <div class="journey-meta">
                  <h3 class="journey-title">{journey.title}</h3>
                  <p class="journey-desc">{journey.description}</p>
                </div>
                <div class="journey-pips" title="{triedCount} of {journey.steps.length} done">
                  {#each journey.steps as stepId}
                    <span class="pip" class:pip--done={$progress[stepId]?.tried}></span>
                  {/each}
                </div>
              </div>
              <ol class="journey-steps">
                {#each journey.steps as stepId, i}
                  {@const exp = expById[stepId]}
                  {@const available = context !== 'solo' || exp?.tier !== 'partner-only'}
                  {#if exp}
                    <li class="step-item"
                        class:step-item--done={$progress[stepId]?.tried}
                        class:step-item--unavailable={!available}>
                      <span class="step-num">{i + 1}</span>
                      <a href="{base}/experiences/{stepId}" class="step-name">{exp.title}</a>
                      {#if $progress[stepId]?.tried}
                        <span class="step-check">✓</span>
                      {:else if !available}
                        <span class="step-partner-note">with a partner</span>
                      {:else}
                        <span class="step-tier" title={TIER_INFO[exp.tier]?.label}>{TIER_INFO[exp.tier]?.icon}</span>
                      {/if}
                    </li>
                  {/if}
                {/each}
              </ol>
            </div>
          {/each}
        </div>

      <!-- Theme view -->
      {:else if viewMode === 'themes'}
        <p class="view-intro">Browse by what draws you — each theme groups experiences by feel and intent.</p>
        <div class="themes-list">
          {#each themeItems as theme}
            <div class="theme-item" class:is-expanded={expandedTheme === theme.id}>
              <button class="theme-trigger" onclick={() => toggleTheme(theme.id)}>
                <div class="theme-trigger-top">
                  <span class="theme-name">{theme.title}</span>
                  <span class="theme-count">{theme.experiences.length}</span>
                  <span class="theme-chevron" class:flipped={expandedTheme === theme.id}>▾</span>
                </div>
                <p class="theme-trigger-desc">{theme.description}</p>
              </button>
              {#if expandedTheme === theme.id}
                <div class="theme-experiences">
                  {#each theme.experiences as experience}
                    <ExperienceCard {experience} />
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>

      <!-- Start here view -->
      {:else if viewMode === 'start'}
        <p class="view-intro">Not sure where to begin? These are the best entry points across different areas — each one opens into a chain of related experiences.</p>
        <div class="experience-grid">
          {#each startingPoints as experience (experience.id)}
            {@const journey = startJourneyMap[experience.id]}
            <div class="start-item">
              <ExperienceCard {experience} />
              {#if journey}
                <p class="start-chain">Opens into: {journey.title} · {journey.steps.length} steps</p>
              {/if}
            </div>
          {/each}
        </div>

      <!-- All view -->
      {:else}
        <p class="view-intro">All {suggestions.length} experiences matched to your situation, ordered so prerequisites come first.</p>
        <div class="experience-grid">
          {#each suggestions as experience (experience.id)}
            <ExperienceCard {experience} />
          {/each}
        </div>
      {/if}

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

  .guided-body { padding: 3rem 0 6rem; }

  /* Questions */
  .question-block { max-width: 700px; }

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
  .choice-grid--three { grid-template-columns: repeat(3, 1fr); }

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

  .choice-icon { font-size: 2rem; line-height: 1; }
  .choice-title { font-size: 1.05rem; font-weight: 600; color: var(--text); }
  .choice-desc { font-size: 0.855rem; color: var(--text-secondary); line-height: 1.5; max-width: none; }

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

  /* Results header */
  .results-header { margin-bottom: 1.75rem; }

  .results-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.6rem;
  }

  .results-summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
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

  .summary-sep { color: var(--text-muted); font-size: 0.85rem; }

  .summary-count {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .results-title {
    font-family: var(--font-heading);
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 400;
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
    white-space: nowrap;
    transition: color var(--transition), border-color var(--transition);
  }
  .restart-btn:hover { color: var(--accent); border-color: var(--accent-light); }

  /* View switcher */
  .view-switcher {
    display: flex;
    gap: 0.2rem;
    margin-bottom: 1.75rem;
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.2rem;
    width: fit-content;
  }

  .view-btn {
    font-family: var(--font-body);
    font-size: 0.825rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: none;
    border: none;
    border-radius: var(--radius-sm);
    padding: 0.4rem 1rem;
    cursor: pointer;
    transition: background var(--transition), color var(--transition), box-shadow var(--transition);
    white-space: nowrap;
  }
  .view-btn:hover { color: var(--text); }
  .view-btn.is-active {
    background: var(--bg-surface);
    color: var(--text);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  }

  /* View intro */
  .view-intro {
    font-size: 0.9rem;
    color: var(--text-secondary);
    max-width: 62ch;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  /* Journeys */
  .journeys-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 3rem;
  }

  .journey-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.5rem 1.5rem 0;
    overflow: hidden;
  }

  .journey-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .journey-meta { flex: 1; min-width: 0; }

  .journey-title {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 0.3rem;
  }

  .journey-desc {
    font-size: 0.855rem;
    color: var(--text-secondary);
    line-height: 1.55;
    max-width: none;
  }

  .journey-pips {
    display: flex;
    gap: 0.3rem;
    flex-shrink: 0;
    padding-top: 0.2rem;
  }

  .pip {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--border);
    flex-shrink: 0;
  }
  .pip--done { background: var(--accent); }

  .journey-steps {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid var(--border);
  }

  .step-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--border);
  }

  .step-num {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--text-muted);
    width: 1.1rem;
    text-align: right;
    flex-shrink: 0;
  }

  .step-name {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    transition: color var(--transition);
  }
  .step-name:hover { color: var(--accent); }

  .step-item--done .step-name { color: var(--text-muted); }

  .step-check {
    font-size: 0.75rem;
    color: var(--accent);
    flex-shrink: 0;
  }

  .step-tier {
    font-size: 0.8rem;
    flex-shrink: 0;
    opacity: 0.5;
    line-height: 1;
  }

  .step-item--unavailable {
    opacity: 0.4;
  }

  .step-partner-note {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-style: italic;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* Start here */
  .start-item {
    display: flex;
    flex-direction: column;
  }

  .start-chain {
    font-size: 0.75rem;
    color: var(--accent);
    padding: 0.35rem 0.6rem 0;
    margin: 0;
    line-height: 1.4;
  }

  /* Themes */
  .themes-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 3rem;
  }

  .theme-item {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color var(--transition);
  }
  .theme-item.is-expanded { border-color: var(--accent-light); }

  .theme-trigger {
    width: 100%;
    text-align: left;
    background: var(--bg-surface);
    border: none;
    padding: 1rem 1.25rem 0.85rem;
    cursor: pointer;
    font-family: var(--font-body);
    display: block;
    transition: background var(--transition);
  }
  .theme-trigger:hover { background: var(--bg-raised); }

  .theme-trigger-top {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.3rem;
  }

  .theme-name {
    font-size: 0.975rem;
    font-weight: 600;
    color: var(--text);
  }

  .theme-count {
    font-size: 0.72rem;
    color: var(--text-muted);
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.1rem 0.5rem;
  }

  .theme-chevron {
    margin-left: auto;
    color: var(--text-muted);
    font-size: 0.75rem;
    transition: transform 0.15s ease;
    display: inline-block;
    line-height: 1;
  }
  .theme-chevron.flipped { transform: rotate(180deg); }

  .theme-trigger-desc {
    font-size: 0.825rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
  }

  .theme-experiences {
    padding: 1rem;
    background: var(--bg-dim);
    border-top: 1px solid var(--border);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  /* Experience grid (shared by Start here + All views) */
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
    .choice-grid         { grid-template-columns: 1fr; }
    .choice-grid--three  { grid-template-columns: 1fr; }
    .experience-grid     { grid-template-columns: 1fr; }
    .theme-experiences   { grid-template-columns: 1fr; }
    .view-switcher       { width: 100%; }
    .view-btn            { flex: 1; text-align: center; padding: 0.4rem 0.5rem; }
    .results-meta        { flex-wrap: wrap; }
    .journey-header      { flex-direction: column; gap: 0.75rem; }
    .journey-pips        { order: -1; }
  }
</style>
