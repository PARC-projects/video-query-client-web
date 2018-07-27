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

  getAll(page?: number, search?: string, perPage = 10): Observable<ISearchSetResponse> {
    let url = `${API_URL}/search-sets/?page_size=${perPage}`;
    if (page) {
      url = url + `&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
    }

    return this.http.get(url).pipe(
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

  getVideosInSearchSet(searchSetId: number, searchTerm?: string): Observable<IVideo[]> {
    let url = `${API_URL}/search-sets/${searchSetId}/videos/`;

    if (searchTerm) {
      url = url + `?searchTerm=${searchTerm}`;
    }

    return this.http.get(url).pipe(
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
