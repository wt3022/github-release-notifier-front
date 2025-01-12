import React, { useEffect } from "react";
import { useProjectCreate } from "../../hooks/useProjects";
import { MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { parseError } from "../../utils/error";
import { FormField } from "../../components/Form";
import { SubmitButton } from "../../components/Button";
import { Location } from "../../types/location";
const ProjectCreate: React.FC<{
  setLocationList: React.Dispatch<React.SetStateAction<Location[]>>;
}> = ({ setLocationList }) => {
  const {
    projectCreateRequest,
    setProjectCreateRequest,
    projectCreateError,
    setProjectCreateError,
    createProject,
  } = useProjectCreate();
  const navigate = useNavigate();

  useEffect(() => {
    setLocationList([
      { name: "ホーム", href: "/" },
      { name: "プロジェクト", href: "/projects" },
      { name: "プロジェクト作成", href: "/projects/create" },
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProjectCreateError(null);

    try {
      await createProject(projectCreateRequest);
      navigate("/projects");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {projectCreateError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-400">
          {parseError(projectCreateError)}
        </div>
      )}
      <h1 className="text-2xl text-gray-800">プロジェクト作成</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="プロジェクト名">
          <TextField
            type="text"
            name="name"
            placeholder="プロジェクト名"
            className="w-96"
            sx={{ padding: "2px 4px" }}
            value={projectCreateRequest.name}
            onChange={(e) =>
              setProjectCreateRequest({
                ...projectCreateRequest,
                name: e.target.value,
              })
            }
            required
          />
        </FormField>
        <FormField label="プロジェクト説明">
          <TextField
            type="text"
            name="description"
            placeholder="プロジェクト説明"
            multiline
            rows={4}
            className="w-96"
            sx={{ padding: "2px 4px" }}
            value={projectCreateRequest.description}
            onChange={(e) =>
              setProjectCreateRequest({
                ...projectCreateRequest,
                description: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="通知方法">
          <Select
            value={projectCreateRequest.notification.type}
            className="w-96"
            onChange={(e) =>
              setProjectCreateRequest({
                ...projectCreateRequest,
                notification: { type: e.target.value as "slack" | "email" },
              })
            }
            required
          >
            <MenuItem value="slack">Slack</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormField>
        <SubmitButton
          variant="contained"
          className="h-10 w-32 self-start"
          sx={{ padding: "2px 4px", fontWeight: "bold" }}
          children="作成"
        />
      </form>
    </div>
  );
};

export default ProjectCreate;
