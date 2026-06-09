<script>
  import { base } from '$app/paths';
  import { EXPERIENCES } from '$lib/data.js';
  const count = EXPERIENCES.length;
</script>

<svelte:head>
  <title>Arousalist</title>
  <meta name="description" content="A structured, judgment-free guide to exploring what you're into — solo or with a partner." />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <p class="hero-eyebrow">A personal discovery guide</p>
  <h1 class="hero-title">Explore what<br><em>you're into</em></h1>
  <p class="hero-subtitle">
    {count} structured experiences — solo or with a partner — with a simple rating system to
    help you build honest self-knowledge about what you respond to and why.
  </p>
  <div class="hero-ctas">
    <a href="{base}/experiences" class="btn-primary">Browse the Experiences →</a>
    <a href="{base}/guided" class="btn-secondary">Not sure where to start? →</a>
  </div>
</section>

<!-- How it works -->
<section class="how-section">
  <div class="container">
    <p class="section-label">How it works</p>
    <h2 class="section-title">Three simple steps</h2>
    <div class="how-grid">
      <div class="how-card">
        <div class="how-card-icon">🧭</div>
        <div class="how-card-title">Try it</div>
        <p class="how-card-text">Each experience has clear instructions — equipment, what to do, and how to approach it solo or with a partner. Go at your own pace.</p>
      </div>
      <div class="how-card">
        <div class="how-card-icon">📋</div>
        <div class="how-card-title">Rate it</div>
        <p class="how-card-text">After each experience, give it a rating from 🙅 to 🔥 — separately for solo and partner versions, and for giver and receiver roles where relevant.</p>
      </div>
      <div class="how-card">
        <div class="how-card-icon">🔍</div>
        <div class="how-card-title">Keep what works</div>
        <p class="how-card-text">Adopt what resonates, discard the rest. The goal isn't to like everything — it's to know yourself better.</p>
      </div>
    </div>
  </div>
</section>

<!-- Rating system -->
<section class="rating-section">
  <div class="container">
    <p class="section-label">The rating system</p>
    <h2 class="section-title">Four honest options</h2>
    <p class="section-desc">No right answers. The goal is accurate self-knowledge — so a 🙅 is as useful as a 🔥.</p>
    <div class="rating-table">
      <div class="rating-item rating-item--no">
        <div class="rating-symbol-large">🙅</div>
        <div class="rating-item-label">Not for me</div>
        <div class="rating-item-desc">Tried it, didn't produce anything worth returning to.</div>
      </div>
      <div class="rating-item rating-item--curious">
        <div class="rating-symbol-large">?</div>
        <div class="rating-item-label">Curious</div>
        <div class="rating-item-desc">Something was there. Would try again or go further.</div>
      </div>
      <div class="rating-item rating-item--yes">
        <div class="rating-symbol-large">✅</div>
        <div class="rating-item-label">Yes</div>
        <div class="rating-item-desc">I liked this. Worth incorporating.</div>
      </div>
      <div class="rating-item rating-item--yes-plus">
        <div class="rating-symbol-large">🔥</div>
        <div class="rating-item-label">Really yes</div>
        <div class="rating-item-desc">I really liked this. I want more of this.</div>
      </div>
    </div>
  </div>
</section>

<!-- Tiers -->
<section class="tier-section">
  <div class="container">
    <p class="section-label">Experience tiers</p>
    <h2 class="section-title">Solo, together, or both</h2>
    <p class="section-desc">Each experience is flagged for how well it works solo versus with a partner. The solo version isn't just a fallback — it gives you useful baseline information.</p>
    <div class="tier-list">
      <div class="tier-item">
        <div class="tier-item-icon">🧍</div>
        <div>
          <div class="tier-item-title">Solo</div>
          <p class="tier-item-desc">Try this alone first to understand your baseline response before involving a partner.</p>
        </div>
      </div>
      <div class="tier-item">
        <div class="tier-item-icon">🧍•👫</div>
        <div>
          <div class="tier-item-title">Solo or partnered</div>
          <p class="tier-item-desc">Equally rewarding alone or with a partner — both are complete experiences.</p>
        </div>
      </div>
      <div class="tier-item">
        <div class="tier-item-icon">🧍→👫</div>
        <div>
          <div class="tier-item-title">Better with a partner</div>
          <p class="tier-item-desc">The solo version is useful groundwork, but a partner unlocks the real experience — unpredictability, the relational dynamic, someone else in control.</p>
        </div>
      </div>
      <div class="tier-item">
        <div class="tier-item-icon">👫</div>
        <div>
          <div class="tier-item-title">Partner only</div>
          <p class="tier-item-desc">The dynamic between two people is the point. These experiences don't really work alone — the interaction itself is what you're exploring.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Consent -->
