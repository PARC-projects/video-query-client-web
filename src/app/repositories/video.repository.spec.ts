import { TestBed, inject } from '@angular/core/testing';
import { VideoRepository } from './video.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VideoRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoRepository],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([VideoRepository], (service: VideoRepository) => {
    expect(service).toBeTruthy();
  }));
});
