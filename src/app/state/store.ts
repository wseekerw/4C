import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { User } from './model';

export const getInitialState = () => {
  return [
    { name: 'Mary', id: 1, active: true },
    { name: 'John', id: 2, active: true },
    { name: 'Sally', id: 3, active: true },
  ];
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users' })
export class UserStore extends Store<User[]> {
  constructor() {
    super(getInitialState());
  }
}
