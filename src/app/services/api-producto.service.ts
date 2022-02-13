import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ApiProductoService {

  constructor(private http:HttpClient) { }

  public getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>("URL");
  }

}
