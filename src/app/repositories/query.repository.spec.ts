import { TestBed, inject } from '@angular/core/testing';
import { QueryRepository } from './query.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QueryRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryRepository],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([QueryRepository], (service: QueryRepository) => {
    expect(service).toBeTruthy();
  }));
});
