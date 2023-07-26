import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserStore } from './store';
import { User } from './model';

@Injectable({
  providedIn: 'root',
})
export class UsersQuery extends Query<User[]> {
  constructor(private userStore: UserStore) {
    super(userStore);
  }

  getUsers() {
    return this.select((state) => state);
  }

  addUser(user: User) {
    //console.log(user)
    let store = this.userStore.getValue();
    const newstate = [...store, user];
    //console.log(newstate)

    this.userStore._setState(newstate);
  }

  setActiveUser(user: User) {
    let updatedState = this.userStore
      .getValue()
      .map((o) => Object.assign({}, o));
    if (user.id) {
      updatedState.forEach((u) => {
        if (u.id === user.id) {
          u.active = user.active;
        }
      });
    }
    //console.log(updatedStore)
    this.userStore._setState(updatedState);
  }
}
