import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


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

  centro: google.maps.LatLngLiteral = {
    lat: 8.75,
    lng: -75.883
  }
  zoom = 15;
  title = 'Marker'

  position: google.maps.LatLngLiteral = {
    lat: 8.75,
    lng: -75.883
  }

    

  options: google.maps.MapOptions = {
   draggable:true
  }
  

    initMap(): void {

    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 4,
        center: myLatLng,
      }
    );
  
    const marker = new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
      draggable:true
    });

    interface coordenadas {
      lat: string;
      lng: string;
    }

    google.maps.event.addListener(marker,'dragend',function(){
      let coor:coordenadas = JSON.parse(JSON.stringify(marker.getPosition()));
      console.log(coor.lat);
    })
    

  }

  constructor() { }

  ngOnInit(): void {
   this.initMap();
  }

  


}
