import { Component, OnInit } from '@angular/core';
import { ApiProductoService } from '../../../services/api-producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto.interface';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  productos: Producto[]=[];
  form_producto: FormGroup;


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
  }

  listar_productos(){
    this.api_producto.getProductos().subscribe(data =>{
      console.log(data);
      this.productos = data;
    });
  }

  save_producto():any{
    console.log('Luis');
    console.log(this.form_producto);
  }

}
