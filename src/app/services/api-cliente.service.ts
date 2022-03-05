import { Injectable } from '@angular/core';
import { Cliente } from '../models/Cliente.interface';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClienteService {

  private refresh = new Subject<void>();

  get reload(){
    return this.refresh;
  }

  URL: string = "http://localhost:8080/api/cliente";

  constructor(private http:HttpClient) { }

  public getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.URL);
  }

  public getCliente(id:BigInteger):Observable<Cliente>{
    return this.http.get<Cliente>(this.URL+"/"+id);
  }

  public saveCliente(nuevo:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.URL,nuevo)
    .pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public deleteCliente(id:BigInteger):Observable<{}>{
    return this.http.delete<Cliente>(this.URL+"/"+id)
    .pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public updateCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.URL+"/"+cliente.id,cliente)
    .pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

}
