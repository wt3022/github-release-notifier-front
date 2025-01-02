interface Notification {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  project: number;
  type: "slack" | "email";
}

interface Project {
  ID: number;
  name: string;
  description: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  notification: Notification;
  watch_repositories: unknown;
}

interface NotificationCreate {
  type: "slack" | "email";
}

interface ProjectCreate {
  name: string;
  description: string;
  notification: NotificationCreate;
}

export type { Project, ProjectCreate };
