import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ClientOrderListComponent } from './client-order-list.component';

describe('ClientOrderListComponent', () => {
  let component: ClientOrderListComponent;
  let fixture: ComponentFixture<ClientOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientOrderListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Verificar pedidos por cliente', () => {

  // });
});
