import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICliente from '../interfaces/ICliente';
import IOAuthResponse from '../interfaces/IOAuthResponse';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) {}

  get(){
    return this.http.get<ICliente[]>('http://localhost:8080/cliente/list?term=');
  }

  getById(id: number){
    return this.http.get<ICliente[]>(`http://localhost:8080/cliente/${id}`);
  }

  getByName(name: string){
    return this.http.get<ICliente>(`http://localhost:8080/cliente/nome?name=${name}`);
  }

  update(id: number, data: ICliente) {
    return this.http.put<ICliente>(`http://localhost:8080/cliente/${id}`, data);
  }

  create(data: ICliente) {
    return this.http.post<ICliente>('http://localhost:8080/cliente', data);
  }

  

}
