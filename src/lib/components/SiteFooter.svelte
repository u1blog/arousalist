<script>
  import { progress } from '$lib/stores.js';

  let showConfirm = $state(false);

  function requestReset() { showConfirm = true; }
  function cancelReset()  { showConfirm = false; }
  function confirmReset() { progress.reset(); showConfirm = false; }
</script>

<footer class="site-footer">
  <div class="footer-inner container">
    <p class="footer-note">
      Your ratings, notes, and progress are stored only in your browser —
      private and local, never tracked or sent anywhere.
    </p>
    <div class="reset-area">
      {#if showConfirm}
        <span class="reset-confirm-text">Are you sure? This can't be undone.</span>
        <button onclick={cancelReset}  class="btn-cancel">Cancel</button>
        <button onclick={confirmReset} class="btn-confirm">Yes, clear it</button>
      {:else}
        <button onclick={requestReset} class="btn-reset">Clear all data</button>
      {/if}
    </div>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid var(--border);
    background: var(--bg-surface);
    padding: 2rem 0;
    margin-top: auto;
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .footer-note {
    font-size: 0.8rem;
    color: var(--text-muted);
    max-width: 50ch;
  }

  .reset-area {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  .reset-confirm-text {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .btn-reset {
    font-size: 0.8rem;
    color: var(--text-muted);
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.3rem 0.75rem;
    cursor: pointer;
    font-family: var(--font-body);
    transition: border-color var(--transition), color var(--transition);
  }
  .btn-reset:hover { border-color: var(--accent); color: var(--accent); }

  .btn-confirm {
    font-size: 0.8rem;
    color: white;
    background: var(--accent);
    border: none;
    border-radius: var(--radius-sm);
    padding: 0.3rem 0.75rem;
    cursor: pointer;
    font-family: var(--font-body);
    font-weight: 500;
  }

  .btn-cancel {
    font-size: 0.8rem;
    color: var(--text-secondary);
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.3rem 0.75rem;
    cursor: pointer;
    font-family: var(--font-body);
  }

  @media (max-width: 600px) {
    .footer-inner { flex-direction: column; align-items: flex-start; }
  }
</style>
