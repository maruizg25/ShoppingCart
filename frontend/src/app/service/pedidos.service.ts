import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  public getOrderHeaders() {
    const url = "https://app-backend-sh-cart.herokuapp.com/pedidos/cabeceras";
    return this.http.get(url);
  }

  public getOrderById(ped_cab_id: any) {
    const url = "https://app-backend-sh-cart.herokuapp.com/pedidos/cabeceras/" + ped_cab_id;
    return this.http.get(url);
  }

  public getDetailByHeaderId(det_cab_id: any) {
    const url = "https://app-backend-sh-cart.herokuapp.com/pedidos/detalles/" + det_cab_id;
    return this.http.get(url);
  }
  
}
