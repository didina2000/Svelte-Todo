<script lang="ts">
  import AddTodo from "./AddTodo.svelte";
  import Todo from "./Todo.svelte";
  import type { FiltersType, ITodo } from "src/types/todo";
  import FilterTodos from "./FilterTodos.svelte";
  import ClearTodos from "./ClearTodos.svelte";

  let todos: ITodo[] = [
    { id: "1", text: "Todo 1", completed: true },
    { id: "2", text: "Todo 2", completed: false },
    { id: "3", text: "Todo 3", completed: false },
    { id: "4", text: "Todo 4", completed: false },
  ];

  let selectedFilter: FiltersType = "all";

  $: todosAmount = todos.length;
  $: filteredTodos = filterTodos(todos, selectedFilter);
  $: completedTodos = todos.filter((todo) => todo.completed).length;

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

  const removeTodo = (id: string): void => {
    todos = todos.filter((todo) => todo.id !== id);
  };

  const editTodo = (id: string, newTodo: string): void => {
    let currentTodo = todos.findIndex((todo) => todo.id === id);
    todos[currentTodo].text = newTodo;
  };

  const setFilter = (newFilter: FiltersType): void => {
    selectedFilter = newFilter;
  };

  const filterTodos = (todos: ITodo[], filter: FiltersType): ITodo[] => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
    }
  };

  const clearCompleted = (): void => {
    todos = todos.filter((todo) => todo.completed !== true);
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
        {#each filteredTodos as todo (todo.id)}
          <Todo
            todo="{todo}"
            completeTodo="{completeTodo}"
            removeTodo="{removeTodo}"
            editTodo="{editTodo}"
          />
        {/each}
      </ul>

      <div class="actions">
        <span class="todo-count">0 left</span>
        <FilterTodos
          selectedFilter="{selectedFilter}"
          setFilter="{setFilter}"
        />
        <ClearTodos
          clearCompleted="{clearCompleted}"
          completedTodos="{completedTodos}"
        />
      </div>
    {/if}
  </section>
</main>
