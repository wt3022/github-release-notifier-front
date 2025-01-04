import { MenuItem, Select, TextField } from "@mui/material";
import { FormEvent, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useProjectUpdate } from "../../hooks/useProjects";
import { parseError } from "../../utils/error";
import { FormField } from "../../components/Form";
import { SubmitButton } from "../../components/Button";

function ProjectUpdate() {
  const { projectId } = useParams();
  const {
    updateProjectRequest,
    setUpdateProjectRequest,
    updateError,
    updateProject,
  } = useProjectUpdate();
  const { state } = useLocation();

  useEffect(() => {
    const project = state?.project;

    if (projectId) {
      setUpdateProjectRequest({
        ID: project?.ID || Number(projectId),
        name: project?.name || "",
        description: project?.description || "",
        notification: { type: project?.notification.type || "slack" },
      });
    }
  }, [projectId, setUpdateProjectRequest, state?.project]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProject(updateProjectRequest);

    if (updateError) {
      console.error(updateError);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {updateError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-400">
          {parseError(updateError)}
        </div>
      )}
      <h1 className="text-2xl font-bold">プロジェクト更新</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="プロジェクト名">
          <TextField
            value={updateProjectRequest.name}
            onChange={(e) =>
              setUpdateProjectRequest({
                ...updateProjectRequest,
                name: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="プロジェクト説明">
          <TextField
            multiline
            rows={4}
            value={updateProjectRequest.description}
            onChange={(e) =>
              setUpdateProjectRequest({
                ...updateProjectRequest,
                description: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="通知方法">
          <Select
            value={updateProjectRequest.notification.type}
            className="w-32"
            onChange={(e) =>
              setUpdateProjectRequest({
                ...updateProjectRequest,
                notification: { type: e.target.value as "slack" | "email" },
              })
            }
          >
            <MenuItem value="slack">Slack</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormField>
        <SubmitButton
          variant="contained"
          className="h-10 w-32 self-start"
          sx={{ padding: "2px 4px", fontWeight: "bold" }}
          children="更新"
        />
      </form>
    </div>
  );
}

export default ProjectUpdate;
