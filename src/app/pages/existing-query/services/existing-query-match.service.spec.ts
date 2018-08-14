import { ExistingQueryMatchService } from './existing-query-match.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchRepository } from '../../../repositories/match.repository';
import { QueryRepository } from '../../../repositories/query.repository';
import { IMatchView } from '../../../models/match.model';

describe('ExistingQueryMatchService', () => {
  let sut: ExistingQueryMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExistingQueryMatchService,
        MatchRepository,
        QueryRepository
      ]
    });

    sut = TestBed.get(ExistingQueryMatchService);

    sut.matches = [
      {
        id: 1
      } as IMatchView
    ] as IMatchView[];

  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  describe('getActiveMatch', () => {
    it('should return match based on activeIndex', () => {
      sut.activeIndex = 0;

      expect(sut.getActiveMatch()).toBeTruthy();
    });
  });
});
