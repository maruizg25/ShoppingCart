import { Component, OnInit } from '@angular/core';
import { ModelCliente } from 'src/app/model/model.cliente';
import { ClientesService } from 'src/app/service/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: ModelCliente[] = [];
  constructor(private _clienteService: ClientesService) { }

  ngOnInit(): void {
    this.getClients()
  }

  getClients (){
    this._clienteService.getClients().subscribe((client: any)=>{
      this.clientes = client
      console.log(this.clientes)
    },(error) => console.warn(error)
    )
    
  }

}
