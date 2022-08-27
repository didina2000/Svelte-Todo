<script lang="ts">
  import type { Todo } from "$root/types/todo";
  import { Textarea, MaterialApp, Checkbox } from "svelte-materialify";

  let todos: Todo[] = [
    { id: "1", text: "Todo 1", completed: true },
    { id: "2", text: "Todo 2", completed: false },
    { id: "3", text: "Todo 3", completed: false },
    { id: "4", text: "Todo 4", completed: false },
  ];
</script>

<main>
  <h1 class="title">To do</h1>

  <section class="todos">
    <form>
      <MaterialApp>
        <br />
        <Textarea autogrow rows="{1}">What needs to be done?</Textarea>
      </MaterialApp>
    </form>
    <br />
    <ul class="todo-list">
      {#each todos as todo (todo.id)}
        <div class="todo-item">
          <Checkbox
            checked="{todo.completed}"
            id="todo"
            class="toggle"
            type="checkbox"
            color="red"><span class="todo-text">{todo.text}</span></Checkbox
          >
        </div>
      {/each}
    </ul>
  </section>
</main>
