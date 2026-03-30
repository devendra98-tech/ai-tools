import { ApiMethodsEnum } from "../enums/api.enums";
import {
  ImageGeneratorErrorModel,
  ImageGeneratorRequestModel,
  ImageGeneratorResponseModel,
} from "../models/imageGenerator.model";
import fetchApi from "./apiHandler";

export default class ImageGeneratorService {
  static async generateImage(
    prompt: string,
  ): Promise<ImageGeneratorResponseModel | ImageGeneratorErrorModel> {
    const payload: ImageGeneratorRequestModel = { prompt };

    const data = await fetchApi<
      ImageGeneratorResponseModel | ImageGeneratorErrorModel
    >({
      url: "/api/generate-image",
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
      (data as ImageGeneratorErrorModel).error
    ) {
      const err = data as ImageGeneratorErrorModel;
      return {
        error: err.error,
        details: err.details,
        ...(typeof err.retryAfterSeconds === "number"
          ? { retryAfterSeconds: err.retryAfterSeconds }
          : {}),
      };
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "imageBase64" in data &&
      typeof (data as ImageGeneratorResponseModel).imageBase64 === "string" &&
      "mimeType" in data &&
      typeof (data as ImageGeneratorResponseModel).mimeType === "string"
    ) {
      return data as ImageGeneratorResponseModel;
    }

    return { error: "Unexpected response from server." };
  }
}
