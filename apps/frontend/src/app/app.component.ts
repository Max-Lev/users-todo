import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from './core/providers/users.service';
import { UsersTasksStore } from './core/store/users.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  // providers:[UsersTasksStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Users Management';
  

  constructor(){
    // console.log('AppComponent init!');
    // effect(()=>{
    //   this.usersService.user.value();
    // })
  }
}
