import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../core/providers/users.service';
import { JsonPipe } from '@angular/common';
import { UsersTableComponent } from '../../shared/components/users-table/users-table.component';
import { User, UsersResponseDto } from '../../shared/models/users-response.model';
import { PageEvent } from '@angular/material/paginator';
import { UsersTableState, UsersTasksStore } from '../../core/store/users.store';
import { patchState, signalStore } from '@ngrx/signals';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    UsersTableComponent,

  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {

  usersService = inject(UsersService);
  usersTasksStore = inject(UsersTasksStore);

  users: WritableSignal<UsersResponseDto | undefined> = this.usersService.users;

  usersTableState = UsersTableState;

  pageSize = computed(() => this.usersTableState.pageSize());
  currentPage = computed(() => this.usersTableState.activePage());
  totalItems = computed(() => this.users()?.total ?? 0);




  constructor() {
    this.usersService.nextPageUsers(this.pageSize(), this.currentPage());

    effect(() => {
      console.log('users: ', this.users());
      console.log('usersTasksStore: ', this.usersTasksStore.selectedUser())
      console.log('usersTasksStore userTasks: ', this.usersTasksStore.todos())
      console.log('usersTableState: ', this.usersTableState())

    });


  }

  onPageChanged(event: PageEvent) {
    // this.usersTableStore.pageChange({pageIndex:event.pageIndex,pageSize:event.pageSize});
    patchState(UsersTableState, { activePage: event.pageIndex, pageSize: event.pageSize });
    console.log(this.pageSize())
    this.usersService.nextPageUsers(this.pageSize(), this.currentPage());

  }

  selectedRowHandler(user: User) {
    console.log(user);
    this.usersTasksStore.setSelectedUser(user);
  }



}
