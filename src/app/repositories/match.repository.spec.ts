import { TestBed, inject } from '@angular/core/testing';
import { MatchRepository } from './match.repository';

describe('MatchRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchRepository]
    });
  });

  it('should be created', inject([MatchRepository], (service: MatchRepository) => {
    expect(service).toBeTruthy();
  }));
});
