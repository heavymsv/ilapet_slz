import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IPet from '../interfaces/IPet';
import { AuthService } from './auth.service';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient,
    private auth:AuthService
  ) {}

  get(){
    return this.http.get<IPet[]>(`${environment.apiUrl}/pet/list?term=`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getByOwner(id: number){
    return this.http.get<IPet[]>(`${environment.apiUrl}/pet/owner?id=${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IPet[]>(`${environment.apiUrl}/pet/${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IPet) {
    return this.http.put<IPet>(`${environment.apiUrl}/pet/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IPet) {
    return this.http.post<IPet>(`${environment.apiUrl}/pet`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }
}
