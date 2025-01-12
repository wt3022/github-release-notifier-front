import { Repository, RepositoryCreate } from "../types/Repositories";

class RepositoryService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  private async handleRequest<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `HTTP error! status: ${response.status}`);
    }

    // レスポンスが空の場合は undefined を返す
    const contentLength = response.headers.get("Content-Length");
    if (contentLength === "0" || response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  async createRepository(repository: RepositoryCreate): Promise<Repository> {
    const response = await fetch(`${this.baseUrl}/repositories/`, {
      method: "POST",
      body: JSON.stringify(repository),
    });
    return this.handleRequest(response);
  }

  async deleteRepository(ids: number[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/repositories/bulk_delete`, {
      method: "DELETE",
      body: JSON.stringify(ids),
    });
    return this.handleRequest(response);
  }
}

export default RepositoryService;
