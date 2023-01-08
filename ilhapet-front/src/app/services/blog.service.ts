import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IBlog from '../interfaces/IBlog';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get(page:number){
    return this.http.get<any>(`http://localhost:8080/blog/pages?page=${page}`);
  }

  get3(){
    return this.http.get<IBlog[]>(`http://localhost:8080/blog/banner`);
  }

  getById(id: number){
    return this.http.get<IBlog>(`http://localhost:8080/blog/${id}`);
  }

  update(id: number, data: IBlog) {
    return this.http.put<IBlog>(`http://localhost:8080/blog/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IBlog) {
    return this.http.post<IBlog>('http://localhost:8080/blog', data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  delete(data: number) {
    return this.http.delete(`http://localhost:8080/blog/${data}`
    , {
      headers: this.auth.buildHeader(),
    });
  }
}
