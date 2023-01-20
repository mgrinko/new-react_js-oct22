import { useCallback, useMemo } from 'react';
import { useState } from 'react';
import './App.scss';
import { getUser, TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo, TodoWithoutUser } from './types/Todo';

const todosFromServer: TodoWithoutUser[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
  },
];


export function App() {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }))
  });

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo])
  }

  const deleteTodo = useCallback(
    (todoToDelete: Todo) => {
      setTodos(currentTodos => currentTodos.filter(
        todo => todo.id !== todoToDelete.id,
      ));
    },

    [],
  );

  const updateTodo = useMemo(() => {
    return (updatedTodo: Todo) => {
      setTodos(currentTodos => currentTodos.map(
        todo => todo.id === updatedTodo.id ? updatedTodo : todo
      ));
    };
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onTodoDeleted={deleteTodo}
        onTodoUpdated={updateTodo}
      />
    </div>
  );
}


