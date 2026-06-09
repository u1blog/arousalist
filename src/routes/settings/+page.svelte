<script>
  import { theme, progress, wishlist, guidedPrefs } from '$lib/stores.js';
  import { vaultState, setupVault, removeVault, changePassphrase, clearVaultStorage } from '$lib/vault.js';

  // ── Data reset ───────────────────────────────────────────────
  let showConfirm = $state(false);

  function requestReset() { showConfirm = true; }
  function cancelReset()  { showConfirm = false; }
  function confirmReset() {
    progress.reset();
    wishlist.reset();
    guidedPrefs.reset();
    clearVaultStorage();
    showConfirm = false;
  }

  // ── Passphrase setup ─────────────────────────────────────────
  let showSetupForm = $state(false);
  let setupPassphrase = $state('');
  let setupConfirm = $state('');
  let setupError = $state('');
  let setupLoading = $state(false);

  function startSetup() { showSetupForm = true; setupError = ''; }
  function cancelSetup() { showSetupForm = false; setupPassphrase = ''; setupConfirm = ''; setupError = ''; }

  async function doSetup() {
    if (setupPassphrase.length < 8) { setupError = 'Password must be at least 8 characters.'; return; }
    if (setupPassphrase !== setupConfirm) { setupError = 'Passwords do not match.'; return; }
    setupLoading = true;
    setupError = '';
    try {
      await setupVault(setupPassphrase);
      cancelSetup();
    } catch {
      setupError = 'Something went wrong. Please try again.';
    } finally {
      setupLoading = false;
    }
  }

  // ── Passphrase removal ───────────────────────────────────────
  let showRemoveConfirm = $state(false);
  let removeLoading = $state(false);
  let removeError = $state('');

  function requestRemove() { showRemoveConfirm = true; removeError = ''; }
  function cancelRemove() { showRemoveConfirm = false; removeError = ''; }

  async function doRemove() {
    removeLoading = true;
    removeError = '';
    try {
      await removeVault();
      showRemoveConfirm = false;
    } catch {
      removeError = 'Something went wrong. Please try again.';
    } finally {
      removeLoading = false;
    }
  }

  // ── Passphrase change ────────────────────────────────────────
  let showChangeForm = $state(false);
  let changeNew = $state('');
  let changeConfirm = $state('');
  let changeError = $state('');
  let changeLoading = $state(false);

  function startChange() { showChangeForm = true; changeError = ''; }
  function cancelChange() { showChangeForm = false; changeNew = ''; changeConfirm = ''; changeError = ''; }

  async function doChange() {
    if (changeNew.length < 8) { changeError = 'Password must be at least 8 characters.'; return; }
    if (changeNew !== changeConfirm) { changeError = 'Passwords do not match.'; return; }
    changeLoading = true;
    changeError = '';
    try {
      await changePassphrase(changeNew);
      cancelChange();
    } catch {
      changeError = 'Something went wrong. Please try again.';
    } finally {
      changeLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Settings — Arousalist</title>
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

  <section class="settings-section">
    <h2 class="section-title">Privacy</h2>

    {#if !$vaultState.enabled}
      <!-- No vault set up -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">Password lock</span>
          <span class="setting-desc">
            Encrypt your ratings and notes so no one else can read them on this device.
          </span>
        </div>
        {#if !showSetupForm}
          <button onclick={startSetup} class="btn-reset">Set password</button>
        {/if}
      </div>

      {#if showSetupForm}
        <div class="passphrase-form">
          <input
            class="pp-input"
            type="password"
            bind:value={setupPassphrase}
            placeholder="New password (8+ characters)"
            autocomplete="new-password"
            disabled={setupLoading}
          />
          <input
            class="pp-input"
            type="password"
            bind:value={setupConfirm}
            placeholder="Confirm password"
            autocomplete="new-password"
            disabled={setupLoading}
          />
          {#if setupError}<p class="pp-error">{setupError}</p>{/if}
          <div class="pp-actions">
            <button onclick={cancelSetup} class="btn-cancel" disabled={setupLoading}>Cancel</button>
            <button onclick={doSetup} class="btn-confirm" disabled={setupLoading || !setupPassphrase || !setupConfirm}>
              {setupLoading ? 'Encrypting…' : 'Enable'}
            </button>
          </div>
          <p class="pp-hint">Your password is never stored. If you forget it, your data cannot be recovered.</p>
        </div>
      {/if}

    {:else if !$vaultState.locked}
      <!-- Vault enabled and unlocked -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">Password lock</span>
          <span class="setting-desc">Your data is encrypted. It will be locked when you close this tab.</span>
        </div>
        <div class="vault-actions">
          {#if !showChangeForm && !showRemoveConfirm}
            <button onclick={startChange} class="btn-reset">Change</button>
            <button onclick={requestRemove} class="btn-reset">Remove</button>
          {/if}
        </div>
      </div>

      {#if showChangeForm}
        <div class="passphrase-form">
          <input
            class="pp-input"
            type="password"
            bind:value={changeNew}
            placeholder="New password (8+ characters)"
            autocomplete="new-password"
            disabled={changeLoading}
          />
          <input
            class="pp-input"
            type="password"
            bind:value={changeConfirm}
            placeholder="Confirm new password"
            autocomplete="new-password"
            disabled={changeLoading}
          />
          {#if changeError}<p class="pp-error">{changeError}</p>{/if}
          <div class="pp-actions">
            <button onclick={cancelChange} class="btn-cancel" disabled={changeLoading}>Cancel</button>
            <button onclick={doChange} class="btn-confirm" disabled={changeLoading || !changeNew || !changeConfirm}>
              {changeLoading ? 'Saving…' : 'Save new password'}
            </button>
          </div>
        </div>
      {/if}

      {#if showRemoveConfirm}
        <div class="passphrase-form">
          <p class="pp-hint">This will decrypt your data and remove the passphrase lock. Are you sure?</p>
          {#if removeError}<p class="pp-error">{removeError}</p>{/if}
          <div class="pp-actions">
            <button onclick={cancelRemove} class="btn-cancel" disabled={removeLoading}>Cancel</button>
            <button onclick={doRemove} class="btn-confirm" disabled={removeLoading}>
              {removeLoading ? 'Removing…' : 'Yes, remove it'}
            </button>
          </div>
        </div>
      {/if}

    {:else}
      <!-- Vault enabled but locked (user somehow got to settings while locked) -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">Password lock</span>
          <span class="setting-desc">Your data is encrypted. Unlock the app to manage your password.</span>
        </div>
      </div>
    {/if}
  </section>

  <section class="settings-section">
    <h2 class="section-title">Data</h2>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">Clear all data</span>
        <span class="setting-desc">Permanently delete all ratings, notes, and progress. This cannot be undone.</span>
      </div>

      <div class="reset-area">
        {#if showConfirm}
          <span class="reset-confirm-text">Are you sure?</span>
          <button onclick={cancelReset} class="btn-cancel">Cancel</button>
          <button onclick={confirmReset} class="btn-confirm">Yes, clear it</button>
        {:else}
          <button onclick={requestReset} class="btn-reset">Clear all data</button>
        {/if}
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

  .settings-section + .settings-section {
    margin-top: 1.5rem;
  }

  .reset-area {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  .reset-confirm-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  /* ── Passphrase form ──────────────────────────────────── */

  .vault-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .passphrase-form {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1rem 1.25rem 1.25rem;
    border-top: 1px solid var(--border);
  }

  .pp-input {
    width: 100%;
    padding: 0.6rem 0.85rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--text);
    background: var(--bg-page);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-sizing: border-box;
    outline: none;
    transition: border-color var(--transition);
  }

  .pp-input:focus {
    border-color: var(--accent);
  }

  .pp-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .pp-error {
    font-size: 0.825rem;
    color: var(--accent);
    margin: 0;
  }

  .pp-hint {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
  }

  /* ── Shared buttons ───────────────────────────────────── */

  .btn-reset {
    font-size: 0.875rem;
    color: var(--text-muted);
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.45rem 1rem;
    cursor: pointer;
    font-family: var(--font-body);
    transition: border-color var(--transition), color var(--transition);
  }
  .btn-reset:hover { border-color: var(--accent); color: var(--accent); }

  .btn-confirm {
    font-size: 0.875rem;
    color: white;
    background: var(--accent);
    border: none;
    border-radius: var(--radius-sm);
    padding: 0.45rem 1rem;
    cursor: pointer;
    font-family: var(--font-body);
    font-weight: 500;
    transition: opacity var(--transition);
  }

  .btn-confirm:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-cancel {
    font-size: 0.875rem;
    color: var(--text-secondary);
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.45rem 1rem;
    cursor: pointer;
    font-family: var(--font-body);
  }
</style>
