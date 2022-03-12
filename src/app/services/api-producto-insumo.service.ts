import { Injectable } from '@angular/core';
import { Producto_insumo } from '../models/Producto_insumo.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiProductoInsumoService {
  
  private refresh = new Subject<void>();

  constructor(private http:HttpClient) { }

  get reload(){
    return this.refresh;
  }

  URL: string = "http://localhost:8080/api/producto_insumo";

  public getProductos_insumo():Observable<Producto_insumo[]>{
    return this.http.get<Producto_insumo[]>(this.URL);
  }

  public getProducto_insumo(id:BigInteger):Observable<Producto_insumo>{
    return this.http.get<Producto_insumo>(this.URL+"/"+id);
  }

  public saveProducto_insumo(nuevo:Producto_insumo):Observable<Producto_insumo>{
    return this.http.post<Producto_insumo>(this.URL,nuevo).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public updateProducto_insumo(data:Producto_insumo):Observable<Producto_insumo>{
    return this.http.put<Producto_insumo>(this.URL+"/"+data.id,data).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public deleteProducto_insumo(id:BigInteger):Observable<{}>{
    return this.http.delete<Producto_insumo>(this.URL+"/"+id).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public getAsignaciones(id_producto:BigInteger):Observable<Producto_insumo[]>{
    return this.http.get<Producto_insumo[]>(this.URL+"/"+'asignaciones/'+id_producto)
  }

}
