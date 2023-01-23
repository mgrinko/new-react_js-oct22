import { useContext } from 'react';
import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodosContext } from './TodosContext';

export function App() {
  const { addTodo } = useContext(TodosContext);;

  return (
    <div className="App">
      <TodoForm onSubmit={addTodo} />
      <TodoList />
    </div>
  );
}


