import { TestBed, inject } from '@angular/core/testing';
import { VideoRepository } from './video.repository';


describe('VideoRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoRepository]
    });
  });

  it('should be created', inject([VideoRepository], (service: VideoRepository) => {
    expect(service).toBeTruthy();
  }));
});
