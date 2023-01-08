import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IOAuthResponse from '../interfaces/IOAuthResponse';
import IUser from '../interfaces/IUser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth:AuthService
  ) {}

  signup(user:IUser) {
    
    return this.http.post<any>(
      `http://localhost:8080/user/signup`,user
    );
  }

  getUser(id:number) {
    
    return this.http.get<IUser>(
      `http://localhost:8080/user/${id}`
      , {
        headers: this.auth.buildHeader(),
      });
  }

  get(){
    return this.http.get<IUser[]>(
      `http://localhost:8080/user/all`
      , {
        headers: this.auth.buildHeader(),
      });
  }

  getByName(name:string){
    return this.http.get<IUser>(
      `http://localhost:8080/user/name?username=${name}`
      , {
        headers: this.auth.buildHeader(),
      });
  }

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<IOAuthResponse>(
      `http://localhost:8080/oauth/token`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Basic ' + btoa('tsystems:tsPassword')),
      }
    );
  }

}
