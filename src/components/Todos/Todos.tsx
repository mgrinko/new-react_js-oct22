import { debounce } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Todo } from '../../types/Todo';
import { TodoForm } from './TodoForm'
import TodoList from './TodoList'

type Props = {
  todos: Todo[];
  onTodoDeleted: (todo: Todo) => void;
  onTodoUpdated: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
};

const Todos: React.FC<Props> = ({
	todos,
	onTodoDeleted,
	onTodoUpdated,
	addTodo,
}) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const queryRef = useRef<HTMLInputElement | null>(null);
	const [pending, setPending] = useState(false);

  const setVisibleTodosDebounced = useMemo(
    () => debounce(() => {
      setVisibleTodos(todos
        .filter(todo => todo.title.includes(queryRef?.current?.value || ''))
      )
			setPending(false);
    }, 333), [todos]
  );

  useEffect(() => {
    setVisibleTodos(todos
      .filter(todo => todo.title.includes(queryRef?.current?.value || ''))
    );
  }, [todos])

	return (
		<div style={{width: 'fit-content'}}>
			<table className="TodoList">
			<thead>
				<tr>
					<th style={{minWidth: '200px'}}>User</th>
					<th style={{minWidth: '200px'}}>Task</th>
					<th style={{minWidth: '60px'}}>Done</th>
					<th style={{minWidth: '60px'}}>Action</th>
					<th style={{minWidth: '60px'}}>Delete</th>
				</tr>
			</thead>
			<tbody>
				<TodoList
					todos={visibleTodos}
					onTodoDeleted={onTodoDeleted}
					onTodoUpdated={onTodoUpdated}
				/>
				<TodoForm onSubmit={addTodo} />
			</tbody>
			</table>

			<label
				style={{display: 'block', marginTop: '1rem', textAlign: 'right'}}
			>
				Search{': '} 
				<input
					style={{transition: 'background-color 0.6s', backgroundColor: pending ? '#3e36' : '#fff'}}
					type="text"
					ref={queryRef}
					onChange={() => {
						setPending(true);
						setVisibleTodosDebounced();
					}}
				/>
			</label>
		</div>
	)
}

export default Todos