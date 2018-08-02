import { TestBed, inject } from '@angular/core/testing';
import { SearchSetRepository } from './search-set.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchSetRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchSetRepository],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([SearchSetRepository], (service: SearchSetRepository) => {
    expect(service).toBeTruthy();
  }));
});
