<script>
  import { progress } from '$lib/stores.js';

  let { experienceId } = $props();

  let value = $state('');
  let saveTimer;
  let textarea;

  $effect(() => {
    value = $progress[experienceId]?.notes ?? '';
  });

  function handleInput() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      progress.updateExperience(experienceId, { notes: value });
    }, 500);
    // auto-grow
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }
</script>

<textarea
  bind:this={textarea}
  bind:value
  oninput={handleInput}
  placeholder="Your observations — what worked, what didn't, what surprised you..."
  rows="4"
></textarea>

<style>
  textarea {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 0.875rem 1rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text);
    background: var(--bg-surface);
    resize: none;
    overflow: hidden;
    transition: border-color var(--transition);
    min-height: 100px;
  }

  textarea:focus {
    outline: none;
    border-color: var(--border-focus);
  }

  textarea::placeholder {
    color: var(--text-muted);
    font-style: italic;
  }
</style>
