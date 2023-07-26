import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserData } from './add-user-model'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  public userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    active: new FormControl(false, []),
  });

  public onClose = new Subject<UserData>();

  public changeActive(event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    this.userForm.controls['active'].setValue(isChecked);
  }

  public submit() {
    let userData: UserData = {
      name: this.userForm.value.name!,
      active: this.userForm.value.active!,
    };

    this.onClose.next(userData);
    this.bsModalRef.hide();
  }
}
