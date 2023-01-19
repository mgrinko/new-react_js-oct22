import { useState, useCallback } from 'react';
import './App.scss';
import { getUser } from './components/Todos/TodoForm';
import Todos from './components/Todos/Todos';
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

let oldTodos: Todo[] = [];
let oldDelete: (todo: Todo) => void = () => {};

export function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }))
  });
  const addTodo = useCallback(
    (newTodo: Todo) => {
      setTodos([...todos, newTodo])
    },
    [todos],
  )
  const deleteTodo = useCallback(
    (todoToDelete: Todo) => {
      setTodos(todos.filter(
        todo => (todo as Todo).id !== todoToDelete.id,
      ));
    },
    [todos],
  );
  const updateTodo = useCallback((updatedTodo: Todo) => {
    setTodos(todos.map(todo => {
      if (todo.id !== updatedTodo.id) {
        return todo;
      }
      return updatedTodo;
    }));
  }, [todos]);

  console.log(oldTodos, todos, oldTodos === todos);
  oldTodos = todos;
  console.log(oldDelete, deleteTodo, oldDelete === deleteTodo);
  oldDelete = deleteTodo;

  return (
  <div className="App">
    <Todos
      todos={todos}
      onTodoDeleted={deleteTodo}
      onTodoUpdated={updateTodo}
      addTodo={addTodo}
    />
  </div>
  );
}


