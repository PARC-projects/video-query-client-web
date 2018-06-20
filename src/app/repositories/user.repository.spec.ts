import { TestBed, inject } from '@angular/core/testing';
import { SignatureRepository } from './signature.repository';
import { UserRepository } from './user.repository';


describe('UserRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRepository]
    });
  });

  it('should be created', inject([UserRepository], (service: UserRepository) => {
    expect(service).toBeTruthy();
  }));
});
