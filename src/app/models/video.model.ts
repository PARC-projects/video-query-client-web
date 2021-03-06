import { IPagination } from './pagination';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';

export interface IVideoResponse {
  results: Video[];
  pagination: IPagination;
}

export class Video {
  id: number;
  name: string;
  path: string;
  external_source: boolean;
  date_created: string;
  length_in_seconds: string;

  // UI
  is_selected: boolean;

  get is_authenticated(): boolean {
    if (!this.external_source) {
      return true;
    }
    return this.authenticationService.isExternalLoggedIn();
  }

  get full_path(): string {
    if (this.external_source) {
      return `${environment.externalSource.root}${this.path}`;
    }

    return `${environment.fileStoreRoot}${this.path}`;
  }

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  public deserialize(input: Video) {
    this.id = input.id;
    this.name = input.name;
    this.path = input.path;
    this.external_source = input.external_source;
    this.date_created = input.date_created;
    this.length_in_seconds = input.length_in_seconds;

    // UI
    this.is_selected = false;

    return this;
  }
}
