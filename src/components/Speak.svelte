<script>
  // Reads text aloud with the phone's built-in voice, so a young child can use the app.
  import { app } from '../lib/app.svelte.js';
  import { t } from '../lib/i18n.js';

  let { text, big = false } = $props();
  let speaking = $state(false);
  const supported = typeof speechSynthesis !== 'undefined';

  function speak() {
    if (speaking) {
      speechSynthesis.cancel();
      speaking = false;
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = app.settings.lang === 'en' ? 'en-GB' : 'nl-NL';
    u.rate = 0.9;
    u.onend = u.onerror = () => (speaking = false);
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    speaking = true;
  }
</script>

{#if supported}
  <button class="speak" class:big class:on={speaking} onclick={speak} aria-label={t('readAloud')}>
    <span aria-hidden="true">{speaking ? '⏹' : '🔊'}</span>
    {#if big}<span>{t('readAloud')}</span>{/if}
  </button>
{/if}

<style>
  .speak {
    border: none;
    background: var(--accent-soft);
    color: var(--ink);
    border-radius: 999px;
    padding: 0.4rem 0.7rem;
    font-size: 1.1rem;
    display: inline-flex;
    gap: 0.4rem;
    align-items: center;
  }
  .speak.big {
    font-size: 1.15rem;
    padding: 0.6rem 1rem;
    font-weight: 600;
  }
  .speak.on {
    background: var(--accent);
    color: #fff;
  }
</style>
