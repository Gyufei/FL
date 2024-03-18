/* eslint-disable no-undef */
"use client";

export async function plainFetcher(
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
) {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data.",
    ) as any;

    const resBody = await res.text();
    error.info = resBody.length > 100 ? "Failed: An error occurred" : resBody;
    error.status = res.status;

    throw error;
  }

  return res;
}

export default async function fetcher(
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
  skipToken?: boolean,
) {
  let newInit = init;
  if (!skipToken) {
    const token = localStorage.get("access_token");
    if (!token) {
      return null;
    }

    newInit = {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: token,
      },
    };
  }

  const res = await fetch(input, newInit);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data.",
    ) as any;

    if (res.status === 401) {
      return null;
    }

    if (res.status === 422) {
      error.info = "params error, sign failed";
    }

    if (!error.info) {
      const resBody = await res.text();
      const errorTip =
        resBody.length > 100 ? "Failed: An error occurred" : resBody;
      error.info = errorTip;
    }

    error.status = res.status;

    throw error;
  }

  const json = await res.json();
  return json?.data || json;
}
