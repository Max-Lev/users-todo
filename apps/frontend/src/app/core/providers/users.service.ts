import { HttpClient, httpResource } from '@angular/common/http';
import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { debounceTime, delay, EMPTY, map, Observable, of, switchMap, throttleTime } from 'rxjs';
import { UsersResponseDto } from '../../shared/models/users-response.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);

  users = signal<UsersResponseDto | undefined>({ users: [], total: 0, limit: 0, skip: 0 });

  constructor() {
    // Fix: Subscribe to the observable directly and update the signal
    // this.getUsers$().subscribe({
    //   next: (userData) => {
    //     if (userData) {
    //       this.users.set(userData);
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error loading users:', err);
    //   }
    // });

    this.getUserTasks$(3);
  }

  getUserTasks$(id: number) {
    return this.http.get(`${environment.apiUrl}/todoes/${id}`)
      .pipe(
        switchMap((res: any) => {
          return of(res)
        }),
        map((res: any) => {
          // console.log(res)
          return res;
        })
      ).subscribe({
        next: (res) => {
          // console.log(res)
        },
        error: (err) => {
          // console.log(err)
        }
      })
  }

  getUsers$(): Observable<UsersResponseDto | undefined> {
    return this.http.get<UsersResponseDto>(`${environment.apiUrl}/users`)
      .pipe(
        map((res: UsersResponseDto) => {
          console.log(res);
          if (res === null) {
            console.warn('Users property is not an array, initializing empty array');
            return res;
          }
          if (!Array.isArray(res.users)) {
            console.warn('Users property is not an array, initializing empty array');
            res.users = [];
          }

          res = this.nameFormat(res);

          return res;
        }),
        // delay(4000) 
      );
  }

  nextPageUsers(pagesize: number, currentPage: number) {
    const skip = currentPage * pagesize;
    this.http.get(`https://dummyjson.com/users?limit=${pagesize}&skip=${skip}`)
      .subscribe((res: any) => {
        res = this.nameFormat(res);
        this.users.set(res);
      });
  }

  private nameFormat(res: UsersResponseDto): UsersResponseDto {
    res.users = res.users.map((user) => {
      const genter = user.gender === 'male' ? ' - M' : ' - F';
      const maidenNameEmpty = user.firstName + ' ' + user.lastName + ' ' + genter;
      const maidenNameExist = user.maidenName ? (user.firstName + ' ' +
        ' ( ' + user.maidenName + ' ) ' + ' ' + user.lastName + ' ' + genter) : maidenNameEmpty;
      const name = user.maidenName ? maidenNameExist : maidenNameEmpty;
      return {
        ...user,
        name
      }
    });
    return res;
  }


}