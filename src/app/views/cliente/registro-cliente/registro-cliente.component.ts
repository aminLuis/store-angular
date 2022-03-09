import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiClienteService } from 'src/app/services/api-cliente.service';
import Swal from 'sweetalert2';



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

  options: google.maps.MapOptions = {
    draggable: true
  }

  position: google.maps.LatLngLiteral = {
    lat: 8.75,
    lng: -75.883
  } 
  
  position_ver = {
    lat:0,
    lng:0
  }

    initMap(): void {
        const map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            zoom: this.zoom,
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
          (document.getElementById('longitud') as HTMLInputElement).value = coor.lng;
          (document.getElementById('latitud') as HTMLInputElement).value = coor.lat;      
        })
    
   }

   map_edit(): void {
    const map = new google.maps.Map(
      document.getElementById("map_editar") as HTMLElement,
      {
        zoom: this.zoom,
        center: this.position_ver
      }
    );

    const marker = new google.maps.Marker({
      position: this.position_ver,
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
      (document.getElementById('longitud_e') as HTMLInputElement).value = coor.lng;
      (document.getElementById('latitud_e') as HTMLInputElement).value = coor.lat;  
    })

}


  clientes: Cliente[]=[];
  form_cliente: FormGroup;
  @Input() subscription!: Subscription;
  @Input() cliente!: Cliente;


  constructor(private api_cliente:ApiClienteService,public formulario:FormBuilder) { 
    this.form_cliente = formulario.group({
      cedula:[''],
      nombre:[''],
      apellidos:[''],
      latitud:[''],
      longitud:[''],
      telefono:['']
    });
  }

  ngOnInit(): void {
    this.listar_clientes();
    this.subscription = this.api_cliente.reload.subscribe(()=>{
    this.listar_clientes();
  });
  }

  listar_clientes(){
    this.api_cliente.getClientes().subscribe(data=>{
      this.clientes = data;
    })
  }

  save_cliente(){
    
      this.form_cliente.value['latitud'] = (document.getElementById('latitud') as HTMLInputElement).value;
      this.form_cliente.value['longitud'] = (document.getElementById('longitud') as HTMLInputElement).value;
      this.api_cliente.saveCliente(this.form_cliente.value).subscribe();
      this.mensaje('Cliente registrado con exito!');
      this.form_cliente.reset();
      console.log(this.form_cliente.value);  
  }

  update_cliente(){
    if(this.validar_editar()){
      this.mensaje_error('Los campos deben estar llenos');
    }else{
      this.cliente.latitud = (document.getElementById('latitud_e') as HTMLInputElement).value;
      this.cliente.longitud = (document.getElementById('longitud_e') as HTMLInputElement).value;
      this.api_cliente.updateCliente(this.cliente).subscribe();
      console.log(this.cliente);
      this.mensaje('Se ha actualizado el cliente');
    }
    
  }

  delete_cliente(id:BigInteger){
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
        this.api_cliente.deleteCliente(id).subscribe();
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  
  }

  cargar_datos(data: Cliente){
    this.cliente = data;
  
    this.position_ver = {
     lat:parseFloat(this.cliente.latitud),
     lng:parseFloat(this.cliente.longitud)
    }
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
    this.form_cliente.reset();
    this.listar_clientes();
  }

  validar_editar(){
    if(this.cliente.cedula===null||
       this.cliente.nombre===''||
       this.cliente.apellidos===''||
       this.cliente.latitud===''||
       this.cliente.longitud===''||
       this.cliente.telefono===null){
      return true;
    }else{
      return false;
    }
  }

}
