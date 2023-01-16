import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IBlog from '../interfaces/IBlog';
import { AuthService } from './auth.service';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get(page:number){
    return this.http.get<any>(`${environment.apiUrl}/blog/pages?page=${page}`);
  }

  get3(){
    return this.http.get<IBlog[]>(`${environment.apiUrl}/blog/banner`);
  }

  getById(id: number){
    return this.http.get<IBlog>(`${environment.apiUrl}/blog/${id}`);
  }

  update(id: number, data: IBlog) {
    return this.http.put<IBlog>(`${environment.apiUrl}/blog/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IBlog) {
    return this.http.post<IBlog>(`${environment.apiUrl}/blog`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  delete(data: number) {
    return this.http.delete(`${environment.apiUrl}/blog/${data}`
    , {
      headers: this.auth.buildHeader(),
    });
  }
}
