import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExistingQueryService } from './existing-query.service';
import { QueryRepository } from '../../../repositories/query.repository';
import { VideoRepository } from '../../../repositories/video.repository';
import { SearchSetRepository } from '../../../repositories/search-set.repository';

describe('ExistingQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExistingQueryService,
        QueryRepository,
        VideoRepository,
        SearchSetRepository
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ExistingQueryService], (service: ExistingQueryService) => {
    expect(service).toBeTruthy();
  }));
});
