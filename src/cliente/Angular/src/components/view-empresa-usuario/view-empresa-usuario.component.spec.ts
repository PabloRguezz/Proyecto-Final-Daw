import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpresaUsuarioComponent } from './view-empresa-usuario.component';

describe('ViewEmpresaUsuarioComponent', () => {
  let component: ViewEmpresaUsuarioComponent;
  let fixture: ComponentFixture<ViewEmpresaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpresaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmpresaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
