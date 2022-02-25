import { Component, OnInit, Input } from '@angular/core';
import { ApiProductoService } from '../../../services/api-producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  productos: Producto[]=[];
  form_producto: FormGroup;
  @Input() subscription!: Subscription;
  @Input() producto!: Producto;

  constructor(
     public formulario:FormBuilder,
     private api_producto: ApiProductoService, 
     private router: Router) { 
       this.form_producto = formulario.group({
         nombre:[''],
         descripcion:[''],
         precio:['']
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
    this.mensaje('Se ha registrado el producto!');
    this.form_producto.reset();    
  }

  public update_producto(){
    this.api_producto.updateProducto(this.producto).subscribe();
    this.mensaje('Se ha actualizado el producto!')
  }

  delete_producto(id:BigInteger){
      Swal.fire({
        title: '¿Seguro que desea eliminar el registro?',
        text: "El registro se eliminará permanentemente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api_producto.deleteProducto(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          )
        }
      })
    
  }

  cargar_datos(data: Producto){
    this.producto = data;
    console.log(this.producto);
  }

  mensaje(texto: string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: texto,
      showConfirmButton: false,
      timer: 1800
    })
  }

}
