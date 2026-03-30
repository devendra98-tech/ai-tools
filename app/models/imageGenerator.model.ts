export interface ImageGeneratorRequestModel {
  prompt: string;
}

export interface ImageGeneratorResponseModel {
  imageBase64: string;
  mimeType: string;
}

export interface ImageGeneratorErrorModel {
  error: string;
  details?: string;
  /** Seconds until retry is reasonable (from API when rate-limited). */
  retryAfterSeconds?: number;
}
