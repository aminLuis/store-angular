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

  position: google.maps.LatLngLiteral = {
    lat: 8.75,
    lng: -75.883
  }  

    initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: this.center
      }
    );
  
    const marker = new google.maps.Marker({
      position: this.position,
      map,
      title: "Marker",
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
