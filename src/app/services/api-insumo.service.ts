import { Injectable } from '@angular/core';
import { Insumo } from '../models/Insumo.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiInsumoService {

  private refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  get reload(){
    return this.refresh;
  }

  URL: string = "http://localhost:8080/api/insumo";

  public getInsumos():Observable<Insumo[]>{
    return this.http.get<Insumo[]>(this.URL);
  }
  
  public getInsumo(id:BigInteger):Observable<Insumo>{
    return this.http.get<Insumo>(this.URL+"/"+id);
  }

  public saveInsumo(nuevo:Insumo):Observable<Insumo>{
    return this.http.post<Insumo>(this.URL,nuevo)
    .pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public deleteInsumo(id: BigInteger):Observable<{}>{
    return this.http.delete<Insumo>(this.URL+"/"+id).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }

  public updateInsumo(insumo:Insumo):Observable<Insumo>{
    return this.http.put<Insumo>(this.URL+"/"+insumo.id,insumo).
    pipe(
      tap(()=>{
        this.refresh.next();
      })
    )
  }




}
