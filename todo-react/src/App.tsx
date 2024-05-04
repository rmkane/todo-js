import { useState } from "react";
import { v4 as uuid } from "uuid";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Togglable = {
  onToggle: (id: string) => void;
};

type TodoProps = Todo & Togglable;

type TodoFormProps = {
  onSubmit: (text: string) => void;
};

type TodoListProps = {
  todos: Todo[];
} & Togglable;

function TodoForm({ onSubmit }: TodoFormProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(text);
    setText("");
  }

  return (
    <form className="w-full flex flex-row gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        required
      />
      <button
        type="submit"
        className="flex items-center justify-center px-4 py-1 border-2 border-orange-400"
      >
        Add
      </button>
    </form>
  );
}

function Todo({ completed, id, onToggle, text }: TodoProps) {
  return (
    <li className="flex items-center border-2 border-orange-500 px-4 py-2 gap-4">
      <input
        type="checkbox"
        defaultChecked={completed}
        onClick={() => onToggle(id)}
      />
      <span className="flex flex-1" data-item-id={id}>
        {text}
      </span>
      <button
        type="button"
        className="flex items-center justify-center px-2 py-1 bg-red-600 "
      >
        Delete
      </button>
    </li>
  );
}

function TodoList({ todos, onToggle }: TodoListProps) {
  return (
    <ul className="flex flex-col w-full border-2 border-orange-500 p-2 gap-2">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onSubmit = (text: string) => {
    setTodos((todos) => [...todos, { id: uuid(), text, completed: false }]);
  };

  const onToggle = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <div className="flex">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl">Vite + React</h1>
      <TodoForm onSubmit={onSubmit} />
      <TodoList todos={todos} onToggle={onToggle} />
    </>
  );
}

export default App;
