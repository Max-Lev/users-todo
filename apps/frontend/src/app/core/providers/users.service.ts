import { HttpClient, httpResource } from '@angular/common/http';
import { effect, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { debounceTime, delay, EMPTY, map, Observable, of, throttleTime } from 'rxjs';
import { UsersResponseDto } from '../../shared/models/users-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient)

  constructor() {
    // effect(()=>{
    //   this.user;
    // })
  }

  // user = httpResource(() => ({
  //   url: environment.apiUrl,
  //   method: 'GET',
  //   headers: {
  //     // 'X-Special': 'true',
  //   },
  //   // params: {
  //   //   'fast': 'yes',
  //   // },
  //   reportProgress: true,
  //   withCredentials: true,
  //   transferCache: true,
  // }));


  getUsers$(): Observable<UsersResponseDto> {
    return this.http.get<UsersResponseDto>(`${environment.apiUrl}/users`)
      .pipe(
        map((res: UsersResponseDto) => {

          if (res === null) {
            console.warn('Users property is not an array, initializing empty array');
            return res;
          }
          if (!Array.isArray(res.users)) {
            console.warn('Users property is not an array, initializing empty array');
            res.users = [];
          }

          res.users = res.users.map((user) => {
            const genter = user.gender === 'male' ? ' - M' : ' - F';
            const maidenNameEmpty = user.firstName + ' ' + user.lastName + ' ' + genter;
            const maidenNameExist = user.maidenName ? (user.firstName + ' ' + ' ( ' +user.maidenName+ ' ) ' + ' ' + user.lastName + ' ' + genter) : maidenNameEmpty;
            const name = user.maidenName ? maidenNameExist : maidenNameEmpty;
            return {
              ...user,
              // name: user.firstName + ' ' + ' ('+user.maidenName+') ' + ' ' + user.lastName + ' ' + genter
              name: name
            }
          });
          return res;
        }),
        // delay(4000) 
      );
  }


}
