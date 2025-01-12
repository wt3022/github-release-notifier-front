import { MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useProjectUpdate } from "../../hooks/useProjects";
import { parseError } from "../../utils/error";
import { FormField } from "../../components/Form";
import { SubmitButton } from "../../components/Button";
import { Location } from "../../types/location";

function ProjectUpdate({
  setLocationList,
}: {
  setLocationList: Dispatch<SetStateAction<Location[]>>;
}) {
  const { projectId } = useParams();
  const {
    projectUpdateRequest,
    setProjectUpdateRequest,
    projectUpdateError,
    updateProject,
    fetchProjectInitialUpdateData,
    setProjectUpdateLoading,
    projectUpdateLoading,
  } = useProjectUpdate();
  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const project = state?.project;
      if (project) {
        setProjectUpdateRequest(project);
      } else if (projectId) {
        fetchProjectInitialUpdateData(Number(projectId));
      }
      setLocationList([
        { name: "ホーム", href: "/" },
        { name: "プロジェクト", href: "/projects" },
        { name: project?.name ?? "", href: `/projects/${projectId}` },
      ]);
      setProjectUpdateLoading(false);
    };

    fetchData();
  }, []);

  if (projectUpdateLoading) {
    return <div>読み込み中...</div>;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProject(projectUpdateRequest);

    if (!projectUpdateError) {
      window.location.href = `/projects/${projectId}`;
    }

    console.error(projectUpdateError);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {projectUpdateError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-400">
          {parseError(projectUpdateError)}
        </div>
      )}
      <h1 className="text-2xl font-bold">プロジェクト更新</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="プロジェクト名">
          <TextField
            value={projectUpdateRequest.name}
            onChange={(e) =>
              setProjectUpdateRequest({
                ...projectUpdateRequest,
                name: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="プロジェクト説明">
          <TextField
            multiline
            rows={4}
            value={projectUpdateRequest.description}
            onChange={(e) =>
              setProjectUpdateRequest({
                ...projectUpdateRequest,
                description: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="通知方法">
          <Select
            value={projectUpdateRequest.notification.type}
            className="w-32"
            onChange={(e) =>
              setProjectUpdateRequest({
                ...projectUpdateRequest,
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
