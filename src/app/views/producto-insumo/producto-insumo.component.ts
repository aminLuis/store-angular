import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto.interface';
import { ApiProductoService } from 'src/app/services/api-producto.service';
import { Insumo } from 'src/app/models/Insumo.interface';
import { ApiInsumoService } from 'src/app/services/api-insumo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiProductoInsumoService } from 'src/app/services/api-producto-insumo.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Producto_insumo } from 'src/app/models/Producto_insumo.interface';

@Component({
  selector: 'app-producto-insumo',
  templateUrl: './producto-insumo.component.html',
  styleUrls: ['./producto-insumo.component.css']
})
export class ProductoInsumoComponent implements OnInit {

  productos: Producto[]=[];
  form_producto_insumo: FormGroup;
  @Input() producto!:Producto;
  insumos: Insumo[]=[];
  @Input() data_insumo!:Insumo;
  @Input() subscription!: Subscription;
  productos_insumo: Producto_insumo[]=[];
  asignaciones: Producto_insumo[]=[];

  constructor(private api_producto:ApiProductoService, 
    private api_insumo:ApiInsumoService,
    public formulario: FormBuilder,
    private api_producto_insumo:ApiProductoInsumoService
    ) {
      this.form_producto_insumo = formulario.group({
        id_producto:[''],
        id_insumo:[''],
        descripcion:[''],
        restar:['']
      });
     }

  ngOnInit(): void {
    this.listar_productos();
    this.subscription = this.api_producto_insumo.reload.subscribe(()=>{
      this.listar_productos_insumo();
      this.listar_productos();
    });
  }

  listar_productos(){
    this.api_producto.getProductos().subscribe(data=>{
      this.productos = data;
    });
  }

  listar_insumos(){
    this.api_insumo.getInsumos().subscribe(data=>{
      this.insumos = data;
    })
  }

  listar_productos_insumo(){
    this.api_producto_insumo.getProductos_insumo().subscribe(data=>{
      this.productos_insumo = data;
    })
  }

  save_producto_insumo(){
    if(this.form_producto_insumo.valid){
      this.api_producto_insumo.saveProducto_insumo(this.form_producto_insumo.value).subscribe();
      this.mensaje('Se ha registrado la asignación');
      this.form_producto_insumo.reset();
    }else{
      this.mensaje_error('Los campos deben estar llenos');
    }
  }

  
  cargar_datos_producto(data:Producto){
    this.producto = data;
  }

  listar_asignaciones(id_producto:BigInteger){
    this.api_producto_insumo.getAsignaciones(id_producto).subscribe(data=>{
      this.asignaciones = data;
      console.log(this.asignaciones);
    })
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

  mensaje_error(texo:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: texo,
      //footer: '<a href="">Why do I have this issue?</a>'
    })
  }


}
