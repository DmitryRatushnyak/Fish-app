<script>
  let { n, max = 3, label = '' } = $props();
</script>

<span class="stars" aria-label="{label} {n}/{max}">
  {#each Array(max) as _, i}<span class:off={i >= n}>★</span>{/each}
</span>

<style>
  .stars {
    color: #f2a516;
    letter-spacing: 1px;
  }
  .off {
    color: var(--line);
  }
</style>
