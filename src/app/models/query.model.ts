import { IPagination } from './pagination';
import { IVideo } from './video.model';
import { ISearchSet } from './search-set.model';
import { IQueryResult } from './query-result.model';

export enum ProcessState {
  Submitted = 1,
  Revised = 2,
  Processing,
  Processed
}

/**
 * List contract coming from repository
 */
export interface IQueryResponse {
  pagination: IPagination;
  results: IQuery[];
}

/**
 * Contract coming from repository
 */
export interface IQuery {
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
}

/**
 * View Model
 * - Existing Query Page
 */
export interface IQueryView extends IQuery {
  search_set_to_query_object: ISearchSet;
  video_object: IVideo;
  query_result: IQueryResult;
}

