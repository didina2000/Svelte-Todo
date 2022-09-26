<script lang="ts">
  type ClearCompletedType = () => void;
  type CompletedTodosType = number;

  export let clearCompleted: ClearCompletedType;
  export let completedTodos: CompletedTodosType;
</script>

<button
  on:click="{clearCompleted}"
  class:hidden="{completedTodos === 0}"
  class="clear-completed"
>
  Clear completed
</button>

<style>
  .clear-completed {
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
  }

  .clear-completed:hover {
    border: 1px solid var(--color-highlight);
    background-color: #555555; /* Green */
    color: white;
  }
</style>
