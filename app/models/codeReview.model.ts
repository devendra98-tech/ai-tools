export interface CodeReviewRequestModel {
  code: string;
  language: string;
}

export interface CodeReviewResponseModel {
  review: string;
}

/** Non-2xx or network failure from the review API */
export interface CodeReviewErrorModel {
  error: string;
  details?: string;
}
