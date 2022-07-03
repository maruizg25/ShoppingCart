import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    constructor(private http: HttpClient) { }
    private url = "https://app-backend-sh-cart.herokuapp.com/clientes";

    public getClients() {
        return this.http.get(this.url);
    }
    public Login() {
        const url_login = "https://app-backend-sh-cart.herokuapp.com/login"
        return this.http.get(url_login);
    }



}
