import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import * as usersService from '../utils.ts/usersService';

type Props = {
  onSubmit: (todo: Todo) => void,
  todo?: Todo,
}

export const TodoForm: React.FC<Props> = React.memo(
  ({ todo, onSubmit }) => {
    const [newTodoTitle, setNewTodoTitle] = useState(todo?.title || '');
    const [selectedUserId, setSelectedUserId] = useState(todo?.userId || 0);
  
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
  
          onSubmit({
            id: todo?.id || Date.now(),
            title: newTodoTitle,
            userId: selectedUserId,
            completed: todo?.completed || false,
            user: usersService.getById(selectedUserId),
          });
        }}
      >
        <input
          type="text"
          value={newTodoTitle}
          onChange={(event) => {
            setNewTodoTitle(event.target.value);
          }} />
  
        <select
          value={selectedUserId}
          onChange={(event) => {
            setSelectedUserId(+event.target.value);
          }}
        >
          <option value="0">---</option>
          {usersService.getAll().map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
  
        <button>{todo ? 'Save' : 'Add'}</button>
      </form>
    );
  },
);
