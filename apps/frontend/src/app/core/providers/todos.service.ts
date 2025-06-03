import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TodosApiResponse } from '../../shared/models/todos-response.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  http = inject(HttpClient);

  constructor() { }

  getUserTasks$(id: number) {
    return this.http.get<TodosApiResponse>(`${environment.apiUrl}/todoes/${id}`)
      .pipe(
        // delay(3000),
        map((res: TodosApiResponse) => {
          console.log('getUserTasks ', res)
          return res;
        })
      );
  }

}
