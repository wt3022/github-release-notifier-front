import { useLocation } from "react-router-dom";
import { parseError } from "../../utils/error";
import { MenuItem, Select, TextField } from "@mui/material";
import { useCreateRepository } from "../../hooks/useRepositories";
import { FormEvent, useEffect } from "react";
import { WatchType } from "../../types/Repositories";
import { FormField } from "../../components/Form";
import { SubmitButton } from "../../components/Button";

function RepositoryCreate() {
  const { project } = useLocation().state;
  const {
    repository,
    setRepository,
    createError,
    setCreateError,
    createRepository,
  } = useCreateRepository();

  useEffect(() => {
    setRepository({
      ...repository,
      project_id: project.ID,
    });
  }, [project, repository, setRepository]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError(null);

    try {
      await createRepository(repository);
      window.location.href = `/projects/${project.ID}`;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {createError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-400">
          {parseError(createError)}
        </div>
      )}
      <h1 className="text-2xl text-gray-800">リポジトリ作成</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="リポジトリオーナー">
          <TextField
            type="text"
            name="owner"
            placeholder="リポジトリオーナー"
            className="w-96"
            sx={{ padding: "2px 4px" }}
            value={repository.owner}
            onChange={(e) =>
              setRepository({ ...repository, owner: e.target.value })
            }
            required
          />
        </FormField>
        <FormField label="リポジトリ名">
          <TextField
            type="text"
            name="name"
            placeholder="リポジトリ名"
            className="w-96"
            sx={{ padding: "2px 4px" }}
            value={repository.name}
            onChange={(e) =>
              setRepository({ ...repository, name: e.target.value })
            }
            required
          />
        </FormField>
        <FormField label="リポジトリタイプ">
          <Select
            value={repository.watch_type}
            className="w-32"
            onChange={(e) =>
              setRepository({
                ...repository,
                watch_type: e.target.value as WatchType,
              })
            }
            required
          >
            <MenuItem value="release">Release</MenuItem>
            <MenuItem value="tag">Tag</MenuItem>
          </Select>
        </FormField>
        <SubmitButton
          className="h-10 w-32 self-start"
          sx={{ padding: "2px 4px", fontWeight: "bold" }}
          children="作成"
        />
      </form>
    </div>
  );
}

export default RepositoryCreate;
