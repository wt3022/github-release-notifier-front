import { useState, useEffect } from "react";
import ProjectService from "../services/ProjectService";
import { Project, ProjectCreate, ProjectUpdate } from "../types/Projects";

const projectService = new ProjectService();

// プロジェクト一覧を取得するフック
const useProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.fetchProjectList();
        setProjects(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// プロジェクト詳細を取得するフック
const useProjectDetail = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        const data = await projectService.fetchProjectDetail(id);
        setProject(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  return { project, loading, error };
};

const useProjectCreate = () => {
  const [project, setProject] = useState<ProjectCreate>({
    name: "",
    description: "",
    notification: {
      type: "slack",
    },
  });
  const [createError, setCreateError] = useState<string | null>(null);

  const createProject = async (project: ProjectCreate) => {
    try {
      await projectService.createProject(project);
      setCreateError(null);
    } catch (err) {
      if (err instanceof Error) {
        setCreateError(err.message);
      } else {
        setCreateError("予期せぬエラーが発生しました");
      }
      throw err;
    }
  };

  return { project, setProject, createError, setCreateError, createProject };
};

const useProjectUpdate = () => {
  const [updateProjectRequest, setUpdateProjectRequest] =
    useState<ProjectUpdate>({
      ID: 0,
      name: "",
      description: "",
      notification: {
        type: "slack",
      },
    });

  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateProject = async (project: ProjectUpdate) => {
    try {
      await projectService.updateProject(project);
    } catch (err) {
      if (err instanceof Error) {
        setUpdateError(err.message);
      } else {
        setUpdateError("予期せぬエラーが発生しました");
      }
    }
  };

  return {
    updateProjectRequest,
    setUpdateProjectRequest,
    updateError,
    updateProject,
  };
};

const useBulkDeleteProject = () => {
  const [deleteProjectIDs, setDeleteProjectIDs] = useState<Array<number>>([]);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteProject = async (projectIds: Array<number>): Promise<void> => {
    try {
      await projectService.deleteProject(projectIds);
      setDeleteProjectIDs([]);
    } catch (err) {
      if (err instanceof Error) {
        setDeleteError(err.message);
      } else {
        setDeleteError("予期せぬエラーが発生しました");
      }
    }
  };

  return { deleteProjectIDs, setDeleteProjectIDs, deleteError, deleteProject };
};

export {
  useProjectList,
  useProjectDetail,
  useProjectCreate,
  useBulkDeleteProject,
  useProjectUpdate,
};
