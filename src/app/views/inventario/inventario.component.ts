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
    this.api_inventario.saveInventario(this.form_inventario.value).subscribe();
    this.mensaje('Inventario registrado');
    this.form_inventario.reset();
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
