import { IPagination } from './pagination';
import { Video } from './video.model';
import { ISearchSet } from './search-set.model';
import { IQueryResult } from './query-result.model';

export enum ProcessState {
  Submitted = 1,
  Revised = 2,
  Processing,
  Processed,
  Error,
  ProcessFinalized,
  Finalized
}

/**
 * List contract coming from repository
 */
export class QueryResponse {
  pagination: IPagination;
  results: Query[];
}

/**
 * Contract coming from repository
 */
export class Query {
  id: number;
  name: string;
  reference_time: string;
  max_matches_for_review: number;
  notes: string;
  reference_clip_image: string;
  search_set_to_query: number;
  use_dynamic_target_adjustment: boolean;
  video: number;
  process_state: ProcessState;
  final_report_file: string;
  video_name: string;
  dataset: string;
  clip_duration: number;
}

/**
 * View Model
 * - Existing Query Page
 */
export class QueryView extends Query {
  search_set_to_query_object: ISearchSet;
  video_object: Video;
  query_result: IQueryResult;
}

