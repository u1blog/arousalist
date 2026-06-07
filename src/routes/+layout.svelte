<script>
  import '../app.css';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import AgeWarning from '$lib/components/AgeWarning.svelte';
  import { theme } from '$lib/stores.js';
  import { browser } from '$app/environment';

  let { children } = $props();

  $effect(() => {
    if (browser) {
      document.documentElement.setAttribute('data-theme', $theme);
    }
  });
</script>

<AgeWarning />
<SiteHeader />
<main>{@render children()}</main>
<SiteFooter />
