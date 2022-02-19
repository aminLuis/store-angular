import { Component, OnInit, Input } from '@angular/core';
import { ApiProductoService } from '../../../services/api-producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  productos: Producto[]=[];
  form_producto: FormGroup;
  @Input() subscription!: Subscription;

  constructor(
     public formulario:FormBuilder,
     private api_producto: ApiProductoService, 
     private router: Router) { 
       this.form_producto = formulario.group({
         nombre:[''],
         descripcion:[''],
         precio:[''],
         stock:['']
       });
     }

  ngOnInit(): void {
    this.listar_productos();
    this.subscription = this.api_producto.reload.subscribe(()=>{
      this.listar_productos();
    });
  }

  listar_productos(){
    this.api_producto.getProductos().subscribe(data =>{
    this.productos = data;
    });
  }

  save_producto():any{
    this.api_producto.saveProducto(this.form_producto.value).subscribe();
    this.form_producto.reset();    
  }

  public update_producto(){

  }

  delete_producto(id:BigInteger){
    if(confirm('¿Desea eliminar el registro?')){
      this.api_producto.deleteProducto(id).subscribe();
    }
    
  }

}
