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
  insumos: Insumo[] = [];
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

  listar_productos(){
    this.api_insumo.getInsumos().subscribe(data =>{
    this.insumos = data;
    });
  }

  save_insumo(){
    if(!this.form_insumo.valid){
      this.mensaje_error('Los campos deben estar llenos');
    }else{
      this.api_insumo.saveInsumo(this.form_insumo.value).subscribe();
      this.mensaje('Se ha registrado el insumo!');
      this.form_insumo.reset();
    }
  }

  public update_insumo(){
    this.api_insumo.updateInsumo(this.insumo).subscribe();
    this.mensaje('Se ha actualizado el insumo!')
  }


  delete_insumo(id:BigInteger){
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
        this.api_insumo.deleteInsumo(id).subscribe();
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  
  }


  cargar_datos(data: Insumo){
    this.insumo = data;
    console.log(this.insumo);
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
