import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './core/providers/users.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  usersService = inject(UsersService);

  constructor(){
    console.log('AppComponent init ');
    effect(()=>{
      this.usersService.user.value();
    })
  }
}
