import { IPagination } from './pagination';

export interface IMatches extends IPagination {
  results: IMatch[];
}

export interface IMatch extends IPagination {
  id: number;
  score: number;
  query_result_id: number;
  reference_video_id: number;
  reference_time: number;
  match_video_path: string;
  is_match: boolean;
  user_match?: boolean;
  query_id: number;
  match_video_time_span: number;
}

export interface IMatchView extends IMatch {
  is_active: boolean;
  x: number;
  y: number;
}
