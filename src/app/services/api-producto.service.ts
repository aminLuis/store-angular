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

  public getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>("http://localhost:8080/api/productos");
  }

  public getProducto(id: BigInteger):Observable<Producto>{
    return this.http.get<Producto>("URL"+id);
  }

  public saveProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>("http://localhost:8080/api/producto",producto).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public deleteProducto(id: BigInteger):Observable<{}>{
    return this.http.delete<Producto>("http://localhost:8080/api/producto/"+id).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

}
