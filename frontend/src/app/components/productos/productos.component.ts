import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelProductos } from 'src/app/model/model.productos';
import { ModelCategoria } from 'src/app/model/model.categoria';
import { ProductoService } from 'src/app/service/productos.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: ModelProductos[] = [];
  categorias: ModelCategoria[] = [];
  public idCategoria!: number;
  public descripcionCategoria!: String

  public form!: FormGroup;
  pro: string = 'Anillo';

  public informacionProducto = {
    pro_id: -1,
    pro_codigo: "",
    cat_id: -1,
    cat_descripcion: "",
    pro_nombres: "",
    pro_descripcion: "",
    pro_cantidad: "",
    pro_precio: "",
    pro_imagen: ""
  }

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productoService: ProductoService) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.descripcionCategoria=params['cat_descripcion']

      }
      
    )
    this.form = this.formBuilder.group({
      txtpro_id: [''],
      txtpro_nombres: [''],
      txtcantidad: [''],
      txtpro_codigo: [''],
      txtpro_cantidad: [''],
      txtpro_descripcion: [''],
      txtpro_precio: [''],
      txtpro_imagen: [''],
      categoriaSelected: []
    })
    this.leerProductos();
    this.leerProductoByCodigo();
  }

  public leerProductos() {
    this.productoService.getProduct().subscribe(
      (producto: any) => {
        this.productos = producto
        console.log(this.productos)
      },
      (error) => console.warn(error)
    )
  }

  public leerPedidosByName() {
    this.productoService.getProductByName(this.pro).subscribe(
      (producto: any) => {
        this.productos = producto
        console.log(this.productos)
      },
      (error) => console.warn(error)
    )
  }

  public leerDetalleByProductoId(pro_id: any) {
    this.productoService.getProductById(pro_id).subscribe(
      (detalle: any) => {
        this.productos = detalle
        console.log(this.productos);
      },
      (error) => console.warn(error)
    )
  }

  public leerProductoByCodigo() {
    this.productoService.getProductById(this.form.value.txtpro_id).subscribe(
      (producto: any) => {
        this.productos = producto
        if (this.productos.length == 0) {
          this.leerPedidosByName();
        }
        console.log(this.productos)
      },
      (error) => console.warn(error)
    )
  }

  public postProduct() {
    this.productoService.postCreateProduct({
      pro_codigo: this.form.value.txtpro_codigo,
      cat_id: this.form.value.categoriaSelected,
      pro_nombres: this.form.value.txtpro_nombre,
      pro_descripcion: this.form.value.txtpro_descripcion,
      pro_cantidad: this.form.value.cantidadSelected,
      pro_precio: this.form.value.txtpro_precio,
      pro_imagen: this.form.value.txtpro_imagen,
      pro_estado: this.form.value.txtpro_estado
    }).subscribe(
      respuesta => {
        console.log('Producto creado correctamente');
        this.form.reset();
        this.leerProductos();
      }
    )
  }
  public deleteProduct(pro_id: any) {
    this.productoService.deleteProduct(pro_id).subscribe(
      respuesta => {
        console.log('Producto Eliminado');
        this.leerProductos()
      }
    )
  }
  public infoUpdateProducto(pro_id: any, pro_codigo: any, cat_id: any, pro_nombres: any, pro_descripcion: any,
    pro_cantidad: any, pro_precio: any, pro_imagen: any) {
    this.informacionProducto.pro_id = pro_id;
    this.informacionProducto.pro_codigo = pro_codigo;
    this.informacionProducto.cat_id = cat_id;
    this.informacionProducto.pro_nombres = pro_nombres;
    this.informacionProducto.pro_descripcion = pro_descripcion;
    this.informacionProducto.pro_cantidad = pro_cantidad;
    this.informacionProducto.pro_precio = pro_precio;
    this.informacionProducto.pro_imagen = pro_imagen;
  }


  public actualizarProducto(pro_id: any) {

    this.productoService.putUpdateProduct({
      pro_id: pro_id,
      pro_codigo: this.form.value.txtpro_codigo,
      cat_id: this.form.value.categoriaSelected,
      pro_nombres: this.form.value.txtpro_nombre,
      pro_descripcion: this.form.value.txtpro_descripcion,
      pro_cantidad: this.form.value.cantidadSelected,
      pro_precio: this.form.value.txtpro_precio,
      pro_imagen: this.form.value.txtpro_imagen,

    }).subscribe(
      respuesta => {
        console.log('Producto actualizado correctamente');
        this.form.reset()
        this.leerProductos()

      }
    )
  }

}
