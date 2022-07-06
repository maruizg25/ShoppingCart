import { Component, Input, OnInit } from '@angular/core';
import { ModelUsuario } from 'src/app/model/model.usuario';
import { ClientesService } from 'src/app/service/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataUser: ModelUsuario[] = [];
  @Input() UsuarioDatos ={ usr_usuario:'',usr_clave:''}

  constructor(private clientsService: ClientesService ,
    private router: Router) { }

  ngOnInit(): void {
   
  }
  LogIn(){
    this.router.navigate(['/view-producto']);
  }

 


}
