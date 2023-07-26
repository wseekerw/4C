import { Component, OnInit } from '@angular/core';
import { UsersQuery } from '../state/query';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddUserComponent } from '../add-user/add-user.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { UserData } from '../add-user/add-user-model';
import { User } from '../state/model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  bsModalRef?: BsModalRef;
  constructor(
    private usersQuery: UsersQuery,
    private modalService: BsModalService
  ) {}

  private userLength!: number;
  public users!: User[];

  public addUserDisable$: Observable<boolean> = this.usersQuery.getUsers().pipe(
    map((res) => {
      let everyUserisActive = res.every((u) => u.active === true);
      let userCountisLessThan5 = res.length < 5;

      if (userCountisLessThan5 && everyUserisActive) {
        // then don't disable the button
        return false;
      } else {
        // in all other cases disable 'add user' button
        return true;
      }
    })
  );

  ngOnInit(): void {
    this.usersQuery.getUsers().subscribe((res) => {
      this.userLength = res.length;
      this.users = res.map((user) => Object.assign({}, user));
      console.log(this.users);
    });
  }

  private addUserToUsers(data: UserData) {
    let newId = this.userLength + 1;
    this.usersQuery.addUser({ ...data, id: newId });
  }

  openAddUserModal() {
    this.bsModalRef = this.modalService.show(AddUserComponent);
    this.bsModalRef.content.onClose.subscribe((userData: UserData) => {
      this.addUserToUsers(userData);
    });
  }

  setActive(user: User) {
    user.active = !user.active;
    this.usersQuery.setActiveUser(user);
  }
}
