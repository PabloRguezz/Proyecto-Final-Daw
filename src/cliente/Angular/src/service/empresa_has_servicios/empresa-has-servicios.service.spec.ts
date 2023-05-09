import { TestBed } from '@angular/core/testing';

import { EmpresaHasServiciosService } from './empresa-has-servicios.service';

describe('EmpresaHasServiciosService', () => {
  let service: EmpresaHasServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaHasServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
