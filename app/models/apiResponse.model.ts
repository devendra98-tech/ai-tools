export interface ApiResponseModel<T> {
  message?: string;
  errors?: string[];
  data?: T;
  lrapierror?: {
    message?: string;
  };
}
