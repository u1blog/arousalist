<script>
  import { base } from '$app/paths';
  import { wishlist } from '$lib/stores.js';
  import { EXPERIENCES } from '$lib/data.js';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';

  let wishlisted = $derived(EXPERIENCES.filter(e => $wishlist.has(e.id)));
</script>

<svelte:head>
  <title>Wishlist — Arousalist</title>
  <meta name="description" content="Experiences you've saved to your wishlist." />
</svelte:head>

<div class="wishlist-header">
  <div class="container">
    <h1 class="wishlist-title">Wishlist</h1>
    <p class="wishlist-subtitle">
      {#if wishlisted.length}
        {wishlisted.length} {wishlisted.length === 1 ? 'experience' : 'experiences'} saved
      {:else}
        Nothing saved yet
      {/if}
    </p>
  </div>
</div>

<div class="wishlist-body">
  <div class="container">
    {#if wishlisted.length}
      <div class="experience-grid">
        {#each wishlisted as experience (experience.id)}
          <ExperienceCard {experience} />
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        <p class="empty-message">
          Tap the <span class="heart-example">♥</span> on any experience to add it here.
        </p>
        <a href="{base}/experiences" class="btn-browse">Browse experiences</a>
      </div>
    {/if}
  </div>
</div>

<style>
  .wishlist-header {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    padding: 1.5rem 0 1.5rem;
  }

  .wishlist-title {
    font-family: var(--font-heading);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: 0.4rem;
  }

  .wishlist-subtitle {
    font-size: 0.95rem;
    color: var(--text-secondary);
    max-width: none;
  }

  .wishlist-body { padding: 2.5rem 0 5rem; }

  .experience-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .empty-state {
    text-align: center;
    padding: 5rem 1rem;
    color: var(--text-muted);
  }

  .empty-message {
    font-size: 0.975rem;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
    max-width: none;
  }

  .heart-example {
    color: var(--accent);
    font-size: 1.1em;
  }

  .btn-browse {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--accent);
    border: 1px solid var(--accent-light);
    border-radius: var(--radius-sm);
    padding: 0.6rem 1.25rem;
    text-decoration: none;
    transition: background var(--transition), color var(--transition);
  }
  .btn-browse:hover {
    background: var(--accent);
    color: white;
  }

  @media (max-width: 700px) {
    .experience-grid { grid-template-columns: 1fr; }
  }
</style>
