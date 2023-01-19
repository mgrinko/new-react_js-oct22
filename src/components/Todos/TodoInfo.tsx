import React, {useState} from 'react';
import { Todo } from '../../types/Todo';
import { usersFromServer } from './TodoForm';

type Props = {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({ todo, onDelete, onUpdate }) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);
    const [userId, setUserId] = useState(0);

    const saveTodo = () => {
      onUpdate({
        ...todo,
        title,
        completed,
      })

      setEditMode(false);
    };

    console.log('TodoInfo', todo.id);

    const displayTodo = 
    <>
      <td>{todo.user?.name}</td>
      <td>
        {todo.title}
      </td>
      <td>
        {todo.completed ? '✔️' : '⌛'}
      </td>
      <td>
        <button onClick={() => setEditMode(true)}>
          ✏️
        </button>
      </td>
    </>;
  
    const editTodo =
    <>
      <td>
        <select
          value={userId}
          onChange={e => setUserId(parseInt(e.target.value))}
        >
          {usersFromServer.map(user => (
            <option
              key={user.id}
              value={user.id}
              selected={user.id === userId}
            >
              {user.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
      </td>
      <td>
        <button onClick={saveTodo}>
          Save
        </button>
      </td>
    </>;

    return (      
      <tr>
        {
          editMode
            ? editTodo
            : displayTodo
        }
        <td>
          <button onClick={() => {
            onDelete(todo);
          }}>
            🗑️
          </button>
        </td>
      </tr>
    );
  },
);
