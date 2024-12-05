export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Failed to fetch data. Please check your network connection.",
    SERVER_ERROR: (status: number) => `Server returned status code ${status}.`,
    TIMEOUT_ERROR: "Request timed out. Please try again later.",
    MISSING_PARAMETERS: "Required parameters are missing from the request.",
    AUTH_ERROR: "Authentication failed. Please log in again.",
  };