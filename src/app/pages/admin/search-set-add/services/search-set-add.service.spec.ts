import { TestBed, inject } from '@angular/core/testing';

import { SearchSetAddService } from './search-set-add.service';
import { AlertService } from '../../../../services/alert.service';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideoRepository } from '../../../../repositories/video.repository';

describe('SearchSetAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchSetAddService,
        AlertService,
        SearchSetRepository,
        VideoRepository
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([SearchSetAddService], (service: SearchSetAddService) => {
    expect(service).toBeTruthy();
  }));
});
