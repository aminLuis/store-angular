import { Component, Input, OnInit } from '@angular/core';
import { ApiInventarioService } from 'src/app/services/api-inventario.service';
import { Router } from '@angular/router';
import { Inventario } from 'src/app/models/Inventario.interface';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventarios: Inventario[] = [];
  array_inventario = {
    descripcion:'',
    fecha:''
  };

  constructor(private api_inventario: ApiInventarioService, private router: Router) { }

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
    console.log(this.array_inventario);
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
