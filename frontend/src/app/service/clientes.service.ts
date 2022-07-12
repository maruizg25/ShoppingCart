import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ModelCliente, updateClienteDTO } from '../model/model.cliente';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    private url = "https://app-backend-sh-cart.herokuapp.com/clientes";

    getAllClientes(): Observable<ModelCliente[]> {
        return this.http.get<ModelCliente[]>(this.url);
    }
    getClienteById(id: number): Observable<ModelCliente> {
        return this.http.get<ModelCliente>(this.url + "/" + id);
    }
   
    updateCliente(id: string, dto:updateClienteDTO){
        return this.http.put< ModelCliente>(this.url + "/" + id, dto);
    }
    deleteCliente(id: any,cliente:any){
        const urlb = "https://app-backend-sh-cart.herokuapp.com/clientes/delete/id/"+id;
        return this.http.put<ModelCliente>(urlb,cliente);
    }
    
   


}
