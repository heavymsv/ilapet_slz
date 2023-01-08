import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IPet from '../interfaces/IPet';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient,
    private auth:AuthService
  ) {}

  get(){
    return this.http.get<IPet[]>('http://localhost:8080/pet/list?term='
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getByOwner(id: number){
    return this.http.get<IPet[]>(`http://localhost:8080/pet/owner?id=${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IPet[]>(`http://localhost:8080/pet/${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IPet) {
    return this.http.put<IPet>(`http://localhost:8080/pet/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IPet) {
    return this.http.post<IPet>('http://localhost:8080/pet', data
    , {
      headers: this.auth.buildHeader(),
    });
  }
}
