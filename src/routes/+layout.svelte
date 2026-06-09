<script>
  import '../app.css';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import AgeWarning from '$lib/components/AgeWarning.svelte';
  import LockScreen from '$lib/components/LockScreen.svelte';
  import { theme } from '$lib/stores.js';
  import { browser } from '$app/environment';
  import { initVault } from '$lib/vault.js';

  let { children } = $props();

  $effect(() => {
    if (browser) {
      document.documentElement.setAttribute('data-theme', $theme);
      initVault();
    }
  });
</script>

<AgeWarning />
<LockScreen />
<SiteHeader />
<main>{@render children()}</main>
<SiteFooter />
