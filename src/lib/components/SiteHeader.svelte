<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { progress } from '$lib/stores.js';
  import { EXPERIENCES } from '$lib/data.js';

  let tried = $derived(EXPERIENCES.filter(e => $progress[e.id]?.tried).length);
</script>

<header class="site-header">
  <nav class="site-nav container">
    <a href="{base}/" class="nav-logo">Arousalist</a>
    <div class="nav-links">
      <a
        href="{base}/experiences"
        class="nav-link"
        class:nav-link--active={$page.url.pathname.startsWith(base + '/experiences')}
      >
        Browse
      </a>
      <a
        href="{base}/settings"
        class="nav-link"
        class:nav-link--active={$page.url.pathname === base + '/settings'}
      >
        Settings
      </a>
      <span class="header-progress">{tried}/{EXPERIENCES.length} tried</span>
    </div>
  </nav>
</header>

<style>
  .site-header {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
    height: 62px;
    display: flex;
    align-items: center;
  }

  .site-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-logo {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    flex-shrink: 0;
  }
  .nav-logo:hover { color: var(--accent); }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;
  }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition);
  }
  .nav-link:hover, .nav-link--active { color: var(--accent); }

  .header-progress {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-muted);
    background: var(--bg-dim);
    padding: 0.25rem 0.7rem;
    border-radius: 100px;
  }
</style>
