import { useState } from "react";
import ProjectService from "../services/ProjectService";
import { Project, ProjectCreate, ProjectUpdate } from "../types/Projects";

const projectService = new ProjectService();

// プロジェクト一覧を取得するフック
const useProjectList = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [projectListLoading, setProjectListLoading] = useState<boolean>(false);
  const [projectListError, setProjectListError] = useState<string | null>(null);

  const fetchProjectList = async () => {
    try {
      setProjectListLoading(true);
      const data = await projectService.fetchProjectList();
      setProjectList(data);
    } catch (err) {
      if (err instanceof Error) {
        setProjectListError(err.message);
      } else {
        setProjectListError("An unknown error occurred");
      }
    } finally {
      setProjectListLoading(false);
    }
  };

  return {
    projectList,
    projectListLoading,
    projectListError,
    setProjectListLoading,
    setProjectListError,
    fetchProjectList,
  };
};

// プロジェクト詳細を取得するフック
const useProjectDetail = (id: string | undefined) => {
  const [projectDetail, setProjectDetail] = useState<Project>({
    ID: Number(id),
    name: "",
    description: "",
    notification: {
      type: "slack",
      ID: 0,
      CreatedAt: "",
      UpdatedAt: "",
      project: 0,
    },
    watch_repositories: [],
    CreatedAt: "",
    UpdatedAt: "",
  });
  const [projectDetailLoading, setProjectDetailLoading] =
    useState<boolean>(false);
  const [projectDetailError, setProjectDetailError] = useState<string | null>(
    null,
  );

  const fetchProjectDetail = async (
    id: string | undefined,
  ): Promise<Project> => {
    try {
      setProjectDetailLoading(true);

      const data = await projectService.fetchProjectDetail(
        id ?? String(projectDetail?.ID),
      );
      setProjectDetail(data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setProjectDetailError(err.message);
      } else {
        setProjectDetailError("An unknown error occurred");
      }
    } finally {
      setProjectDetailLoading(false);
    }
    return projectDetail;
  };

  return {
    projectDetail,
    projectDetailLoading,
    setProjectDetailLoading,
    projectDetailError,
    setProjectDetailError,
    fetchProjectDetail,
  };
};

const useProjectCreate = () => {
  const [projectCreateRequest, setProjectCreateRequest] =
    useState<ProjectCreate>({
      name: "",
      description: "",
      notification: {
        type: "slack",
      },
    });
  const [projectCreateError, setProjectCreateError] = useState<string | null>(
    null,
  );

  const createProject = async (project: ProjectCreate) => {
    try {
      await projectService.createProject(project);
      setProjectCreateError(null);
    } catch (err) {
      if (err instanceof Error) {
        setProjectCreateError(err.message);
      } else {
        setProjectCreateError("予期せぬエラーが発生しました");
      }
      throw err;
    }
  };

  return {
    projectCreateRequest,
    setProjectCreateRequest,
    projectCreateError,
    setProjectCreateError,
    createProject,
  };
};

const useProjectUpdate = () => {
  const [projectUpdateRequest, setProjectUpdateRequest] =
    useState<ProjectUpdate>({
      ID: 0,
      name: "",
      description: "",
      notification: {
        type: "slack",
      },
    });

  const [projectUpdateError, setProjectUpdateError] = useState<string | null>(
    null,
  );
  const [projectUpdateLoading, setProjectUpdateLoading] =
    useState<boolean>(false);

  const updateProject = async (project: ProjectUpdate) => {
    try {
      setProjectUpdateLoading(true);
      await projectService.updateProject(project);
    } catch (err) {
      if (err instanceof Error) {
        setProjectUpdateError(err.message);
      } else {
        setProjectUpdateError("予期せぬエラーが発生しました");
      }
    } finally {
      setProjectUpdateLoading(false);
    }
  };

  const fetchProjectInitialUpdateData = async (id: number) => {
    try {
      const data = await projectService.fetchProjectDetail(String(id));
      setProjectUpdateRequest(data);
    } catch (err) {
      console.error("更新エラー:", err);
    }
  };

  return {
    projectUpdateRequest,
    setProjectUpdateRequest,
    projectUpdateError,
    setProjectUpdateError,
    updateProject,
    fetchProjectInitialUpdateData,
    projectUpdateLoading,
    setProjectUpdateLoading,
  };
};

const useBulkDeleteProject = () => {
  const [deleteProjectIDs, setDeleteProjectIDs] = useState<Array<number>>([]);
  const [deleteProjectError, setDeleteProjectError] = useState<string | null>(
    null,
  );

  const deleteProject = async (projectIds: Array<number>): Promise<void> => {
    try {
      await projectService.deleteProject(projectIds);
      setDeleteProjectIDs([]);
    } catch (err) {
      if (err instanceof Error) {
        setDeleteProjectError(err.message);
      } else {
        setDeleteProjectError("予期せぬエラーが発生しました");
      }
    }
  };

  return {
    deleteProjectIDs,
    setDeleteProjectIDs,
    deleteProjectError,
    setDeleteProjectError,
    deleteProject,
  };
};

export {
  useProjectList,
  useProjectDetail,
  useProjectCreate,
  useBulkDeleteProject,
  useProjectUpdate,
};
