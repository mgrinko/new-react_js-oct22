import { useRef } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';


export const usersFromServer: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
];

export function getUser(id: number) {
  return usersFromServer.find(user => user.id === id);
}

type Props = {
  onSubmit: (todo: Todo) => void,
  todo?: Todo,
}

export const TodoForm: React.FC<Props> = ({ onSubmit, todo }) => {
  const titleRef = useRef<HTMLInputElement>(null); // trying out useRef here, it
  const userRef = useRef<HTMLSelectElement>(null); // is not better necessarily..

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (titleRef.current && titleRef.current.value && userRef.current && userRef.current.value !== '0') {
      const userId = parseInt(userRef.current.value);
      onSubmit({
        id: todo?.id || Date.now(),
        title: titleRef.current.value,
        userId,
        completed: false,
        user: getUser(userId),
      });
      titleRef.current.value = '';
      userRef.current.value = '0';
    }
  }

  return (
    <><tr style={{width: '100%', height: '1rem'}}></tr>
    <tr style={{background: '#ccc'}}>
      <td>
        <select
          ref={userRef}
        >
          <option value="0">---</option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </td>

      <td>
        <input
          type="text"
          ref={titleRef}
        />
      </td>

      <td>⌛</td>

      <td>
        <button
          onClick={(event) => handleSubmit(event)}
        >
          {todo ? 'Save' : 'Add'}
        </button>
      </td>
      <td></td>
    </tr></>
  );
};