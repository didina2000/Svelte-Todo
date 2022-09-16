<script lang="ts">
  import type { ITodo } from "src/types/todo";

  type CompleteTodoType = (id: string) => void;
  type RemoveTodoType = (id: string) => void;
  type EditTodoType = (id: string, newTodo: string) => void;

  export let todo: ITodo;
  export let completeTodo: CompleteTodoType;
  export let removeTodo: RemoveTodoType;
  export let editTodo: EditTodoType;

  let editing = false;

  const toggleEdit = (): void => {
    editing = true;
  };

  const handleEdit = (event: KeyboardEvent, id: string): void => {
    let pressedKey = event.key;
    let targetElement = event.target as HTMLInputElement;
    let newTodo = targetElement.value;

    switch (pressedKey) {
      case "Escape":
        targetElement.blur();
        break;
      case "Enter":
        editTodo(id, newTodo);
        targetElement.blur();
        break;
    }
  };

  const handleBlur = (event: FocusEvent, id: string): void => {
    let targetElement = event.target as HTMLInputElement;
    let newTodo = targetElement.value;

    editTodo(id, newTodo);
    targetElement.blur();
    editing = false;
  };
</script>

<li class:editing class="todo">
  <div class="todo-item">
    <div>
      <input
        on:change="{() => completeTodo(todo.id)}"
        checked="{todo.completed}"
        id="todo"
        class="toggle"
        type="checkbox"
      />
      <label aria-label="Check todo" class="todo-check" for="todo"></label>
    </div>

    <span
      on:dblclick="{toggleEdit}"
      class:completed="{todo.completed}"
      class="todo-text">{todo.text}</span
    >
    <button
      aria-label="Remove todo"
      on:click="{() => removeTodo(todo.id)}"
      class="remove"></button>
  </div>
  {#if editing}
    <input
      on:keydown="{(event) => handleEdit(event, todo.id)}"
      on:blur="{(event) => handleBlur(event, todo.id)}"
      class="edit"
      type="text"
      value="{todo.text}"
    />
  {/if}
</li>

<style>
  :global(body) {
    background-color: lightseagreen;
    background-image: url("https://images.pexels.com/photos/5876208/pexels-photo-5876208.jpeg?cs=srgb&dl=pexels-marta-wave-5876208.jpg&fm=jpg");
  }
  .todo {
    font-size: var(--font-24);
    font-weight: 400;
    border-bottom: 1px solid #ededed;
  }

  .todo:last-child {
    border-bottom: none;
  }

  .todo-check,
  .todo-text {
    display: block;
    padding: var(--spacing-16);
    color: var(--color-gray-28);
    transition: color 0.4s;
  }

  .todo-check {
    border-radius: 100%;
  }

  .completed {
    color: var(--color-gray-58);
    text-decoration: line-through;
  }

  .todo-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 var(--spacing-8);
  }

  .editing .todo-item {
    display: none;
  }

  .edit {
    width: 100%;
    padding: var(--spacing-8);
    font-size: var(--font-24);
    border: 1px solid #999;
    border-radius: var(--radius-base);
    box-shadow: inset 0 -1px 5px 0 var(--shadow-1);
  }

  .toggle {
    position: absolute;
    top: 26px;
    left: 13px;
    transform: scale(2);
    opacity: 0;
  }

  .remove {
    display: none;
    margin-left: auto;
    font-size: var(--font-32);
    color: var(--color-gray-58);
    transition: color 0.2s ease-out;
  }

  .remove:hover {
    color: var(--color-highlight);
  }

  .remove:after {
    content: "Delete";
  }

  .todo:hover .remove {
    display: block;
  }
</style>
