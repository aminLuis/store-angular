import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiProductoService {

  constructor(private http:HttpClient) { }

  public getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>("http://localhost:8080/api/productos");
  }

  public getProducto(id: BigInteger):Observable<Producto>{
    return this.http.get<Producto>("URL"+id);
  }

  public saveProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>("URL",producto);
  }

}
