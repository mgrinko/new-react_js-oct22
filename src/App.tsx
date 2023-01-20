import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import './App.scss';
import { getUser, TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo, TodoWithoutUser } from './types/Todo';

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // useEffect(() => {
  //   const timerId = setTimeout(setDebouncedQuery, 1000, query);

  //   return () => clearTimeout(timerId);
  // }, [query]);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json')
      .then(res => res.json())
      .then((todosFromServer: TodoWithoutUser[]) => {
        setTodos(todosFromServer.slice(-10).map(todo => ({
          ...todo,
          user: getUser(todo.userId),
        })))
      });
  }, []);

  const applyQuery = useCallback(
    debounce(setDebouncedQuery, 1000),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  function addTodo(newTodo: Todo) {
    setTodos(currentTodos => [...currentTodos, newTodo])
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

  let visibleTodos = todos.filter(
    todo => todo.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
      />
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={visibleTodos}
        onTodoDeleted={deleteTodo}
        onTodoUpdated={updateTodo}
      />
    </div>
  );
}


