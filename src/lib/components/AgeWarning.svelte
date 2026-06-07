<script>
  import { browser } from '$app/environment';

  const STORAGE_KEY = 'kdg_age_verified';

  let visible = $state(false);

  $effect(() => {
    if (browser && !localStorage.getItem(STORAGE_KEY)) {
      visible = true;
    }
  });

  function confirm() {
    localStorage.setItem(STORAGE_KEY, '1');
    visible = false;
  }

  function leave() {
    window.location.href = 'https://www.google.com';
  }
</script>

{#if visible}
  <div class="overlay" role="dialog" aria-modal="true" aria-labelledby="age-title">
    <div class="card">
      <p class="eyebrow">Adults only</p>
      <h1 id="age-title">This site contains mature content</h1>
      <p class="body">
        Arousalist is intended for adults aged 18 and older. By continuing,
        you confirm that you are at least 18 years old and consent to viewing
        adult-oriented material.
      </p>
      <div class="actions">
        <button class="btn-primary" onclick={confirm}>I'm 18 or older — continue</button>
        <button class="btn-ghost" onclick={leave}>Leave</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: var(--bg-page);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .card {
    max-width: 480px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .eyebrow {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
  }

  h1 {
    font-family: var(--font-heading);
    font-size: clamp(1.6rem, 5vw, 2.25rem);
    font-weight: 500;
    color: var(--text);
    margin: 0;
    line-height: 1.2;
  }

  .body {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    max-width: 400px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    margin-top: 0.5rem;
  }

  .btn-primary {
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    padding: 0.85rem 1.5rem;
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: background var(--transition);
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  .btn-primary:hover {
    background: var(--accent-hover);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.85rem 1.5rem;
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 400;
    cursor: pointer;
    transition: color var(--transition), border-color var(--transition);
    width: 100%;
  }

  .btn-ghost:hover {
    color: var(--text);
    border-color: var(--text-muted);
  }
</style>
