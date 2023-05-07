import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServiciosComponent } from './empresa-servicios.component';

describe('EmpresaServiciosComponent', () => {
  let component: EmpresaServiciosComponent;
  let fixture: ComponentFixture<EmpresaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
