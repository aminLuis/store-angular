import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  center = {
    lat: 8.75,
    lng: -75.883
  }  
  zoom = 15;
  title = 'Marker'
 

  constructor() { }

  ngOnInit(): void {
  }

 

}
