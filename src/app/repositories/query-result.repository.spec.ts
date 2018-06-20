import { TestBed, inject } from '@angular/core/testing';
import { QueryRepository } from './query.repository';

describe('QueryRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryRepository]
    });
  });

  it('should be created', inject([QueryRepository], (service: QueryRepository) => {
    expect(service).toBeTruthy();
  }));
});
