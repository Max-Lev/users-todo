import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);

  constructor(){
    effect(()=>{
      console.log(this.router)
      console.log(this.activeRoute)
    })
  }

}
