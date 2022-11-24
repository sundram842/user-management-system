import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postUser(data: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user-list', data);
  }
  // getUser():Observable<User[]> {
  //   return this.http.get<any>('http://localhost:3000/user-list')
  // }
  getUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user-list');
  }
  putUser(data: User, id: number): Observable<User> {
    return this.http.put<User>('http://localhost:3000/user-list/' + id, data);
  }
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>('http://localhost:3000/user-list/' + id);
  }
}
