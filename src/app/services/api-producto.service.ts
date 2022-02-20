import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiProductoService {

  private refresh = new Subject<void>();

  constructor(private http:HttpClient) { }

  get reload(){
    return this.refresh;
  }

  URL: string = "http://localhost:8080/api/producto";

  public getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.URL);
  }

  public getProducto(id: BigInteger):Observable<Producto>{
    return this.http.get<Producto>(this.URL+id);
  }

  public saveProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.URL,producto).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public deleteProducto(id: BigInteger):Observable<{}>{
    return this.http.delete<Producto>(this.URL+id).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public updateProducto(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(this.URL+producto.id,producto).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  

}
