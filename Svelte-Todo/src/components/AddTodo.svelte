<script lang="ts">
  import { supabase } from "../api/supabaseDates";

  type AddTodoType = (todo: string) => void;
  type ToggleCompletedType = (event: MouseEvent) => void;
  type TodosAmountType = number;

  export let addTodo;
  export let toggleCompleted: ToggleCompletedType;
  export let todosAmount: TodosAmountType;

  let todo = "";
  const handleSubmit = async () => {
    const { error } = await supabase.from("todos").insert([{ name: todo }]);
    if (error) throw console.error(error);
    await addTodo(todo);

    todo = "";
  };
</script>

<form on:submit|preventDefault="{handleSubmit}">
  {#if todosAmount > 0}
    <input
      on:click="{toggleCompleted}"
      type="checkbox"
      id="toggle-all"
      class="toggle-all"
    />
    <label aria-label="Mark all as complete" for="toggle-all">
      Mark all as complete
    </label>
  {/if}

  <input
    bind:value="{todo}"
    id="new-todo"
    class="new-todo"
    placeholder="What needs to be done?"
    type="text"
  />
</form>

<style>
  .new-todo {
    width: 100%;
    height: 40px;
    padding: var(--spacing-16);
    padding-left: 60px;
    font-size: var(--font-24);
    border: none;
    border-bottom: 1px solid var(--shadow-1);
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
  }
</style>
