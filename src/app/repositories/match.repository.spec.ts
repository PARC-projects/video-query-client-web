import { TestBed, inject } from '@angular/core/testing';
import { MatchRepository } from './match.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MatchRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchRepository],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([MatchRepository], (service: MatchRepository) => {
    expect(service).toBeTruthy();
  }));
});
