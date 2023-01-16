import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProced from '../interfaces/IProced';
import { AuthService } from './auth.service';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {
  constructor(
    private http: HttpClient,
    private auth:AuthService
  ) {}

  get(){
    return this.http.get<any>(`${environment.apiUrl}/procedimento/list?term=`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getAll(id: number){
    console.log('place: ',`${environment.apiUrl}/procedimento/listall?id=${id}`);
    
    return this.http.get<IProced[]>(`${environment.apiUrl}/procedimento/listall?id=${id}`, {
      headers: this.auth.buildHeader(),
    });
  }

  getQualifiying(pendente:boolean|null,page?:number){
    console.log( (page===undefined)?'':`&page=${page}`)
    console.log(`site: ${environment.apiUrl}/procedimento/pages?pendente=${pendente}${(page===undefined)?'':`&page=${page}`}`);
    
    return this.http.get<any>(`${environment.apiUrl}/procedimento/pages?pendente=${pendente}${(page===undefined)?'':`&page=${page}`}`, {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IProced>(`${environment.apiUrl}/procedimento/${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getListAdmin(op: number,
              nome: string,
              pendente: boolean,
              page?:number){
                
    return this.http.get<any>(`${environment.apiUrl}/procedimento/listproceds?pendente=${pendente}&name=${nome}&op=${op}${(page===undefined)?'':`&page=${page}`}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IProced) {
    return this.http.put<IProced>(`${environment.apiUrl}/procedimento/${id}`, data, {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IProced) {
    return this.http.post<IProced>(`${environment.apiUrl}/procedimento`, data, {
      headers: this.auth.buildHeader(),
    });
  }
}
