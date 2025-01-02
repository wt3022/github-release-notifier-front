import React from "react";
import { useProjectDetail } from "../../hooks/useProjects";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectDetail: React.FC = () => {
  const { project, loading, error } = useProjectDetail();
  const navigate = useNavigate();
  console.log(project);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  if (!project) {
    return <div>プロジェクトが見つかりません</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">プロジェクト名</p>
          <p>{project.name}</p>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/projects/update/${project.ID}`, {
              state: {
                project: project,
              },
            });
          }}
        >
          編集
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">説明</p>
        <p>{project.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">通知方法</p>
        <p>{project?.notification?.type}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
