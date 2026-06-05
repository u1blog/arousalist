<script>
  import { progress } from '$lib/stores.js';

  let { experienceId } = $props();

  let tried = $derived($progress[experienceId]?.tried ?? false);

  function toggle() {
    progress.updateExperience(experienceId, { tried: !tried });
  }
</script>

<label class="tried-toggle">
  <input type="checkbox" checked={tried} onchange={toggle} />
  <span class="tried-box"></span>
  <span class="tried-label">{tried ? "I've tried this" : "Mark as tried"}</span>
</label>

<style>
  .tried-toggle {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    cursor: pointer;
    width: fit-content;
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .tried-box {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 2px solid var(--border);
    background: var(--bg-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all var(--transition);
  }

  .tried-box::after {
    content: '✓';
    font-size: 0.9rem;
    font-weight: 700;
    color: white;
    opacity: 0;
    transition: opacity var(--transition);
  }

  input:checked ~ .tried-box {
    background: var(--sage);
    border-color: var(--sage);
  }

  input:checked ~ .tried-box::after { opacity: 1; }

  .tried-toggle:hover .tried-box { border-color: var(--sage); }

  .tried-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-secondary);
    user-select: none;
    transition: color var(--transition);
  }

  input:checked ~ .tried-label { color: var(--sage); }
</style>
