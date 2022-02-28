import { Component, OnInit, Input } from '@angular/core';
import { ApiInventarioService } from 'src/app/services/api-inventario.service';
import { Inventario } from 'src/app/models/Inventario.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Insumo } from 'src/app/models/Insumo.interface';
import Swal from 'sweetalert2';
import { ApiInsumoService } from 'src/app/services/api-insumo.service';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css']
})
export class InsumoComponent implements OnInit {

  inventarios: Inventario[] = [];
  form_insumo: FormGroup;
  @Input() insumo!: Insumo;
 

  constructor(private api_inventario:ApiInventarioService,public formulario: FormBuilder, private api_insumo:ApiInsumoService) {
    this.form_insumo = formulario.group({
      nombre:[''],
      descripcion:[''],
      costo_unidad:[''],
      stock:[''],
      inventario:['']
    });
   }

  ngOnInit(): void {
    this.listar_inventario();
  }

  listar_inventario(){
    this.api_inventario.getInventarios().subscribe(data=>{
      this.inventarios = data;
      console.log(this.inventarios);
    })
    
  }

  save_insumo(){
    if(!this.form_insumo.valid){
      this.mensaje_error('Los campos deben estar llenos');
    }else{
    
    }
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
