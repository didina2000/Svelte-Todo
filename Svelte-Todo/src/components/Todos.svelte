<script lang="ts">
  import type { ITodo } from "$root/types/todo";
  import AddTodo from "./AddTodo.svelte";
  import Todo from "./Todo.svelte";

  let todos: ITodo[] = [
    { id: "1", text: "Todo 1", completed: true },
    { id: "2", text: "Todo 2", completed: false },
    { id: "3", text: "Todo 3", completed: false },
    { id: "4", text: "Todo 4", completed: false },
  ];

  $: todosAmount = todos.length;

  const generateRandomId = (): string => {
    return Math.random().toString(16).slice(2);
  };

  const addTodo = (todo: string) => {
    let newTodo: ITodo = {
      id: generateRandomId(),
      text: todo,
      completed: false,
    };
    todos = [...todos, newTodo];
  };

  const toggleCompleted = (event: MouseEvent): void => {
    let { checked } = event.target as HTMLInputElement;

    todos = todos.map((todo) => ({
      ...todo,
      completed: checked,
    }));
  };

  const completeTodo = (id: string): void => {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  };
</script>

<main>
  <h1 class="title">To do</h1>

  <section class="todos">
    <AddTodo
      addTodo="{addTodo}"
      toggleCompleted="{toggleCompleted}"
      todosAmount="{todosAmount}"
    />
    {#if todosAmount}
      <ul class="todo-list">
        {#each todos as todo (todo.id)}
          <Todo todo="{todo}" completeTodo="{completeTodo}" />
          <li class="todo">
            <div class="todo-item">
              <div>
                <input
                  checked="{todo.completed}"
                  id="todo"
                  class="toggle"
                  type="checkbox"
                />
                <label aria-label="Check todo" class="todo-check" for="todo"
                ></label>
              </div>
              <span class="todo-text">{todo.text}</span>
              <button aria-label="Remove todo" class="remove"></button>
            </div>
          </li>
        {/each}
      </ul>

      <div class="actions">
        <span class="todo-count">0 left</span>
        <div class="filters">
          <button class="filter">All</button>
          <button class="filter">Active</button>
          <button class="filter">Completed</button>
        </div>
        <button class="clear-completed">Clear completed</button>
      </div>
    {/if}
  </section>
</main>
