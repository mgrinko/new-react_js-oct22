import { User } from './User';

export interface TodoWithoutUser {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface Todo extends TodoWithoutUser {
  user?: User;
}
