import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'Client_View'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('Client_View');
  // });

  it('Correo electrónico correcto.', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.componentInstance;

    const mail = "bapulamarinc@utn.edu.ec";
    expect(app.validateMail(mail)).toBeTrue();
  });

  it('Cédula de identidad correcta.', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.componentInstance;

    const mail = "1727468512";
    expect(app.validateMail(mail)).toBeFalse();
  });

  it('Registro Incorrecto.', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.componentInstance;

    app.clienteData.per_cedula = "1727468512";
    app.clienteData.per_ciudad = "Cayambe";
    app.clienteData.per_correo = "bapulamarinc@utn.edu.ec";
    app.clienteData.per_nombres = "Brayan Pulamarin";
    app.clienteData.per_direccion = "23 de Julio";
    app.clienteData.per_telefono = "0999965212";
    app.clienteData.per_clave = "adminA124 5";
    app.clienteData.per_estadocivil = "Soltero";
    const validation = app.SignUp();
    expect(validation).toBeFalse();
  });

  it('Registro Correcto.', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.componentInstance;

    
    app.clienteData.per_cedula = "1727468512";
    app.clienteData.per_ciudad = "Cayambe";
    app.clienteData.per_correo = "bapulamarinc@utn.edu.ec";
    app.clienteData.per_nombres = "Brayan Pulamarin";
    app.clienteData.per_direccion = "23 de Julio";
    app.clienteData.per_telefono = "0999965212";
    app.clienteData.per_clave = "adminA1245";
    app.clienteData.per_estadocivil = "Soltero";
    const validation = app.SignUp();
    expect(validation).toBeTrue();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('Client_View app is running!');
  // });
});
