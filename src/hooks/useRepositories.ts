import { useState } from "react";
import RepositoryService from "../services/RepositoryService";
import { RepositoryCreate } from "../types/Repositories";

const repositoryService = new RepositoryService();

const useCreateRepository = () => {
  const [repositoryCreateRequest, setRepositoryCreateRequest] =
    useState<RepositoryCreate>({
      owner: "",
      name: "",
      watch_type: "release",
      project_id: 0,
    });
  const [repositoryCreateError, setRepositoryCreateError] = useState<
    string | null
  >(null);

  const createRepository = async (repository: RepositoryCreate) => {
    try {
      await repositoryService.createRepository(repository);
      setRepositoryCreateError(null);
    } catch (err) {
      if (err instanceof Error) {
        setRepositoryCreateError(err.message);
      } else {
        setRepositoryCreateError("予期せぬエラーが発生しました");
      }
      throw err;
    }
  };

  return {
    repositoryCreateRequest,
    setRepositoryCreateRequest,
    repositoryCreateError,
    setRepositoryCreateError,
    createRepository,
  };
};

const useBulkDeleteRepository = () => {
  const bulkDeleteRepository = async (ids: number[]) => {
    await repositoryService.deleteRepository(ids);
  };
  return { bulkDeleteRepository };
};

export { useCreateRepository, useBulkDeleteRepository };
