import { TestBed, inject } from '@angular/core/testing';
import { UserRepository } from './user.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRepository],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([UserRepository], (service: UserRepository) => {
    expect(service).toBeTruthy();
  }));
});
