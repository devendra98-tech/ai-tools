export interface CustomHeaders {
  Authorization?: string;
  "Content-Type"?: string;
  [key: string]: string | undefined;
}

export const createCustomHeaders = (headers: CustomHeaders = {}) => {
  return {
    "Content-Type": "application/json",
    ...headers,
  };
};
