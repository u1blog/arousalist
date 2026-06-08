<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { wishlist } from '$lib/stores.js';

  let wishlistCount = $derived([...$wishlist].length);
</script>

<header class="site-header">
  <nav class="site-nav container">
    <a href="{base}/" class="nav-logo">
      <img src="/arousalisticon.png" alt="" class="nav-logo-icon" />
      Arousalist
    </a>
    <div class="nav-links">
      <a
        href="{base}/experiences"
        class="nav-link"
        class:nav-link--active={$page.url.pathname.startsWith(base + '/experiences')}
      >
        Browse
      </a>
      <a
        href="{base}/wishlist"
        class="nav-link"
        class:nav-link--active={$page.url.pathname === base + '/wishlist'}
      >
        Wishlist
        {#if wishlistCount > 0}
          <span class="nav-badge">{wishlistCount}</span>
        {/if}
      </a>
      <a
        href="{base}/settings"
        class="nav-link"
        class:nav-link--active={$page.url.pathname === base + '/settings'}
      >
        Settings
      </a>
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
    overflow-x: auto;
    scrollbar-width: none;
  }

  .site-header::-webkit-scrollbar {
    display: none;
  }

  .site-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
    min-width: max-content;
  }

  .nav-logo {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .nav-logo:hover { color: var(--accent); }

  .nav-logo-icon {
    width: 24px;
    height: 24px;
    display: block;
    margin-right: 0.35rem;
  }

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
    white-space: nowrap;
  }
  .nav-link:hover, .nav-link--active { color: var(--accent); }

  .nav-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 100px;
    background: var(--accent);
    color: white;
    font-size: 0.65rem;
    font-weight: 700;
    line-height: 1;
    vertical-align: middle;
    margin-left: 0.1rem;
  }

</style>
