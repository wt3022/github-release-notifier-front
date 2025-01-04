import React from "react";
import { useProjectDetail } from "../../hooks/useProjects";
import RepositoryList from "../Repositories/RepositoryList";
import DisplayField from "../../components/DisplayField";
import { NavigateButton } from "../../components/Button";
import { useParams } from "react-router-dom";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, loading, error } = useProjectDetail(projectId);

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
    <div className="p-4 flex flex-col gap-4 divide-y divide-gray-200">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <DisplayField label="プロジェクト名" value={project.name} />
          <NavigateButton
            to={`/projects/update/${project.ID}`}
            children="編集"
          />
        </div>
        <DisplayField label="説明" value={project.description ?? ""} />
        <DisplayField label="通知方法" value={project?.notification?.type} />
      </div>

      <div className="py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">リポジトリ</div>
          <NavigateButton
            to={`/repositories/create`}
            state={{ project: project }}
            className="w-32"
            children="追加する"
          />
        </div>
        <RepositoryList repositories={project.watch_repositories ?? []} />
      </div>
    </div>
  );
};

export default ProjectDetail;
