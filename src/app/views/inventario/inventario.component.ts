import { Component, Input, OnInit } from '@angular/core';
import { ApiInventarioService } from 'src/app/services/api-inventario.service';
import { Router } from '@angular/router';
import { Inventario } from 'src/app/models/Inventario.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventarios: Inventario[] = [];
  form_inventario: FormGroup;
  @Input() inventario!: Inventario;
  

  constructor(private api_inventario: ApiInventarioService, private router: Router, formulario: FormBuilder) { 
    this.form_inventario = formulario.group({
      descripcion:[''],
      fecha:[''],
      estado:'ACTIVO'
    });
  }

  ngOnInit(): void {
    this.listar_inventarios();
    this.api_inventario.reload.subscribe(()=>{
      this.listar_inventarios();
    })
  }

  listar_inventarios(){
    this.api_inventario.getInventarios().subscribe(data =>{
      this.inventarios = data;
    })
  }

  save_inventario():any{

    if(this.form_inventario.valid){
      this.api_inventario.saveInventario(this.form_inventario.value).subscribe();
      this.mensaje('Inventario registrado');
      this.form_inventario.reset();
    }else{
      this.mensaje_error('Los campos deben estar llenos');
    }
    
  }

  update_inventario(){

    if(!this.validar_editar()){
      this.api_inventario.updateInventario(this.inventario).subscribe();
      this.mensaje('Se ha actualizado el inventario');
    }else{
      this.mensaje_error('Los campos deben estar llenos');
    }
    
  }

  delete_inventario(id:BigInteger){
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
        this.api_inventario.deleteInventario(id).subscribe();
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  
}


  cargar_datos(data: Inventario){
    this.inventario = data;
    console.log(this.inventario);
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

  reset_form(){
    this.form_inventario.reset();
    this.listar_inventarios();
  }

  validar_editar(){
    if(this.inventario.descripcion===''||
       this.inventario.fecha===null){
      return true;
    }else{
      return false;
    }
  }

}
