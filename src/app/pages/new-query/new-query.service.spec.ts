import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewQueryService, IQueryForm } from './new-query.service';
import { QueryRepository } from '../../repositories/query.repository';
import { SearchSetRepository } from '../../repositories/search-set.repository';
import { environment } from '../../../environments/environment';
import { IVideo } from '../../models/video.model';

describe('NewQueryService', () => {
  let sut: NewQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NewQueryService,
        SearchSetRepository,
        QueryRepository
      ]
    });
    sut = TestBed.get(NewQueryService);

    sut.form = {
      name: '',
      reference_time: '00:00:00',
      reference_time_seconds: 0,
      reference_time_hours: 0,
      reference_time_minutes: 0,
      max_matches_for_review: 10,
      use_dynamic_target_adjustment: false,
      current_video_length: 1000000,
      video: 1
    } as IQueryForm;

    sut.videos = [
      {
        id: 1,
        path: 'help.mp4'
      } as IVideo
    ] as IVideo[];

    environment.fileStoreRoot = 'assets/videos/';
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  describe('getVideoPathBasedOnId', () => {
    it('should return assets/videos/help.mp4 when form.video = 1', () => {
      expect(sut.getVideoPathBasedOnId()).toEqual('assets/videos/help.mp4');
    });

    it('should return an empty string when form.video is not found', () => {
      sut.form.video = 10;
      expect(sut.getVideoPathBasedOnId()).toEqual('');
    });
  });

  describe('getCurrentReferenceTimeInSeconds', () => {
    it('should return 3600 when reference_time_hours = 1', () => {
      sut.form.reference_time_hours = 1;

      expect(sut.getCurrentReferenceTimeInSeconds()).toEqual(3600);
    });

    it('should return 300 when reference_time_minutes = 5', () => {
      sut.form.reference_time_minutes = 5;

      expect(sut.getCurrentReferenceTimeInSeconds()).toEqual(300);
    });

    it('should return 15 when reference_time_seconds = 15', () => {
      sut.form.reference_time_seconds = 15;

      expect(sut.getCurrentReferenceTimeInSeconds()).toEqual(15);
    });

    it('should return 0 if total time is greater then current_video_length', () => {
      sut.form.reference_time_seconds = sut.form.current_video_length + 1;

      expect(sut.getCurrentReferenceTimeInSeconds()).toEqual(0);
    });
  });

  describe('getFormattedReferenceTime', () => {
    it('should return 01:00:00 when reference_time_hours = 1', () => {
      sut.form.reference_time_hours = 1;

      expect(sut.getFormattedReferenceTime()).toEqual('01:00:00');
    });

    it('should return 00:05:00 when reference_time_minutes = 5', () => {
      sut.form.reference_time_minutes = 5;

      expect(sut.getFormattedReferenceTime()).toEqual('00:05:00');
    });

    it('should return 00:00:15 when reference_time_seconds = 15', () => {
      sut.form.reference_time_seconds = 15;

      expect(sut.getFormattedReferenceTime()).toEqual('00:00:15');
    });
  });
});
