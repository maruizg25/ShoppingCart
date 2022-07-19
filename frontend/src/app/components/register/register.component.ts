import { Component, Input, OnInit } from '@angular/core';
import { ModelCiudad } from 'src/app/model/model.ciudad';
import { ModelEstadoCivil } from 'src/app/model/model.state';
import { ClientesService } from 'src/app/service/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() clienteData = {
    per_rol: 2,
    per_cedula: '',
    per_nombres: '',
    per_direccion: '',
    per_telefono: '',
    per_correo: '',
    per_clave: '',
    per_estado: true,
    per_estadocivil: '',
    per_ciudad: ''
  }

  // myForm: FormGroup;

  constructor(private clienteService: ClientesService) {
    // this.myForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    //   email: ['', [Validators.required], Validators.email],
    //   age: ['', [Validators.required]],
    //   url: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    // });
  }

  ciudades: ModelCiudad[] = [];
  estado_civiles: ModelEstadoCivil[] = [];
  ngOnInit(): void {
    this.GetAllCities();
    this.GetAllCivilStates();
  }


  GetAllCities() {
    this.clienteService.getCities().subscribe(
      (ciudad: any) => {
        this.ciudades = ciudad
        console.log(ciudad);
      },
      (error) => console.warn(error)
    )
  }

  GetAllCivilStates() {
    this.clienteService.getCivilStates().subscribe(
      (estado: any) => {
        this.estado_civiles = estado
        console.log(estado);
      },
      (error) => console.warn(error)
    )
  }

  validateNames(namesPer: string) {

    var expr: RegExp = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/g;
    var verification = expr.test(namesPer);
    return verification;
  }

  SignUp() {
    console.log(this.clienteData)
    // utilizar try catch
    try {

      let warningNames = document.getElementById('valueNames')!;
      let warningAddress = document.getElementById('valueAddress')!;
      let warningPhone = document.getElementById('valuePhone')!;
      let warningMail = document.getElementById('valueMail')!;
      let warningPassword = document.getElementById('valuePassword')!;

      let comprobación = true;

      if (this.validateNames(this.clienteData.per_nombres)) {
        warningNames.style.display = 'none';
      } else {
        warningNames.style.display = 'block';
        comprobación = false;
      }

      if (this.clienteData.per_direccion == '') {
        warningAddress.style.display = 'block';
        comprobación = false;
      } else {
        warningAddress.style.display = 'none';
      }
      if (this.clienteData.per_telefono == '') {
        warningPhone.style.display = 'block';
        comprobación = false;
      } else {
        warningPhone.style.display = 'none';
      }
      if (this.clienteData.per_correo == '') {
        warningMail.style.display = 'block';
        comprobación = false;
      } else {
        warningMail.style.display = 'none';
      }

      if (this.clienteData.per_clave.length < 8) {
        warningPassword.style.display = 'block';
        comprobación = false;
      } else {
        warningPassword.style.display = 'none';
      }


      if (comprobación) {
        // this.clienteService.postClients(this.clienteData).subscribe((data: {}) => { })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su registro ha sido exitoso',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Revise si los datos ingresados son correctos.',
          showConfirmButton: false,
          timer: 2000
        })
      }


    } catch (error) {
      console.log(error);

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Su registro ha fallado',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


}
