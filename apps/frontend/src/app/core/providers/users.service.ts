import { httpResource } from '@angular/common/http';
import { effect, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { 
    effect(()=>{
      this.user;
    })
  }

  user = httpResource(() => ({
    url: environment.apiUrl,
    method: 'GET',
    headers: {
      // 'X-Special': 'true',
    },
    // params: {
    //   'fast': 'yes',
    // },
    reportProgress: true,
    withCredentials: true,
    transferCache: true,
  }));
    
  
  
}
