import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IVideo } from '../models/video.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ISearchSetResponse, ISearchSet } from '../models/search-set.model';

const API_URL = environment.apiUrl;

export interface ISearchSetRepository {
  getAll(): Observable<ISearchSetResponse>;
}

@Injectable()
export class SearchSetRepository {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ISearchSetResponse> {
    return this.http.get(`${API_URL}/search-sets/`).pipe(
      map((resp: ISearchSetResponse) => {
        return resp || {} as ISearchSetResponse;
      }),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<ISearchSet> {
    return this.http.get(`${API_URL}/search-sets/${id}/`).pipe(
      map((resp: ISearchSet) => {
        return resp || {} as ISearchSet;
      }),
      catchError(this.handleError)
    );
  }

  getVideosInSearchSet(searchSetId: number): Observable<IVideo[]> {
    return this.http.get(`${API_URL}/search-sets/${searchSetId}/videos/`).pipe(
      map((resp: IVideo[]) => {
        return resp || [] as IVideo[];
      }),
      catchError(this.handleError)
    );
  }

  add(searchSet: ISearchSet): Observable<ISearchSet> {
    return this.http.post(API_URL + '/search-sets/', searchSet).pipe(
      map((resp: ISearchSet) => {
        return resp || {} as ISearchSet;
      }),
      catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
