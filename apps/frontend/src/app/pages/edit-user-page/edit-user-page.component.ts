import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { UsersTasksStore } from '../../core/store/users.store';
import { UsersService } from '../../core/providers/users.service';
import { ActivatedRoute } from '@angular/router';
import { User, UsersResponseDto } from '../../shared/models/users-response.model';

@Component({
  selector: 'app-edit-user-page',
  imports: [],
  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.scss'
})
export class EditUserPageComponent {
  private usersTasksStore = inject(UsersTasksStore);
  private usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  @Input() title: string = '';
  @Input() id: string = '';
  selectedUser = computed(() => this.usersTasksStore.selectedUser() ?? null);
  userId = computed(() => this.activatedRoute.snapshot.paramMap.get('id'));
  user = signal<User | undefined>(undefined);

  constructor() {
    effect(() => {
      console.log('id: ', this.id)
      console.log('user by id: ', this.user())
      console.log('userId: ', this.userId())
      console.log('Selected user:', this.selectedUser());
    });

    effect(() => {
      const id = this.userId();
      if (id) {
        this.usersService.getUserById$(+id).subscribe((user: User | undefined) => {
          console.log(user)
          this.user.set(user);
          if (user !== undefined && this.selectedUser()?.id !== +id) {
            this.usersTasksStore.setSelectedUser(user);
          }
        });
      }
    });
  }

}
