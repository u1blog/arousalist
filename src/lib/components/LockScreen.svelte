<script>
  import { vaultState, unlockVault, getKey, decryptAll } from '$lib/vault.js';
  import { progress, wishlist, guidedPrefs } from '$lib/stores.js';

  let passphrase = $state('');
  let error = $state('');
  let loading = $state(false);
  let inputEl = $state(null);

  $effect(() => {
    if ($vaultState.locked && inputEl) inputEl.focus();
  });

  async function submit() {
    if (!passphrase || loading) return;
    loading = true;
    error = '';
    try {
      const key = await unlockVault(passphrase);
      const data = await decryptAll(key);
      if (data['kdg_progress']) progress.load(JSON.parse(data['kdg_progress']));
      if (data['kdg_wishlist']) wishlist.load(new Set(JSON.parse(data['kdg_wishlist'])));
      if (data['kdg_guided']) guidedPrefs.load(JSON.parse(data['kdg_guided']));
    } catch (e) {
      error = e.message === 'Wrong passphrase' ? 'Incorrect password.' : 'Something went wrong.';
      passphrase = '';
    } finally {
      loading = false;
    }
  }
</script>

{#if $vaultState.locked}
  <div class="overlay" role="dialog" aria-modal="true" aria-labelledby="lock-title">
    <div class="card">
      <p class="eyebrow">Locked</p>
      <h1 id="lock-title">Your data is protected</h1>
      <p class="body">Enter your password to access your ratings and notes.</p>

      <form class="form" onsubmit={e => { e.preventDefault(); submit(); }}>
        <input
          bind:this={inputEl}
          class="input"
          type="password"
          bind:value={passphrase}
          placeholder="Password"
          autocomplete="current-password"
          disabled={loading}
        />
        {#if error}
          <p class="error">{error}</p>
        {/if}
        <button class="btn-primary" type="submit" disabled={loading || !passphrase}>
          {loading ? 'Unlocking…' : 'Unlock'}
        </button>
      </form>
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
    max-width: 420px;
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
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    margin-top: 0.5rem;
  }

  .input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--text);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-sizing: border-box;
    outline: none;
    transition: border-color var(--transition);
  }

  .input:focus {
    border-color: var(--accent);
  }

  .error {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--accent);
    margin: 0;
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
    transition: background var(--transition), opacity var(--transition);
    width: 100%;
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--accent-hover);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
