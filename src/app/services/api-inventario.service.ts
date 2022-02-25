import { Injectable } from '@angular/core';
import { Inventario } from '../models/Inventario.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiInventarioService {

  private refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  get reload(){
    return this.refresh;
  }

  URL: string = "http://localhost:8080/api/inventario";

  public getInventarios():Observable<Inventario[]>{
    return this.http.get<Inventario[]>(this.URL);
  }

  public getInventario(id: BigInteger):Observable<Inventario>{
    return this.http.get<Inventario>(this.URL+"/"+id);
  }

  public saveInventario(inventario: Inventario):Observable<Inventario>{
    return this.http.post<Inventario>(this.URL,inventario)
    .pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public deleteInventario(id: BigInteger):Observable<{}>{
    return this.http.delete<Inventario>(this.URL+"/"+id).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public updateInventario(inventario:Inventario):Observable<Inventario>{
    return this.http.put<Inventario>(this.URL+"/"+inventario.id,inventario).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }



}
