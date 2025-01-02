import { Project, ProjectCreate, ProjectUpdate } from "../types/Projects";

class ProjectService {
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
  async fetchProjectList(): Promise<Project[]> {
    const response = await fetch(`${this.baseUrl}/projects/`);
    return this.handleRequest(response);
  }

  async fetchProjectDetail(projectId: string): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/projects/${projectId}`);
    return this.handleRequest(response);
  }
  async createProject(project: ProjectCreate): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/projects/`, {
      method: "POST",
      body: JSON.stringify(project),
    });
    return this.handleRequest(response);
  }

  async updateProject(project: ProjectUpdate): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/projects/`, {
      method: "PATCH",
      body: JSON.stringify(project),
    });
    return this.handleRequest(response);
  }

  async deleteProject(projectIds: Array<number>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/projects/bulk_delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectIds),
    });

    await this.handleRequest<void>(response);
  }
}

export default ProjectService;
