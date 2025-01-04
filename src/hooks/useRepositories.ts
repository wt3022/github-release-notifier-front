import { useState } from "react";
import RepositoryService from "../services/RepositoryService";
import { RepositoryCreate } from "../types/Repositories";

const repositoryService = new RepositoryService();

const useCreateRepository = () => {
  const [repository, setRepository] = useState<RepositoryCreate>({
    owner: "",
    name: "",
    watch_type: "release",
    project_id: 0,
  });
  const [createError, setCreateError] = useState<string | null>(null);

  const createRepository = async (repository: RepositoryCreate) => {
    try {
      await repositoryService.createRepository(repository);
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

  return {
    repository,
    setRepository,
    createError,
    setCreateError,
    createRepository,
  };
};

export { useCreateRepository };
