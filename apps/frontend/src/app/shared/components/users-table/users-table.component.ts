import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { User, UsersResponseDto } from '../../models/users-response.model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-users-table',
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule,
    MatPaginatorModule,
    DatePipe,
    TitleCasePipe,
    MatButtonModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnChanges, AfterViewInit {

  @Input() set users(value: UsersResponseDto) {
    this.dataSource.data = value?.users || [];
  }

  @Input() totalItems: number = 0;
  @Input() pageSize: number = 5;
  @Input() activePage: number = 0;

  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Output() selectedRow = new EventEmitter<{ user: User, action: string }>();

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'name', 'ssn', 'ein', 'phone', 'birthDate', 'role', 'edit'];

  @ViewChild('paginator') paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort!: MatSort;



  ngOnChanges(changes: SimpleChanges): void {
    this.paginator.pageIndex = this.activePage;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // selectedRowHandler(event:{user:User,action:string}){
  //   this.selectedRow.emit(event);
  // }

  // This method emits the event when a row is clicked
  onRowClick(event: Event, user: User) {
    event.stopPropagation(); // Prevent row click from firing
    this.selectedRow.emit({ user, action: 'select' });
  }

  // Method for edit button clicks
  onEditClick(event: Event, user: User) {
    event.stopPropagation(); // Prevent row click from firing
    this.selectedRow.emit({ user, action: 'edit' });
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



