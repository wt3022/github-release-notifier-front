import React from "react";
import { useProjectDetail } from "../../hooks/useProjects";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/date";
import { watchTypeJaMap } from "../../types/Projects";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, loading, error } = useProjectDetail(projectId);
  const navigate = useNavigate();

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

      <div className="py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">リポジトリ</div>
          <Button
            className="w-32"
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/repositories/create`, {
                state: {
                  project: project,
                },
              });
            }}
          >
            追加する
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  オーナー
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  リポジトリ名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  監視対象
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最終更新日
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {project.watch_repositories?.map((repository) => (
                <tr key={repository.ID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {repository.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {repository.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {watchTypeJaMap[repository.watch_type]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(repository.last_published_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
