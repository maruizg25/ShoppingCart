import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get<any>("https://app-backend-sh-cart.herokuapp.com/productos")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}