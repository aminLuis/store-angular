import { Injectable } from '@angular/core';
import { Users } from '../models/Users.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  private refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  

  get reload(){
    return this.refresh;
  }

  URL: string = "http://localhost:8080/api/user";

  public getUser(id: BigInteger):Observable<Users>{
    return this.http.get<Users>(this.URL+"/"+id);
  }


}
