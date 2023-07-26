import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsersQuery } from './state/query';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, UsersComponent, AddUserComponent],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UsersQuery, BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
