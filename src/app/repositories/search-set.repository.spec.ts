import { TestBed, inject } from '@angular/core/testing';
import { SearchSetRepository } from './search-set.repository';

describe('SearchSetRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchSetRepository]
    });
  });

  it('should be created', inject([SearchSetRepository], (service: SearchSetRepository) => {
    expect(service).toBeTruthy();
  }));
});
