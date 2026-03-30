export enum ApiMethodsEnum {
  get = "get",
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
}

export enum StatusCodeEnum {
  ClientErrorBadRequest = 400,
  ClientErrorUnauthorized = 401,
  ClientErrorNotFound = 404,
  ClientErrorConflict = 409,
  ClientErrorUnprocessableEntity = 422,
}
