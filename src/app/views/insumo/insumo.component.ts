import { Component, OnInit } from '@angular/core';
import { ApiInventarioService } from 'src/app/services/api-inventario.service';
import { Inventario } from 'src/app/models/Inventario.interface';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css']
})
export class InsumoComponent implements OnInit {

  inventarios: Inventario[] = [];

  constructor(private api_inventario:ApiInventarioService) { }

  ngOnInit(): void {
    this.listar_inventario();
  }

  listar_inventario(){
    this.api_inventario.getInventarios().subscribe(data=>{
      this.inventarios = data;
    })
  }

}