<section class="consent-section">
  <div class="container consent-inner">
    <h2>A note on consent and safety</h2>
    <p>Every experience involving a partner should begin with a clear conversation about what you're trying, what you want to pay attention to, and how you'll communicate if something isn't working. Agree on a signal or word to pause or stop — and use it.</p>
    <p>This is a guide for curious adults exploring consensually. Go slowly, pay attention to your body, and don't push through anything that feels genuinely uncomfortable. The purpose is self-knowledge, not endurance.</p>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="container" style="text-align:center">
    <h2>Ready to start?</h2>
    <p>Browse all {count} experiences, filter by tier or type, and track your progress as you go. Your data stays in your browser — private, local, and never shared.</p>
    <a href="{base}/experiences" class="btn-primary">Explore the Experiences →</a>
  </div>
</section>

<style>
  /* Hero */
  .hero {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    padding: 5rem 1.5rem 4.5rem;
    text-align: center;
  }
  .hero-ctas {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-secondary {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition);
  }
  .btn-secondary:hover { color: var(--accent); }

  .hero-eyebrow {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 auto 1.25rem;
  }
  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 1.25rem;
    max-width: 18ch;
    margin-left: auto;
    margin-right: auto;
  }
  .hero-title em { font-style: italic; color: var(--accent); }
  .hero-subtitle {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 52ch;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  /* Shared section scaffolding */
  .section-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }
  .section-title {
    font-family: var(--font-heading);
    font-size: clamp(1.6rem, 3vw, 2.25rem);
    margin-bottom: 1rem;
  }
  .section-desc {
    font-size: 0.95rem;
    color: var(--text-secondary);
    max-width: 56ch;
    margin-bottom: 2rem;
  }

  /* How it works */
  .how-section { padding: 5rem 0; }
  .how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .how-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2rem 1.5rem;
  }
  .how-card-icon { font-size: 2rem; margin-bottom: 1rem; }
  .how-card-title { font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 0.5rem; }
  .how-card-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; max-width: none; }

  /* Rating system */
  .rating-section {
    background: var(--bg-surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 5rem 0;
  }
  .rating-table {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }
  .rating-item {
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1.5rem;
    border-radius: var(--radius);
    border: 1px solid var(--border);
  }
  .rating-item--no       { background: var(--rating-no-bg); }
  .rating-item--curious  { background: var(--rating-curious-bg); }
  .rating-item--yes      { background: var(--rating-yes-bg); }
  .rating-item--yes-plus { background: var(--rating-yes-plus-bg); }

  .rating-symbol-large {
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.6rem;
    font-family: var(--font-body);
  }
  .rating-item--no .rating-symbol-large        { color: var(--rating-no-color); }
  .rating-item--curious .rating-symbol-large   { color: var(--rating-curious-color); }
  .rating-item--yes .rating-symbol-large       { color: var(--rating-yes-color); }
  .rating-item--yes-plus .rating-symbol-large  { color: var(--rating-yes-plus-color); }

  .rating-item-label { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem; }
  .rating-item-desc { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; }

  /* Tiers */
  .tier-section { padding: 5rem 0; }
  .tier-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
  .tier-item {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.25rem 1.5rem;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
  .tier-item-icon { font-size: 1.5rem; flex-shrink: 0; padding-top: 0.1rem; }
  .tier-item-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 0.25rem; }
  .tier-item-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; max-width: none; }

  /* Consent */
  .consent-section {
    background: var(--bg-dim);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 3rem 0;
  }
  .consent-inner { max-width: 640px; }
  .consent-inner h2 { font-size: 1.3rem; margin-bottom: 1rem; }
  .consent-inner p { font-size: 0.925rem; color: var(--text-secondary); line-height: 1.7; max-width: none; }
  .consent-inner p + p { margin-top: 0.75rem; }

  /* CTA */
  .cta-section { padding: 6rem 0; }
  .cta-section h2 { font-family: var(--font-heading); font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: 1rem; }
  .cta-section p { color: var(--text-secondary); margin: 0 auto 2.5rem; font-size: 1rem; max-width: 48ch; }

  @media (max-width: 700px) {
    .how-grid { grid-template-columns: 1fr; }
    .rating-table { grid-template-columns: 1fr 1fr; }
    .hero { padding: 3.5rem 1.25rem 3rem; }
  }
  @media (max-width: 480px) {
    .rating-table { grid-template-columns: 1fr; }
  }
</style>
