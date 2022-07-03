import { Component, OnInit } from '@angular/core';
import { ModelPedido } from '../../model/model.pedido';
import { PedidosService } from '../../service/pedidos.service';
import { ModelPedidoDetalle } from '../../model/model.pedido-detalle';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-order-list',
  templateUrl: './client-order-list.component.html',
  styleUrls: ['./client-order-list.component.css']
})
export class ClientOrderListComponent implements OnInit {

  pedidos: ModelPedido[] = [];
  detallesPedido: ModelPedidoDetalle[] = [];

  public form!: FormGroup;

  public informacionPedido = {
    ped_cab_id: -1,
    per_id: -1,
    ped_cab_codigo: "",
    ped_cab_fecha: "",
    ped_cab_subtotal: "",
    ped_cab_iva: "",
    ped_cab_total: ""
  }

  constructor(private pedidoService: PedidosService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.leerPedidos();
    this.form = this.formBuilder.group({
      txtCodigoPedido: ['']
    })
  }

  public leerPedidos() {
    this.pedidoService.getOrderHeaders().subscribe(
      (pedido: any) => {
        this.pedidos = pedido
        console.log(this.pedidos)
      },
      (error) => console.warn(error)
    )
  }

  public cambiarformatoFecha(date: any) {
    var fecha = String(date)
    return fecha.replace("T00:00:00.000Z", "")
  }
  public leerPedidoById() {
    this.pedidoService.getOrderById(this.form.value.txtCodigoPedido).subscribe(
      (pedido: any) => {
        this.pedidos = pedido
        if (this.pedidos.length == 0) {
          this.leerPedidos();
        }
        console.log(this.pedidos)
      },
      (error) => console.warn(error)
    )
  }

  public leerDetalleByPedidoId(ped_cab_id: any) {
    this.pedidoService.getDetailByHeaderId(ped_cab_id).subscribe(
      (detalle: any) => {
        this.detallesPedido = detalle
        console.log(this.detallesPedido);
      },
      (error) => console.warn(error)
    )
  }

}
