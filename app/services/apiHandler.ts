import axios, { AxiosError } from "axios";
import { Config } from "../constants/config";
import { ApiResponseModel } from "../models/apiResponse.model";
import { ApiMethodsEnum, StatusCodeEnum } from "../enums/api.enums";
import { createCustomHeaders, CustomHeaders } from "../utils/headerUtils";

export interface FetchApiConfig {
  url: string;
  data?: unknown;
  params?: Record<string, unknown>;
  method?: ApiMethodsEnum;
  showLoader?: boolean;
  headers?: CustomHeaders;
  responseType?: "arraybuffer";
  /**
   * When true, non-2xx responses that include a JSON body return that body as `T`
   * instead of `null` (axios still rejects on error status). Use when the API
   * returns structured errors (e.g. `{ error, details }`) and the caller
   * distinguishes success vs error by shape.
   */
  returnJsonOnError?: boolean;
}

const fetchApi = async <T>({
  url,
  data = {},
  params = {},
  method = ApiMethodsEnum.post,
  showLoader = false,
  headers = {},
  responseType,
  returnJsonOnError = false,
}: FetchApiConfig): Promise<T | null> => {
  const mergedHeaders = headers;

  const customHeaders: CustomHeaders = createCustomHeaders(mergedHeaders);

  if (data instanceof FormData) {
    delete customHeaders["Content-Type"];
  }

  try {
    if (showLoader) {
      // Keep this placeholder for future loader integration.
      console.debug("Loader start");
    }

    const response = await axios({
      method,
      url: `${Config.apiUrl}${url}`,
      headers: customHeaders,
      withCredentials: false,
      params,
      data,
      ...(responseType && { responseType }),
    });

    return response.data as T;
  } catch (ex: unknown) {
    if (ex instanceof AxiosError) {
      const responseData = ex.response?.data as ApiResponseModel<T> | undefined;
      const statusCode = ex.response?.status;

      if (
        returnJsonOnError &&
        ex.response?.data !== undefined &&
        ex.response.data !== ""
      ) {
        return ex.response.data as T;
      }

      switch (statusCode) {
        case StatusCodeEnum.ClientErrorBadRequest:
          console.error(
            responseData?.lrapierror?.message ?? responseData?.message,
          );
          break;
        case StatusCodeEnum.ClientErrorNotFound:
          console.error(responseData?.lrapierror?.message ?? "Not found");
          break;
        case StatusCodeEnum.ClientErrorUnprocessableEntity:
          for (const error of responseData?.errors ?? []) {
            console.error(error);
          }
          break;
        case StatusCodeEnum.ClientErrorConflict:
          console.error("Please choose the option");
          break;
        case StatusCodeEnum.ClientErrorUnauthorized:
          console.error("Unauthorized request");
          break;
        default:
          console.error("Please contact Customer Support");
          break;
      }

      return null;
    }

    console.error("Sorry, something went wrong");
    return null;
  } finally {
    if (showLoader) {
      // Keep this placeholder for future loader integration.
      console.debug("Loader end");
    }
  }
};

export default fetchApi;
