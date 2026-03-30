import { ApiMethodsEnum } from "../enums/api.enums";
import {
  CodeReviewErrorModel,
  CodeReviewRequestModel,
  CodeReviewResponseModel,
} from "../models/codeReview.model";
import fetchApi from "./apiHandler";

export default class CodeReviewService {
  static async codeReview(
    code: string,
    language: string,
  ): Promise<CodeReviewResponseModel | CodeReviewErrorModel> {
    const payload: CodeReviewRequestModel = { code, language };

    const data = await fetchApi<CodeReviewResponseModel | CodeReviewErrorModel>({
      url: "/api/review",
      method: ApiMethodsEnum.post,
      data: payload,
      returnJsonOnError: true,
    });

    if (data === null) {
      return { error: "Network error — could not reach the server." };
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      (data as CodeReviewErrorModel).error
    ) {
      const err = data as CodeReviewErrorModel;
      return {
        error: err.error,
        details: err.details,
      };
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "review" in data &&
      typeof (data as CodeReviewResponseModel).review === "string"
    ) {
      return data as CodeReviewResponseModel;
    }

    return { error: "Unexpected response from server." };
  }
}
