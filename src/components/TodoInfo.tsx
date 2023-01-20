import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoForm } from './TodoForm';

type Props = {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo, onDelete, onUpdate
}) => {
  const [isEditing, setEditing] = useState(false);
  const save = (updatedTodo: Todo) => {
    onUpdate(updatedTodo);
    setEditing(false);
  };

  console.log('TodoInfo', todo.id);

  if (isEditing) {
    return (
      <div>
        <TodoForm onSubmit={save} todo={todo} />
        <button onClick={() => setEditing(false)}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => onDelete(todo)}>x</button>
      <i>{todo.user?.name + ': ' + todo.title}</i>
      <b>{` [${todo.completed ? 'X' : '0'}]`}</b>
      <button onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
};
