import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductoService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-view-producto',
  templateUrl: './view-producto.component.html',
  styleUrls: ['./view-producto.component.css']
})
export class ViewProductoComponent implements OnInit {
  public cantidad1 : number = 0;
  public productList : any ;
  public filterCategory : any;
  searchKey:string ="";
  @ViewChild('cantidad')
  cantidad!: ElementRef;
  constructor(private productListService : ProductoService ,
    private cartService : CartService) { }

  ngOnInit(): void {
    this.productListService.getProduct().subscribe((res:any)=>{
      this.productList = res;
      this.filterCategory = res;
      console.log(this.productList);
    this.productList.forEach((a:any)=>{
      Object.assign(a,{quantity:1,total:a.pro_precio})
      });
      })

      this.cartService.search.subscribe((val:any)=>{
        this.searchKey = val;
      })
  }

  addToCart(item: any){
    this.cartService.addtoCart(item);
    const data = document.getElementById("cantidad") 
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(this.showcategory(a.cat_id) == category|| category==''){
        return a;
      }
    })
  }

  showcategory(id: number):string{
    let category = ""
    if (id==2) {
      category ="Ropa"
    }
    if (id ==3) {
      category ="Electrodomesticos"
    }
    if (id ==4) {
      category ="Accesorios"
    }
    if (id ==5) {
      category ="Aseo Personal"
    }
    if (id ==6) {
      category ="Tecnologia"
    }
    if (id ==8) {
      category ="Limpieza"
    }
    return category
  }

}
