import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProced from '../interfaces/IProced';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {
  constructor(
    private http: HttpClient,
    private auth:AuthService
  ) {}

  get(){
    return this.http.get<any>('http://localhost:8080/procedimento/list?term='
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getAll(id: number){
    console.log('place: ',`http://localhost:8080/procedimento/listall?id=${id}`);
    
    return this.http.get<IProced[]>(`http://localhost:8080/procedimento/listall?id=${id}`, {
      headers: this.auth.buildHeader(),
    });
  }

  getQualifiying(pendente:boolean|null,page?:number){
    console.log( (page===undefined)?'':`&page=${page}`)
    console.log(`site: http://localhost:8080/procedimento/pages?pendente=${pendente}${(page===undefined)?'':`&page=${page}`}`);
    
    return this.http.get<any>(`http://localhost:8080/procedimento/pages?pendente=${pendente}${(page===undefined)?'':`&page=${page}`}`, {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IProced>(`http://localhost:8080/procedimento/${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getListAdmin(op: number,
              nome: string,
              pendente: boolean,
              page?:number){
                
    return this.http.get<any>(`http://localhost:8080/procedimento/listproceds?pendente=${pendente}&name=${nome}&op=${op}${(page===undefined)?'':`&page=${page}`}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IProced) {
    return this.http.put<IProced>(`http://localhost:8080/procedimento/${id}`, data, {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IProced) {
    return this.http.post<IProced>('http://localhost:8080/procedimento', data, {
      headers: this.auth.buildHeader(),
    });
  }
}
