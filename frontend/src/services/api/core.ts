class APICore {
  #baseUrl = process.env.APP_API_URL || "http://localhost:9091";

  async get<TRes>(url: string, headers: Record<string, string> = {}) {
    return this.#request<unknown, TRes>(url, "GET", null, new Headers(headers));
  }

  async delete<TRes>(url: string, headers: Record<string, string> = {}) {
    return this.#request<unknown, TRes>(url, "DELETE", null, new Headers(headers));
  }

  async post<TBody, TRes>(
    url: string,
    body: TBody,
    headers: Record<string, string> = {}
  ) {
    return this.#request<TBody, TRes>(url, "POST", body, new Headers(headers));
  }

  async put<TBody, TRes>(
    url: string,
    body: TBody,
    headers: Record<string, string> = {}
  ) {
    return this.#request<TBody, TRes>(url, "PUT", body, new Headers(headers));
  }

  async patch<TBody, TRes>(
    url: string,
    body: TBody,
    headers: Record<string, string> = {}
  ) {
    return this.#request<TBody, TRes>(url, "PATCH", body, new Headers(headers));
  }

  async #request<TBody, TRes>(
    url: string,
    method: Request["method"],
    body: TBody,
    headers: Headers
  ) {
    const requestOptions: {
      method: Request["method"];
      headers: Headers;
      body?: string;
    } = {
      method,
      headers: new Headers({
        "Content-Type": "application/json",
        ...headers,
      }),
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(this.#urlHandler(url), requestOptions);

    if (!response.ok) {
      throw this.#errorHandler(response);
    }

    return this.#parseResponse<TRes>(response);
  }

  #urlHandler(url: string) {
    if (url.startsWith("http")) {
      return url;
    } else if (url.startsWith("/")) {
      return `${this.#baseUrl}${url}`;
    }

    if (url.startsWith("ws")) {
      throw new Error("Websockets is not implemented here");
    }

    return `${this.#baseUrl}/${url}`;
  }

  async #parseResponse<T>(response: Response): Promise<T> {
    const contentTypeHeader = response.headers.get("content-type");

    switch (true) {
      case contentTypeHeader?.includes("application/json"):
        return response.json() as T;
      case contentTypeHeader?.includes("text/plain"):
        return response.text() as T;
      default:
        return response as T;
    }
  }

  #errorHandler(response: Response) {
    console.error(response);
    return new Error(response.statusText);
  }
}

const api = new APICore();

export { api };
