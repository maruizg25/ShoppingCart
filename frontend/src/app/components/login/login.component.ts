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
    this.SignIn()
  }

  SignIn(){
    console.log(this.UsuarioDatos)
    this.clientsService.Login().subscribe((data:any)=>{
      this.dataUser= data;
      console.log(this.dataUser)
    })
  }

  LogIn(){
    let login = false;
    let rol_id = 0;
    console.log(this.UsuarioDatos.usr_usuario)
    console.log(this.UsuarioDatos.usr_clave)
    for (let index = 0; index < this.dataUser.length; index++) {
        if (this.dataUser[index].usr_clave === this.UsuarioDatos.usr_clave
          && this.dataUser[index].usr_usuario === this.UsuarioDatos.usr_usuario) {
           login = true;
           rol_id= this.dataUser[index].rol_id;
        } else{
          console.log("Loggeado No")
        }
    }

    if (login) {
      if (rol_id==1) {
        this.router.navigate(['/productos'])
      }
      if (rol_id==2) {
        this.router.navigate(['/client-order-list'])
      }
    }else{
      alert("Credenciales erroneas")
    }
  }

}
