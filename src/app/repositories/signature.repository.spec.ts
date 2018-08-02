import { TestBed, inject } from '@angular/core/testing';
import { SignatureRepository } from './signature.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignatureRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignatureRepository],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([SignatureRepository], (service: SignatureRepository) => {
    expect(service).toBeTruthy();
  }));
});
