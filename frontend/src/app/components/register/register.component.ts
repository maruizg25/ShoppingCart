import { Component, Input, OnInit } from '@angular/core';
import { ModelCiudad } from 'src/app/model/model.ciudad';
import { ModelEstadoCivil } from 'src/app/model/model.state';
import { ClientesService } from 'src/app/service/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() clienteData = { 
    per_rol: 2,
    per_cedula: '', 
    per_nombres: '', 
    per_direccion: '', 
    per_telefono: '', 
    per_correo:'', 
    per_clave:'', 
    per_estado:true,
    per_estadocivil:'',
    per_ciudad: ''}

  constructor(private clienteService: ClientesService) { }
  ciudades: ModelCiudad[] = [];
  estado_civiles: ModelEstadoCivil[] = [];
  ngOnInit(): void {
    this.GetAllCities();
    this.GetAllCivilStates();
  }


  GetAllCities(){
    this.clienteService.getCities().subscribe(
      (ciudad:any) =>{
      this.ciudades = ciudad
      console.log(ciudad);
      },
      (error) => console.warn(error)
    )
  }

  GetAllCivilStates(){
    this.clienteService.getCivilStates().subscribe(
      (estado:any) =>{
      this.estado_civiles = estado
      console.log(estado);
      },
      (error) => console.warn(error)
    )
  }

  SignUp(){
    console.log(this.clienteData)
    // utilizar try catch
    try {
      this.clienteService.postClients(this.clienteData).subscribe((data: {})=>{})
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su registro ha sido exitoso',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Su registro ha fallado',
        showConfirmButton: false,
        timer: 1500
      })
    }
   
  }


}
