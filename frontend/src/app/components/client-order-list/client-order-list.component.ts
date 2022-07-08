import { Component, OnInit } from '@angular/core';
import { ModelPedido } from '../../model/model.pedido';
import { PedidosService } from '../../service/pedidos.service';
import { ModelPedidoDetalle } from '../../model/model.pedido-detalle';


import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-order-list',
  templateUrl: './client-order-list.component.html',
  styleUrls: ['./client-order-list.component.css']
})
export class ClientOrderListComponent implements OnInit {

  pedidos: ModelPedido[] = [];
  detallesPedido: ModelPedidoDetalle[] = [{
    per_cedula: "",
    per_nombres: "",
    per_telefono: "",
    per_correo: "",
    pro_nombre: "",
    pro_descripcion: "",
    codigo_prod: "",
    ped_cab_id: -1,
    per_id: -1,
    ped_cab_codigo: "",
    ped_cab_fecha: "",
    ped_cab_subtotal: -1,
    ped_cab_iva: -1,
    ped_cab_total: -1,
    ped_det_id: -1,
    ped_det_cant: -1,
    ped_det_unitario: -1,
    ped_det_total: -1
  }
  ];
  cliente: string = '1004600183';

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
    this.leerPedidosByCedula();
    this.form = this.formBuilder.group({
      txtCodigoPedido: ['']
    })
  }

  public leerPedidosByCedula() {
    this.pedidoService.getOrderHeadersByCedula(this.cliente).subscribe(
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
          this.leerPedidosByCedula();
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

  header = [['Código', 'Nombre Producto', 'Precio', 'Cantidad', 'Total']]

  tableData: any = []

  public llenarTableData() {
    var dataTable: any = []
    this.detallesPedido.forEach(detalle => {
      dataTable.push(detalle.codigo_prod);
      dataTable.push(detalle.pro_nombre);
      dataTable.push(detalle.ped_det_unitario);
      dataTable.push(detalle.ped_det_cant);
      dataTable.push(detalle.ped_det_total);
      this.tableData.push(dataTable);
    });
  }

  public generarComprobantePedido() {
    this.llenarTableData();

    console.log(this.detallesPedido);
    console.log(this.tableData);


    // const doc = new jsPDF('p', 'pt', 'a4');
    const doc = new jsPDF();

    // -------------------------------------------------------------------------------------------
    //                  HEADER ORDER PDF
    // -------------------------------------------------------------------------------------------

    doc.setFontSize(26);
    doc.text("Shopping Cart", 105, 35, { align: 'center' });
    doc.text("This is centred text.", 105, 80, { align: 'center' });
    doc.text("Datos del Pedido", 105, 90, { align: 'center' });
    doc.text("Código Pedido: ", 105, 100);
    doc.text("PC000001", 105, 100);
    doc.text("Fecha de Pedido:", 105, 110);
    doc.text("08/07/2022:", 105, 110);
    doc.text("Datos del Cliente", 105, 120);
    doc.text("Cédula:", 105, 130);
    doc.text("Nombres:", 105, 130);
    doc.text("Brayan Pulamarin:", 105, 80);
    doc.text("Correo:", 105, 80);
    doc.text("bapulamarinc@utn.edu.ec:", 105, 80);
    doc.text("Teléfono:", 105, 80);
    doc.text("0999999999", 105, 80);

    // -------------------------------------------------------------------------------------------
    //                  DETAILS ORDER PDF
    // -------------------------------------------------------------------------------------------

    doc.setFontSize(18);
    doc.text('My Team Detail', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: this.header,
      body: this.tableData,
      theme: 'plain',
      margin:{top: 100}
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })

    // -------------------------------------------------------------------------------------------
    //                  FOOTER ORDER PDF
    // -------------------------------------------------------------------------------------------

    doc.text("Subtotal:", 105, 200);
    doc.text("100", 105, 80);
    doc.text("Iva (12%):", 105, 80);
    doc.text("1.20", 105, 80);
    doc.text("Total:", 105, 80);
    doc.text("11.20", 105, 80);

    doc.text("____________________________________________", 105, 80);
    doc.text("1727468512", 105, 80);
    doc.text("Brayan Pulamarin", 105, 80);

    doc.text("________________________________________________________________________________________________________________", 105, 80);
    doc.text("Este documento cuenta con una validez de 30 días hábiles.", 105, 80);
    doc.text("Fecha Generación Documento: 08/07/2022", 105, 80);
    doc.text("________________________________________________________________________________________________________________", 105, 80);

    doc.output('dataurlnewwindow');
  }

}
