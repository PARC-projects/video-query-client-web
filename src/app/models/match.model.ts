import { IPagination } from './pagination';
import { AuthenticationService } from '../services/authentication.service';

export interface IMatches extends IPagination {
  results: Match[];
}

export class Match {
  id: number;
  score: number;
  query_result_id: number;
  reference_video_id: number;
  reference_time: number;
  match_video_path: string;
  is_match: boolean;
  user_match?: boolean;
  query_id: number;
  match_video_time_span: string;
  reference_video_external_source: boolean;
  reference_start_time: string;
  match_video_name: string;
  reference_end_time: string;

  // View
  is_loading: boolean;
  is_hovered: boolean;

  get isAuthenticated(): boolean {
    if (!this.reference_video_external_source) {
      return true;
    }
    return this.authenticationService.isExternalLoggedIn();
  }

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  public deserialize(input: Match) {
    this.id = input.id;
    this.score = input.score;
    this.query_result_id = input.query_result_id;
    this.reference_video_id = input.reference_video_id;
    this.reference_time = input.reference_time;
    this.match_video_path = input.match_video_path;
    this.is_match = input.is_match;
    this.user_match = input.user_match;
    this.query_id = input.query_id;
    this.match_video_time_span = input.match_video_time_span;
    this.reference_start_time = input.reference_start_time;
    this.match_video_name = input.match_video_name;
    this.reference_video_external_source = input.reference_video_external_source;
    this.reference_end_time = input.reference_end_time;

    return this;
  }
}
