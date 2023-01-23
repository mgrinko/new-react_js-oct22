import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo, TodoWithoutUser } from './types/Todo';
import * as usersService from './utils.ts/usersService';

interface ITodosContext {
  todos: Todo[],
  addTodo: (todo: Todo) => void,
  updateTodo: (todo: Todo) => void,
  deleteTodo: (todo: Todo) => void,
}

export const TodosContext = React.createContext<ITodosContext>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
});

type Props = {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json')
      .then(res => res.json())
      .then((todosFromServer: TodoWithoutUser[]) => {
        setTodos(todosFromServer.slice(-10).map(todo => ({
          ...todo,
          user: usersService.getById(todo.userId),
        })));
      });
  }, []);

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

  return (
    <TodosContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};
