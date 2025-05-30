import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../core/providers/users.service';
import { JsonPipe } from '@angular/common';
import { UsersTableComponent } from '../../shared/components/users-table/users-table.component';
import { UsersResponseDto } from '../../shared/models/users-response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    JsonPipe,
    UsersTableComponent
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {

  usersService = inject(UsersService);

  users: WritableSignal<UsersResponseDto | undefined> = this.usersService.users;

  totalItems = signal(0);
  pageSize = signal(5);
  currentPage = signal(0);
  skip = computed(() => this.currentPage() * this.pageSize());

  constructor() {
    this.usersService.nextPageUsers(this.pageSize(), this.currentPage());

    effect(() => {
      this.totalItems.set(this.users()?.total ?? 0);
      console.log('users ',this.users());
    });


  }

  onPageChanged(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.currentPage.set(event.pageIndex);
    this.usersService.nextPageUsers(this.pageSize(), this.currentPage());
  }



}
