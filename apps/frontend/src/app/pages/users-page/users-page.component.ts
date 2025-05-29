import { Component, computed, effect, inject, Signal } from '@angular/core';
import { UsersService } from '../../core/providers/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
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

  usersResponse: Signal<UsersResponseDto | undefined> = toSignal(this.usersService.getUsers$());

  loaded = computed(() => {
    const response = this.usersResponse();
    return response?.users && response.users.length > 0;
  });

  totalItems = 0;
  pageSize = 5;
  currentPage = 0;
  itemsLenght = 0;

  constructor() {
    effect(() => {
      console.log(this.usersResponse()?.users);
      // this.loaded = this.usersResponse()?.users.length ? true : false;
    })
  }

  pageEventHandler(event:PageEvent){
    console.log(event);
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    
    // this.itemsLenght = event.length;
    const skip = this.currentPage * this.pageSize;
    this.usersService.nextPageUsers(this.pageSize, skip )
    .subscribe(
      {
        next: (res:any) =>{
          console.log(res)
          this.totalItems = res.total;
        },
        error(err) {
          console.log(err)
        },
      });
  }

}
