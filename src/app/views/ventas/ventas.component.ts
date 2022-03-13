import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto.interface';
import { ApiProductoService } from 'src/app/services/api-producto.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  

  constructor(private api_producto:ApiProductoService) { }

  ngOnInit(): void {
  }

}
