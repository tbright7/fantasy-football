/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ERROR_MESSAGES } from "../error";
import { cookies } from "next/headers";

// Centralized function for fetching data with retries, timeouts, and custom headers.
export const fetchDataWithRetry = async <T>(
  endpoint: string,
  retries: number = 3,
  delay: number = 1000,
  timeout: number = 5000,
  headers: HeadersInit = {}
): Promise<T> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} to fetch data from ${endpoint}`);

      const response = await fetch(endpoint, {
        signal: controller.signal,
        credentials: "include",
        headers: headers,
      });

      if (!response.ok) {
        console.error(`Failed response: ${response.statusText}`);
        throw new Error(ERROR_MESSAGES.SERVER_ERROR(response.status));
      }

      const data = await response.json();

      clearTimeout(timer);
      return data.data as T;
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.error(ERROR_MESSAGES.TIMEOUT_ERROR);
        throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
      }

      console.error(`Attempt ${i + 1} failed:`, error.message);

      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        clearTimeout(timer);
        throw error;
      }
    }
  }

  throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
};
