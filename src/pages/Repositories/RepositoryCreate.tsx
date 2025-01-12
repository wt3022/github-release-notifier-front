import { useLocation } from "react-router-dom";
import { parseError } from "../../utils/error";
import { MenuItem, Select, TextField } from "@mui/material";
import { useCreateRepository } from "../../hooks/useRepositories";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { WatchType } from "../../types/Repositories";
import { FormField } from "../../components/Form";
import { SubmitButton } from "../../components/Button";
import { Location } from "../../types/location";

function RepositoryCreate({
  setLocationList,
}: {
  setLocationList: Dispatch<SetStateAction<Location[]>>;
}) {
  const { project } = useLocation().state;
  const {
    repositoryCreateRequest,
    setRepositoryCreateRequest,
    repositoryCreateError,
    setRepositoryCreateError,
    createRepository,
  } = useCreateRepository();

  useEffect(() => {
    setLocationList([
      { name: "ホーム", href: "/" },
      { name: "プロジェクト", href: "/projects" },
      { name: project.name, href: `/projects/${project.ID}` },
      { name: "リポジトリ作成", href: "/repositories/create" },
    ]);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRepositoryCreateError(null);

    try {
      await createRepository(repositoryCreateRequest);
      window.location.href = `/projects/${project.ID}`;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {repositoryCreateError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-400">
          {parseError(repositoryCreateError)}
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
            value={repositoryCreateRequest.owner}
            onChange={(e) =>
              setRepositoryCreateRequest({
                ...repositoryCreateRequest,
                owner: e.target.value,
              })
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
            value={repositoryCreateRequest.name}
            onChange={(e) =>
              setRepositoryCreateRequest({
                ...repositoryCreateRequest,
                name: e.target.value,
              })
            }
            required
          />
        </FormField>
        <FormField label="リポジトリタイプ">
          <Select
            value={repositoryCreateRequest.watch_type}
            className="w-32"
            onChange={(e) =>
              setRepositoryCreateRequest({
                ...repositoryCreateRequest,
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
