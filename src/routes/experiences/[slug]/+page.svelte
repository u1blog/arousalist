<script>
  import { base } from '$app/paths';
  import { TIER_INFO, CATEGORY_INFO } from '$lib/data.js';
  import { wishlist, progress } from '$lib/stores.js';
  import RatingWidget from '$lib/components/RatingWidget.svelte';
  import TriedToggle  from '$lib/components/TriedToggle.svelte';
  import NotesField   from '$lib/components/NotesField.svelte';

  let { data } = $props();

  let exp          = $derived(data.experience);
  let prev         = $derived(data.prev);
  let next         = $derived(data.next);
  let tier         = $derived(TIER_INFO[exp.tier]);
  let cat          = $derived(CATEGORY_INFO[exp.category]);
  let isWishlisted = $derived($wishlist.has(exp.id));
  let prerequisites    = $derived(data.prerequisites ?? []);
  let leadsTo          = $derived(data.leadsTo ?? []);
  let untriedPrereqs   = $derived(prerequisites.filter(p => !($progress[p.id]?.tried)));
</script>

<svelte:head>
  <title>{exp.title} — Arousalist</title>
  <meta name="description" content={exp.description} />
</svelte:head>

<article class="experience-page">

  {#if untriedPrereqs.length}
    <aside class="prereq-nudge">
      <span class="prereq-nudge-label">Try first</span>
      <div class="prereq-nudge-links">
        {#each untriedPrereqs as p}
          <a href="{base}/experiences/{p.id}" class="prereq-nudge-link">{p.title}</a>
        {/each}
      </div>
      <p class="prereq-nudge-note">This experience builds on {untriedPrereqs.length === 1 ? 'it' : 'them'}.</p>
    </aside>
  {/if}

  <div class="experience-intro">
    <div class="experience-badges">
      <span class="tier-badge tier-badge--{exp.tier}">{tier.icon} {tier.label}</span>
      <span class="cat-badge">{cat.label}</span>
    </div>
    <h1 class="experience-title">{exp.title}</h1>
  </div>

  <div class="content-block">
    <h2 class="block-heading">What you need</h2>
    <p>{exp.equipment}</p>
  </div>

  {#if exp.safetyNote}
    <aside class="safety-note">
      <span class="safety-icon">⚠</span>
      <p class="safety-text"><strong>Safety first:</strong> {exp.safetyNote}</p>
    </aside>
  {/if}

  <div class="content-block">
    <h2 class="block-heading">How to approach it</h2>
    <div class="instructions">
      {#each exp.instructions as inst}
        <div class="instruction instruction--{inst.type}">
          <h3 class="instruction-label">{inst.label}</h3>
          <p>{inst.content}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="explore-block">
    <h2 class="block-heading">Things to explore</h2>
    <ul>
      {#each exp.explore as item}
        <li>{item}</li>
      {/each}
    </ul>
  </div>

  <div class="why-block">
    <h2 class="why-heading">Why people love this</h2>
    <p>{exp.why}</p>
  </div>

  {#if prerequisites.length || leadsTo.length}
    <div class="pathway">
      {#if prerequisites.length}
        <div class="pathway-section">
          <span class="pathway-label">Try first</span>
          <div class="pathway-links">
            {#each prerequisites as p}
              <a href="{base}/experiences/{p.id}" class="pathway-link pathway-link--before">{p.title}</a>
            {/each}
          </div>
        </div>
      {/if}
      {#if leadsTo.length}
        <div class="pathway-section">
          <span class="pathway-label">Where this leads</span>
          <div class="pathway-links">
            {#each leadsTo as n}
              <a href="{base}/experiences/{n.id}" class="pathway-link pathway-link--after">{n.title}</a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Tracker -->
  <section class="tracker">
    <h2 class="tracker-title">Your record</h2>
    <p class="tracker-subtitle">Saved automatically. Private and local to your browser.</p>

    <div class="tracker-tried">
      <TriedToggle experienceId={exp.id} />
    </div>

    <div class="tracker-section">
      <button
        class="wishlist-toggle"
        class:is-wishlisted={isWishlisted}
        onclick={() => wishlist.toggle(exp.id)}
      >
        <span class="wishlist-heart">♥</span>
        {isWishlisted ? 'Saved to wishlist' : 'Save to wishlist'}
      </button>
    </div>

    <div class="tracker-section">
      <h3 class="tracker-section-heading">Rating</h3>
      <RatingWidget experienceId={exp.id} ratingTypes={exp.ratingTypes} />
    </div>

    <div class="tracker-section">
      <h3 class="tracker-section-heading">Notes</h3>
      <NotesField experienceId={exp.id} />
    </div>
  </section>

</article>

<!-- Sticky bottom nav -->
<nav class="exp-nav" aria-label="Experience navigation">
  <div class="exp-nav-inner">
    {#if prev}
      <a href="{base}/experiences/{prev.id}" class="exp-nav-link exp-nav-link--prev">
        <span class="nav-direction">← Previous</span>
        <span class="nav-title">{prev.title}</span>
      </a>
    {:else}
      <span></span>
    {/if}

    <a href="{base}/experiences" class="exp-nav-center">All Experiences</a>

    {#if next}
      <a href="{base}/experiences/{next.id}" class="exp-nav-link exp-nav-link--next">
        <span class="nav-direction">Next →</span>
        <span class="nav-title">{next.title}</span>
      </a>
    {:else}
      <span></span>
    {/if}
  </div>
</nav>

<style>
  .experience-page {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 3rem 1.5rem 0;
    width: 100%;
  }

  /* Prerequisite nudge */
  .prereq-nudge {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 0.75rem;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent-light);
    border-radius: var(--radius);
    padding: 0.9rem 1.25rem;
    margin-bottom: 2rem;
  }

  .prereq-nudge-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    font-family: var(--font-body);
    white-space: nowrap;
  }

  .prereq-nudge-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .prereq-nudge-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text);
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.2rem 0.65rem;
    text-decoration: none;
    transition: border-color var(--transition), color var(--transition);
  }
  .prereq-nudge-link:hover { border-color: var(--accent-light); color: var(--accent); }

  .prereq-nudge-note {
    font-size: 0.8rem;
    color: var(--text-muted);
    width: 100%;
    margin: 0;
    line-height: 1.4;
  }

  /* Intro */
  .experience-intro { margin-bottom: 2.5rem; }

  .experience-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .experience-title {
    font-family: var(--font-heading);
    font-size: clamp(1.75rem, 5vw, 2.75rem);
    line-height: 1.15;
  }

  /* Content blocks */
  .content-block { margin-bottom: 2.5rem; }

  .block-heading {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: var(--font-body);
    margin-bottom: 0.75rem;
  }

  .content-block p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text);
  }

  /* Instructions */
  .instructions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .instruction {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem 1.5rem;
  }
  .instruction--solo    { border-left: 3px solid var(--sage-light); }
  .instruction--partner { border-left: 3px solid var(--amber-light); }
  .instruction--single  { border-left: 3px solid var(--border); }

  .instruction-label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: var(--font-body);
    margin-bottom: 0.6rem;
  }

  .instruction p {
    font-size: 0.95rem;
    line-height: 1.7;
    max-width: none;
  }

  /* Safety note */
  .safety-note {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background: #FEF5EC;
    border: 1px solid #F5D9A8;
    border-radius: var(--radius);
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
  }
  .safety-icon { font-size: 1.25rem; flex-shrink: 0; line-height: 1.5; }
  .safety-text { font-size: 0.9rem; line-height: 1.6; color: #7A5100; max-width: none; }

  /* Explore */
  .explore-block {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-bottom: 2.5rem;
  }
  .explore-block ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
  }
  .explore-block li {
    font-size: 0.925rem;
    line-height: 1.55;
    color: var(--text-secondary);
    padding-left: 1.2em;
    position: relative;
  }
  .explore-block li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--text-muted);
  }

  /* Why */
  .why-block {
    background: var(--bg-raised);
    border-top: 3px solid var(--accent-light);
    border-radius: 0 0 var(--radius) var(--radius);
    padding: 1.5rem;
    margin-bottom: 0;
  }
  .why-heading {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    font-family: var(--font-body);
    margin-bottom: 0.75rem;
  }
  .why-block p {
    font-size: 0.975rem;
    line-height: 1.75;
    color: var(--text-secondary);
    font-style: italic;
    max-width: none;
  }

  /* Pathway */
  .pathway {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    padding: 1.25rem 1.5rem;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .pathway-section {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pathway-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: var(--font-body);
    white-space: nowrap;
    margin-right: 0.25rem;
  }

  .pathway-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .pathway-link {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.25rem 0.7rem;
    text-decoration: none;
    transition: border-color var(--transition), color var(--transition);
  }
  .pathway-link:hover {
    border-color: var(--accent-light);
    color: var(--accent);
  }
  .pathway-link--before::before { content: '← '; }
  .pathway-link--after::after  { content: ' →'; }

  /* Tracker */
  .tracker {
    border-top: 2px solid var(--border);
    margin-top: 3rem;
    padding: 2.5rem 0 4rem;
  }
  .tracker-title {
    font-family: var(--font-heading);
    font-size: clamp(1.25rem, 3vw, 1.6rem);
    margin-bottom: 0.4rem;
  }
  .tracker-subtitle {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    max-width: none;
  }
  .tracker-tried { margin-bottom: 1.5rem; }

  .wishlist-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: border-color var(--transition), color var(--transition), background var(--transition);
  }
  .wishlist-toggle:hover { border-color: var(--accent-light); color: var(--accent); }
  .wishlist-toggle.is-wishlisted {
    border-color: var(--accent-light);
    color: var(--accent);
    background: var(--bg-raised);
  }

  .wishlist-heart { font-size: 1rem; line-height: 1; }
  .tracker-section { margin-bottom: 2rem; }
  .tracker-section-heading {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: var(--font-body);
    margin-bottom: 1rem;
  }

  /* Nav */
  .exp-nav {
    background: var(--bg-surface);
    border-top: 1px solid var(--border);
    padding: 1.25rem 1.5rem;
    position: sticky;
    bottom: 0;
    z-index: 90;
  }

  .exp-nav-inner {
    max-width: var(--content-max);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1rem;
  }

  .exp-nav-link {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    transition: background var(--transition);
    color: inherit;
  }
  .exp-nav-link:hover { background: var(--bg-dim); }
  .exp-nav-link--next { align-items: flex-end; text-align: right; }

  .nav-direction {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .nav-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text);
    line-height: 1.3;
  }

  .exp-nav-center {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    white-space: nowrap;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    transition: all var(--transition);
  }
  .exp-nav-center:hover { background: var(--bg-dim); color: var(--accent); }

  @media (max-width: 600px) {
    .exp-nav-inner {
      grid-template-columns: 1fr 1fr;
    }
    .exp-nav-center { display: none; }
    .exp-nav-link--next { order: 2; }
  }
</style>
