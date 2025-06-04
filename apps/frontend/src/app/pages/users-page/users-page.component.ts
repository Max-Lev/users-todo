import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../core/providers/users.service';
import { JsonPipe } from '@angular/common';
import { UsersTableComponent } from '../../shared/components/users-table/users-table.component';
import { User, UsersResponseDto } from '../../shared/models/users-response.model';
import { PageEvent } from '@angular/material/paginator';
import { UsersTableState, UsersTasksStore } from '../../core/store/users.store';
import { patchState, signalStore } from '@ngrx/signals';
import { TodosTableComponent } from '../../shared/components/todos-table/todos-table.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ExpansionPanelState } from '../../core/store/edit-users.store';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    UsersTableComponent,
    TodosTableComponent,
    RouterModule,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {

  usersService = inject(UsersService);
  usersTasksStore = inject(UsersTasksStore);
  router = inject(Router);

  users: WritableSignal<UsersResponseDto | undefined> = this.usersService.users;

  usersTableState = UsersTableState;

  pageSize = computed(() => this.usersTableState.pageSize());
  currentPage = computed(() => this.usersTableState.activePage());
  totalItems = computed(() => this.users()?.total ?? 0);

  todos = computed(()=>this.usersTasksStore.todos());
  isLoading = computed(()=>this.usersTasksStore.loading());
  expansionPanelState = ExpansionPanelState;


  constructor() {
    this.usersService.nextPageUsers(this.pageSize(), this.currentPage());

    effect(() => {
      // console.log('users: ', this.users());
      // console.log('usersTasksStore: ', this.usersTasksStore.selectedUser())
      // console.log('usersTasksStore userTasks: ', this.usersTasksStore.todos())
      console.log(this.expansionPanelState())
    });


  }

  onPageChanged(event: PageEvent) {
    patchState(UsersTableState, { activePage: event.pageIndex, pageSize: event.pageSize });
    this.usersService.nextPageUsers(this.pageSize(), this.currentPage());
  }

  selectedRowHandler(event:{user: User,action:string}) {
    console.log(event.user,event.action);
    this.usersTasksStore.setSelectedUser(event.user);
    if(event.action==='edit'){
      this.router.navigate([`users/${event.user.id}`]);
    }
  }

  editAction(){

  }


}
