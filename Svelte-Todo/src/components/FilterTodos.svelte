<script lang="ts">
  import type { FiltersType } from "src/types/todo";

  type SetFilterType = (newFilter: string) => void;

  export let selectedFilter: FiltersType;
  export let setFilter: SetFilterType;

  let filters = ["All", "Active", "Completed"];
</script>

<div class="filters">
  {#each filters as filter}
    <button
      on:click="{() => setFilter(filter)}"
      class:selected="{selectedFilter === filter}"
      class="filter"
    >
      {filter}
    </button>
  {/each}
</div>

<style>
  .filters {
    display: flex;
    gap: var(--spacing-4);
  }

  .filter {
    border: none;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    background-color: #e7e7e7;
    color: black;
    border-radius: 4px;
    transition-duration: 0.4s;
    margin-right: 10px;
  }

  .filter:hover {
    border: 1px solid var(--color-highlight);
    background-color: #555555;
    color: white;
  }

  .selected {
    border-color: var(--color-highlight);
  }
</style>
