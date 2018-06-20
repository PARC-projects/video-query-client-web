import { TestBed, inject } from '@angular/core/testing';
import { SignatureRepository } from './signature.repository';


describe('SignatureRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignatureRepository]
    });
  });

  it('should be created', inject([SignatureRepository], (service: SignatureRepository) => {
    expect(service).toBeTruthy();
  }));
});
