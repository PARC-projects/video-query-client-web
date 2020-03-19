import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Video } from '../models/video.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ISearchSetResponse, ISearchSet } from '../models/search-set.model';
import { AuthenticationService } from '../services/authentication.service';

const API_URL = environment.apiUrl;

export interface ISearchSetRepository {
  getAll(): Observable<ISearchSetResponse>;
}

@Injectable()
export class SearchSetRepository {

  constructor(private http: HttpClient,
    private injector: Injector) { }

  getAll(ordering = 'name', search?: string): Observable<ISearchSetResponse> {
    let url = `${API_URL}/search-sets/?`;

    // TODO: Not sure if this is needed anymore
    // if (perPage) {
    //   url = url + `/?page_size=${perPage}/`;
    //   if (page) {
    //     url = url + `&page=${page}`;
    //     if (search) {
    //       url = url + `&search=${search}`;
    //     }
    //   }
    // } else {
    //   url = url + '-all/';
    // }

    if (search) {
      url += `search=${search}&`;
    }

    if (ordering) {
      url += `ordering=${ordering}&`;
    } else {
      url = url + '-all/';
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

  getVideosInSearchSet(searchSetId: number, ordering = 'date_created'): Observable<Video[]> {
    let url = `${API_URL}/search-sets/${searchSetId}/videos/`;

    // if (searchTerm) {
    //   url = url + `?searchTerm=${searchTerm}`;
    // }

    if (ordering) {
      url = url + `?ordering=${ordering}`;
    }

    return this.http.get(url).pipe(
      map((resp: Video[]) => {
        const videos = [] as Video[];
        resp.forEach(match => {
          videos.push(new Video(this.injector.get(AuthenticationService)).deserialize(match));
        });
        return videos;
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
