import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IVets from '../interfaces/IVets';
import { AuthService } from './auth.service';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get(){
    return this.http.get<IVets[]>(`${environment.apiUrl}/veterinario/list?term=`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IVets[]>(`${environment.apiUrl}/veterinario/${id}`,
     {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IVets) {
    return this.http.put<IVets>(`${environment.apiUrl}/veterinario/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IVets) {
    return this.http.post<IVets>(`${environment.apiUrl}/veterinario`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

}
