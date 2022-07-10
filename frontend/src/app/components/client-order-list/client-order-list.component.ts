import { Component, OnInit } from '@angular/core';
import { ModelPedido } from '../../model/model.pedido';
import { PedidosService } from '../../service/pedidos.service';
import { ModelPedidoDetalle } from '../../model/model.pedido-detalle';

// import logo from '../../../assets/Carrito'

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
    return fecha.replace("T05:00:00.000Z", "")
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


    var logo = new Image();
    logo.src = 'https://cdn0.iconfinder.com/data/icons/shopping-and-commerce-outline/512/Shopping_and_Commerce_-_Outline_21-512.png';
    // const doc = new jsPDF('p', 'pt', 'a4');
    const doc = new jsPDF();

    // -------------------------------------------------------------------------------------------
    //                  HEADER ORDER PDF
    // -------------------------------------------------------------------------------------------
    doc.setFont('courier', 'bold');
    doc.setFontSize(26);
    doc.text("Shopping Cart", 105, 15, { align: 'center' });
    doc.addImage(logo, 'PNG', 90, 20, 25, 20);
    doc.setFontSize(14);
    doc.setFont('courier', 'bold')
    doc.text("Datos del Cliente", 55, 45, { align: 'center' });
    doc.text("Datos del Pedido", 155, 45, { align: 'center' });

    doc.text("____________________________________________________________", 105, 74, { align: 'center' });
    doc.text("DETALLES DEL PEDIDO", 105, 81, { align: 'center' });
    doc.text("____________________________________________________________", 105, 82, { align: 'center' });

    doc.setFontSize(12);
    doc.text("Cédula:", 15, 53, { align: 'left' });
    doc.text("Nombres:", 15, 59, { align: 'left' });
    doc.text("Correo:", 15, 65, { align: 'left' });
    doc.text("Teléfono:", 15, 71, { align: 'left' });

    doc.text("Código Pedido: ", 120, 53, { align: 'left' });
    doc.text("Fecha de Pedido:", 120, 59, { align: 'left' });

    doc.setFont('courier', 'normal');
    doc.text(this.detallesPedido[0].per_cedula, 40, 53);
    doc.text(this.detallesPedido[0].per_nombres, 40, 59);
    doc.text(this.detallesPedido[0].per_correo, 40, 65);
    doc.text(this.detallesPedido[0].per_telefono, 40, 71);

    doc.text(this.detallesPedido[0].ped_cab_codigo, 165, 53);
    doc.text(this.cambiarformatoFecha(this.detallesPedido[0].ped_cab_fecha), 165, 59);

    // -------------------------------------------------------------------------------------------
    //                  DETAILS ORDER PDF
    // -------------------------------------------------------------------------------------------
    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: this.header,
      body: this.tableData,
      font: 'courier',
      theme: 'plain',
      margin: { top: 85 }
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })

    // -------------------------------------------------------------------------------------------
    //                  FOOTER ORDER PDF
    // -------------------------------------------------------------------------------------------

    // doc.text("Subtotal: 100", 105, 200, { align: 'center' });
    // doc.text("100", 105, 80);
    // doc.text("Iva (12%):", 105, 80);
    // doc.text("1.20", 105, 80);
    // doc.text("Total:", 105, 80);
    // doc.text("11.20", 105, 80);

    // doc.text("____________________________________________", 105, 80);
    // doc.text("1727468512", 105, 80);
    // doc.text("Brayan Pulamarin", 105, 80);

    // doc.text("________________________________________________________________________________________________________________", 105, 80);
    // doc.text("Este documento cuenta con una validez de 30 días hábiles.", 105, 80);
    // doc.text("Fecha Generación Documento: 08/07/2022", 105, 80);
    // doc.text("________________________________________________________________________________________________________________", 105, 80);

    doc.output('dataurlnewwindow');
  }

}
