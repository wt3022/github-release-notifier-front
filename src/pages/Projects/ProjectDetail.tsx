import React from "react";
import { useProjectDetail } from "../../hooks/useProjects";

const ProjectDetail: React.FC = () => {
  const { project, loading, error } = useProjectDetail();

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
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectDetail;
