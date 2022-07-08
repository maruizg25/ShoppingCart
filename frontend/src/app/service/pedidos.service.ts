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

  public getOrderHeadersByCedula(per_cedula: any) {
    const url = "https://app-backend-sh-cart.herokuapp.com/pedidos/cabeceras/cedula/" + per_cedula;
    return this.http.get(url);
  }

  public getOrderByCode(ped_codigo: any) {
    const url = "https://app-backend-sh-cart.herokuapp.com/pedidos/cabeceras/codigo/" + ped_codigo;
    return this.http.get(url);
  }

  public getDetailByHeaderCode(det_cab_codigo: any) {
    const url = "https://app-backend-sh-cart.herokuapp.com/pedidos/masterdetalle/codigo/" + det_cab_codigo;
    return this.http.get(url);
  }
  
}
