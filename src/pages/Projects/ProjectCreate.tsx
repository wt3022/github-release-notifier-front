import React from "react";
import { useProjectCreate } from "../../hooks/useProjects";
import { MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { parseError } from "../../utils/error";
import { FormField } from "../../components/Form";
import { SubmitButton } from "../../components/Button";

const ProjectCreate: React.FC = () => {
  const { project, setProject, createError, setCreateError, createProject } =
    useProjectCreate();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError(null);

    try {
      await createProject(project);
      navigate("/projects");
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
      <h1 className="text-2xl text-gray-800">プロジェクト作成</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="プロジェクト名">
          <TextField
            type="text"
            name="name"
            placeholder="プロジェクト名"
            className="w-96"
            sx={{ padding: "2px 4px" }}
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
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
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
        </FormField>
        <FormField label="通知方法">
          <Select
            value={project.notification.type}
            className="w-96"
            onChange={(e) =>
              setProject({
                ...project,
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
