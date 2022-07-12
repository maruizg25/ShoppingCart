import { Component, OnInit } from '@angular/core';
import { ModelCliente } from 'src/app/model/model.cliente';
import { ClientesService } from 'src/app/service/clientes.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes : ModelCliente[] = [];
  clientefromGroup!: FormGroup;

  public informacionCliente = {
    per_id: 0,
    per_cedula: '',
    per_nombres: '',
    per_telefono: '',
    per_correo: '',
    per_direccion: '',
    per_estadocivil: '',
    per_ciudad: ''

  }
  
  constructor(private _clienteService: ClientesService,
     private formbuilder:FormBuilder) {
    this.clientefromGroup = this.formbuilder.group({
      per_id: [''],
      per_cedula: [''],
      per_nombres: [''],
      per_telefono: [''],
      per_correo: [''],
      per_direccion: [''],
      per_estadocivil: [''],
      per_ciudad: ['']      
    });
  }
      

  ngOnInit(): void {
   this.getAllClientes();
  }


  public getAllClientes(){
    this._clienteService.getAllClientes().subscribe(
      (data: ModelCliente[]) => {
        this.clientes = data;
        console.log(data);
      });
  }
  
  public actualizarCliente(per_id:any , cliente:any){
    this._clienteService.updateCliente(per_id , cliente).subscribe(
      res => {
        this.getAllClientes();
      });
    }
  
  public eliminarCliente(per_id:any , cliente:any){
    this._clienteService.deleteCliente(per_id , cliente).subscribe(
      res => {
        this.getAllClientes();
      });
    }

  public infoCliente(per_id:any,per_cedula: any,per_nombres: any,
  per_telefono: any, per_correo: any,per_direccion: any,
  per_estadocivil: any, per_ciudad: any){
    this.informacionCliente.per_id = per_id;
    this.informacionCliente.per_cedula = per_cedula;
    this.informacionCliente.per_nombres = per_nombres;
    this.informacionCliente.per_telefono = per_telefono;
    this.informacionCliente.per_correo = per_correo;
    this.informacionCliente.per_direccion = per_direccion;
    this.informacionCliente.per_estadocivil = per_estadocivil;
    this.informacionCliente.per_ciudad = per_ciudad;

  }


}
