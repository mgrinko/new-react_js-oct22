import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useTodosContext } from '../TodosContext';
import { TodoInfo } from './TodoInfo';

export const TodoList: React.FC = React.memo(() => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { todos, deleteTodo, updateTodo } = useTodosContext();
  // const { todos, deleteTodo, updateTodo } = useTodosContext();

  const applyQuery = useCallback(
    debounce(setDebouncedQuery, 1000),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  let visibleTodos = todos.filter(
    todo => todo.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="TodoList">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
      />

      {visibleTodos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
});
