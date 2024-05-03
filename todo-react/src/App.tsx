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
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
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
    <li className="flex items-center">
      <input
        type="checkbox"
        defaultChecked={completed}
        onClick={() => onToggle(id)}
      />
      <span className="ml-2" data-item-id={id}>
        {text}
      </span>
    </li>
  );
}

function TodoList({ todos, onToggle }: TodoListProps) {
  return (
    <ul>
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
