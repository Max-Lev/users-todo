import { Component, computed, effect, input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Todo, TodosApiResponse } from '../../models/todos-response.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-todos-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  standalone: true,
  templateUrl: './todos-table.component.html',
  styleUrl: './todos-table.component.scss'
})
export class TodosTableComponent implements OnChanges {

  displayedColumns = ['id', 'todo', 'completed', 'userId'];

  todos = input.required<TodosApiResponse>();

  isLoading = input<boolean>(false);

  
  constructor() {
    effect(() => {
      // console.log(this.todos());
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }

}
