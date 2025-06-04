import { HttpClient, httpResource } from '@angular/common/http';
import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { debounceTime, delay, EMPTY, map, Observable, of, switchMap, throttleTime } from 'rxjs';
import { User, UsersResponseDto } from '../../shared/models/users-response.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodosApiResponse } from '../../shared/models/todos-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);

  users = signal<UsersResponseDto | undefined>({ users: [], total: 0, limit: 0, skip: 0 });

  constructor() {

  }

  getUserById$(id: number): Observable<User | undefined> {
    // return this.http.get<UsersResponseDto>(`${environment.apiUrl}/users/${id}`)
    return this.http.get<User>(`https://dummyjson.com/users/${id}`)
      .pipe(
        // delay(3000),
        map((res: User) => {
          console.log('getUserById ', res)
          return res;
        })
      );
  }

  getUsers$(): Observable<UsersResponseDto | undefined> {
    return this.http.get<UsersResponseDto>(`${environment.apiUrl}/users`)
      .pipe(
        map((res: UsersResponseDto) => {
          // console.log(res);
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

  // Store results per pageKey "limit|skip"
  private pageCache = signal<Record<string, UsersResponseDto>>({});

  nextPageUsers(pagesize: number, currentPage: number): Signal<UsersResponseDto | undefined> {

    const skip = currentPage * pagesize;
    const pageKey = `${pagesize}|${skip}`;
    const cache = this.pageCache();

    // If exists, return as signal
    if (cache[pageKey]) {
      this.users.set(cache[pageKey]);
      return signal(cache[pageKey]);
    }

    this.http.get<UsersResponseDto>(`https://dummyjson.com/users?limit=${pagesize}&skip=${skip}`)
      .subscribe((res: UsersResponseDto) => {
        res = this.nameFormat(res);
        this.users.set(res);
        this.pageCache.update(prev => ({ ...prev, [pageKey]: res }));

      });

    // Return undefined initially
    return signal(undefined);

  }

  private nameFormat(res: UsersResponseDto): UsersResponseDto {
    res.users = res.users.map((user) => {
      const genderLabel = user.gender === 'male' ? ' - M' : ' - F';
      const baseName = `${user.firstName} ${user.lastName}`;
      const fullName = user.maidenName ? `${user.firstName} ( ${user.maidenName} ) ${user.lastName}` : baseName;

      return {
        ...user,
        name: `${fullName} ${genderLabel}`
      };
    });
    return res;
  }


}