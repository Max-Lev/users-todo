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
    // effect(() => {
    //   toSignal(this.getUsers$(), { initialValue: undefined })()
    //   // .then(data => {
    //   //   if (data) this.users.set(data);
    //   // });
    // });

    this.getUserTasks$(3);
  }

  getUserTasks$(id: number) {
    return this.http.get(`${environment.apiUrl}/todoes/${id}`)
      .pipe(
        // map((res: any) => {
        //   return of(res)
        // }),
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