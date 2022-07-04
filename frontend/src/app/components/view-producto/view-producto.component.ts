import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-view-producto',
  templateUrl: './view-producto.component.html',
  styleUrls: ['./view-producto.component.css']
})
export class ViewProductoComponent implements OnInit {
  public productList : any ;
  constructor(private productListService : ProductoService) { }

  ngOnInit(): void {
    this.productListService.getProduct().subscribe((res:any)=>{
      this.productList = res;
      console.log(this.productList)
      })
  }

}
