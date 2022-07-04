import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductoService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-view-producto',
  templateUrl: './view-producto.component.html',
  styleUrls: ['./view-producto.component.css']
})
export class ViewProductoComponent implements OnInit {
  public productList : any ;
  constructor(private productListService : ProductoService ,
    private cartService : CartService) { }

  ngOnInit(): void {
    this.productListService.getProduct().subscribe((res:any)=>{
      this.productList = res;
      console.log(this.productList);
    this.productList.forEach((a:any)=>{
      Object.assign(a,{quantity:1,total:a.pro_precio})
      });
      })
  }

  addToCart(item: any){
    this.cartService.addtoCart(item);
  }

}
