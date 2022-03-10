import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto.interface';
import { ApiProductoService } from 'src/app/services/api-producto.service';
import { Insumo } from 'src/app/models/Insumo.interface';
import { ApiInsumoService } from 'src/app/services/api-insumo.service';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private api_producto:ApiProductoService, 
    private api_insumo:ApiInsumoService,
    public formulario: FormBuilder
    ) {
      this.form_producto_insumo = formulario.group({
        id_producto:[''],
        id_insumo:[''],
        restar:['']
      });
     }

  ngOnInit(): void {
    this.listar_productos();
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

  save_producto_insumo(){
    console.log(this.form_producto_insumo.value)
  }

  cargar_datos_producto(data:Producto){
    this.producto = data;
  }

}
