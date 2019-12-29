import { IPagination } from './pagination';

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
}
