import { Component, OnInit } from '@angular/core';
import { ModelPedido } from 'src/app/model/model.pedido';
import { PedidosService } from 'src/app/service/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: ModelPedido[] = [];
  constructor(private pedidoservice: PedidosService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.pedidoservice.getOrderHeaders().subscribe((pedido:any) => {  
      this.pedidos = pedido;
      console.log(this.pedidos)
    },error => console.log(error)
    )
  }

}
