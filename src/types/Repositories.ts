/*
{
		"project_id": 1,
		"owner": "encode",
		"name": "django-rest-framework",
		"watch_type": "release"
}
*/

type WatchType = "release" | "tag";
type WatchTypeLabel = "リリース" | "タグ";
type RepositoryCreate = {
  project_id: number;
  owner: string;
  name: string;
  watch_type: WatchType;
};

/*
{
    "ID": 6,
    "owner": "googlemaps",
    "name": "google-maps-services-go",
    "watch_type": "tag",
    "last_notification_date": "2025-01-03T17:38:11.515097+09:00",
    "last_published_at": "2023-12-02T09:49:17+09:00",
    "project_id": 1
    "CreatedAt": "2025-01-03T16:17:42.297727+09:00",
    "UpdatedAt": "2025-01-03T17:38:11.515232+09:00",
},
*/
type Repository = {
  ID: number;
  owner: string;
  name: string;
  watch_type: WatchType;
  last_notification_date: string;
  last_published_at: string;
  project_id: number;
  CreatedAt: string;
  UpdatedAt: string;
};

const watchTypeJaMap: Record<WatchType, WatchTypeLabel> = {
  release: "リリース",
  tag: "タグ",
};

export { watchTypeJaMap };

export type { Repository, RepositoryCreate, WatchType, WatchTypeLabel };
