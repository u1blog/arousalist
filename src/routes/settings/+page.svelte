<script>
  import { theme } from '$lib/stores.js';
</script>

<svelte:head>
  <title>Settings — Kink Discovery Guide</title>
</svelte:head>

<div class="settings-page container">
  <header class="page-header">
    <h1>Settings</h1>
    <p>Adjust how the app looks and feels.</p>
  </header>

  <section class="settings-section">
    <h2 class="section-title">Appearance</h2>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">Theme</span>
        <span class="setting-desc">Choose between dark and light mode.</span>
      </div>

      <div class="theme-toggle" role="group" aria-label="Theme selection">
        <button
          class="theme-btn"
          class:is-active={$theme === 'dark'}
          onclick={() => theme.set('dark')}
          aria-pressed={$theme === 'dark'}
        >
          <span class="theme-icon">🌙</span>
          Dark
        </button>
        <button
          class="theme-btn"
          class:is-active={$theme === 'light'}
          onclick={() => theme.set('light')}
          aria-pressed={$theme === 'light'}
        >
          <span class="theme-icon">☀️</span>
          Light
        </button>
      </div>
    </div>
  </section>
</div>

<style>
  .settings-page {
    padding-top: 3rem;
    padding-bottom: 4rem;
    max-width: var(--content-max);
  }

  .page-header {
    margin-bottom: 2.5rem;
  }

  .page-header h1 {
    font-size: 2rem;
    margin-bottom: 0.4rem;
  }

  .page-header p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .settings-section {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .section-title {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid var(--border);
    background: var(--bg-dim);
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.25rem 1.25rem;
    flex-wrap: wrap;
  }

  .setting-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .setting-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text);
  }

  .setting-desc {
    font-size: 0.825rem;
    color: var(--text-secondary);
  }

  .theme-toggle {
    display: flex;
    gap: 0.5rem;
    background: var(--bg-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.3rem;
  }

  .theme-btn {
    display: flex;
    align-items: center;
    gap: 0.4em;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: transparent;
    border: none;
    border-radius: calc(var(--radius) - 3px);
    padding: 0.45rem 1rem;
    cursor: pointer;
    transition: background var(--transition), color var(--transition), box-shadow var(--transition);
  }

  .theme-btn:hover:not(.is-active) {
    color: var(--text);
    background: var(--bg-raised);
  }

  .theme-btn.is-active {
    background: var(--bg-surface);
    color: var(--text);
    box-shadow: var(--shadow);
  }

  .theme-icon {
    font-size: 0.95em;
    line-height: 1;
  }
</style>
