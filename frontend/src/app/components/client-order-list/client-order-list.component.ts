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

  public redonderNumero(numero: any) {
    var numeroRedondeado = numero.toFixed(2);
    return numeroRedondeado;
  }
  
  public leerPedidoByCodigo() {
    this.pedidoService.getOrderByCode(this.form.value.txtCodigoPedido).subscribe(
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

  public leerDetalleByCodigoPedido(ped_cab_codigo: any) {
    this.pedidoService.getDetailByHeaderCode(ped_cab_codigo).subscribe(
      (detalle: any) => {
        this.detallesPedido = detalle
        console.log(this.detallesPedido);
      },
      (error) => console.warn(error)
    )
  }

  public generarComprobantePedido() {
    var num = 2.111;
    var num2 = num.toFixed(2);
    // var generateData = function (amount: any) {
    //   var result = [];
    //   var data = {
    //     coin: "100",
    //     game_group: "GameGroup",
    //     game_name: "XPTO2",
    //     game_version: "25",
    //     machine: "20485861",
    //     vlt: "0"
    //   };
    //   for (var i = 0; i < amount; i += 1) {
    //     data.coin = (i + 1).toString();
    //     result.push(Object.assign({}, data));
    //   }
    //   return result;
    // };

    // const doc = new jsPDF('p', 'pt', 'a4');
    // var result = [];
    // result.push({
    //   id: "Código Producto",
    //   name: "Nombre Producto",
    //   price: "Precio Producto",
    //   cant: "Cantidad",
    //   total: "Total"
    // });

    // var headers = {
    //   id: "Código Producto",
    //   name: "Nombre Producto",
    //   price: "Precio Producto",
    //   cant: "Cantidad",
    //   total: "Total"
    // };
    // doc.text("Reporte", 105, 80);
    // // doc.table(1, 1, generateData(100), headers, { autoSize: true });
    // doc.save("prueba.pdf");
  }

}
