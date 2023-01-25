import { useState } from 'react';
import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodosContext } from './TodosContext';

export function App() {
  const { addTodo } = useTodosContext();
  const [value, setValue] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setValue(value + 1)}>{value}</button>

      <TodoForm onSubmit={addTodo} />
      <TodoList />
    </div>
  );
}


