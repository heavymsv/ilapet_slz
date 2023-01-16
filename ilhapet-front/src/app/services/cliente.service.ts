import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICliente from '../interfaces/ICliente';
import IOAuthResponse from '../interfaces/IOAuthResponse';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) {}

  get(){
    return this.http.get<ICliente[]>(`${environment.apiUrl}/cliente/list?term=`);
  }

  getById(id: number){
    return this.http.get<ICliente[]>(`${environment.apiUrl}/cliente/${id}`);
  }

  getByName(name: string){
    return this.http.get<ICliente>(`${environment.apiUrl}/cliente/nome?name=${name}`);
  }

  update(id: number, data: ICliente) {
    return this.http.put<ICliente>(`${environment.apiUrl}/cliente/${id}`, data);
  }

  create(data: ICliente) {
    return this.http.post<ICliente>(`${environment.apiUrl}/cliente`, data);
  }

  

}
