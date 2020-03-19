import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IVideoResponse, Video } from '../models/video.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class VideoRepository {
  constructor(private http: HttpClient) { }

  getAll(page?: number, search?: string, perPage = 10, ordering = 'name'): Observable<IVideoResponse> {
    let url = `${API_URL}/videos/?page_size=${perPage}`;
    if (page) {
      url = url + `&page=${page}`;
    }

    if (search) {
      url = url + `&search=${search}`;
    }

    if (ordering) {
      url = url + `&ordering=${ordering}`;
    }

    return this.http.get(url).pipe(
      map((resp: IVideoResponse) => {
        return resp || {} as IVideoResponse;
      }),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Video> {
    return this.http.get(`${API_URL}/videos/${id}/`).pipe(
      map((resp: Video) => {
        return resp || {} as Video;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('VideoRepository::handleError', error);
    return throwError(error);
  }
}
