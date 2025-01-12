interface Notification {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  project: number;
  type: "slack" | "email";
}

type WatchType = "release" | "tag";
type WatchTypeLabel = "リリース" | "タグ";

/* 
{
	"ID": 8,
	"CreatedAt": "2025-01-03T16:18:15.208894+09:00",
	"UpdatedAt": "2025-01-03T16:18:15.208894+09:00",
	"owner": "encode",
	"name": "django-rest-framework",
	"watch_type": "release",
	"last_notification_date": "2025-01-03T07:18:15Z",
	"last_published_at": "2024-12-28T19:24:43+09:00",
	"project_id": 1
}
*/
interface Repository {
  ID: number;
  owner: string;
  name: string;
  watch_type: WatchType;
  last_notification_date: string;
  last_published_at: string;
  project_id: number;
  CreatedAt: string;
  UpdatedAt: string;
}

interface Project {
  ID: number;
  name: string;
  description: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  notification: Notification;
  watch_repositories: Repository[] | null;
}

interface NotificationCreate {
  type: "slack" | "email";
}

interface ProjectCreate {
  name: string;
  description: string;
  notification: NotificationCreate;
}

interface NotificationUpdate {
  type: "slack" | "email";
}

interface ProjectUpdate {
  ID: number;
  name: string;
  description: string | null;
  notification: NotificationUpdate;
}

export const watchTypeJaMap: Record<WatchType, WatchTypeLabel> = {
  release: "リリース",
  tag: "タグ",
} as const;

export type {
  Project,
  ProjectCreate,
  ProjectUpdate,
  WatchType,
  WatchTypeLabel,
};
