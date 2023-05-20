import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilEmpresaComponent } from './editar-perfil-empresa.component';

describe('EditarPerfilEmpresaComponent', () => {
  let component: EditarPerfilEmpresaComponent;
  let fixture: ComponentFixture<EditarPerfilEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPerfilEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
