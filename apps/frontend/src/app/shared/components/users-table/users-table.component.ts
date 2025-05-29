import { AfterViewInit, Component, computed, effect, EventEmitter, Input, input, InputSignal, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User, UsersResponseDto } from '../../models/users-response.model';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-users-table',
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule,
    MatPaginatorModule,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnChanges {

  usersResponse: InputSignal<UsersResponseDto | undefined> = input.required();


  displayedColumns: string[] = ['id', 'name', 'ssn', 'ein', 'phone', 'birthDate', 'role'];

  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  @Output() pageEvent = new EventEmitter<PageEvent>();

  @Input() totalItems: number = 0;

  constructor() {

    effect(() => {
      console.log(this.usersResponse()?.users)
      this.dataSource.data = this.usersResponse()?.users ?? [];
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.paginator.length = this.totalItems;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageEvent($event: PageEvent) {
    console.log($event)
    this.pageEvent.emit($event);

  }



}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }



