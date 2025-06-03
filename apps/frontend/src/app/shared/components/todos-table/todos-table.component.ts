import { Component, computed, effect, input, OnChanges, SimpleChanges } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Todo, TodosApiResponse } from '../../models/todos-response.model';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-todos-table',
  imports: [MatTableModule,MatIconModule],
  standalone:true,
  templateUrl: './todos-table.component.html',
  styleUrl: './todos-table.component.scss'
})
export class TodosTableComponent implements OnChanges {
  
  displayedColumns = ['id', 'todo', 'completed','userId'];

  todos = input.required<TodosApiResponse>();

  constructor(){
    // This is a constructor function that takes no parameters
    // It creates an effect that logs the result of the todos() function to the console
    effect(()=>{
      console.log(this.todos());
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.todos());
    // // console.log(this.todos().todos);
  }

}
