import React, { useEffect, useState } from "react";
import { useProjectDetail } from "../../hooks/useProjects";
import RepositoryList from "../Repositories/RepositoryList";
import DisplayField from "../../components/DisplayField";
import { NavigateButton } from "../../components/Button";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useBulkDeleteRepository } from "../../hooks/useRepositories";
import { Location } from "../../types/location";

const ProjectDetail: React.FC<{
  setLocationList: React.Dispatch<React.SetStateAction<Location[]>>;
}> = ({ setLocationList }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    projectDetail,
    projectDetailLoading,
    projectDetailError,
    setProjectDetailLoading,
    fetchProjectDetail,
  } = useProjectDetail(projectId);
  const [repositoryEditMode, setRepositoryEditMode] = useState(false);
  const [deleteRepositoryIDs, setDeleteRepositoryIDs] = useState<number[]>([]);
  const { bulkDeleteRepository } = useBulkDeleteRepository();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjectDetail(projectId);
      setProjectDetailLoading(false);
      setLocationList([
        { name: "ホーム", href: "/" },
        { name: "プロジェクト", href: "/projects" },
        {
          name: data?.name ?? "",
          href: `/projects/${data?.ID}`,
        },
      ]);
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await bulkDeleteRepository(deleteRepositoryIDs);
      setRepositoryEditMode(false);
      // 画面をリロード
      window.location.reload();
    } catch (err) {
      console.error("削除エラー:", err);
    }
  };

  if (projectDetailLoading) {
    return <div>読み込み中...</div>;
  }

  if (projectDetailError) {
    return <div>エラー: {projectDetailError}</div>;
  }

  if (!projectDetail) {
    return <div>プロジェクトが見つかりません</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4 divide-y divide-gray-200">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <DisplayField label="プロジェクト名" value={projectDetail.name} />
          <NavigateButton
            to={`/projects/update/${projectId}`}
            state={{ project: projectDetail }}
            children="編集"
          />
        </div>
        <DisplayField label="説明" value={projectDetail.description ?? ""} />
        <DisplayField
          label="通知方法"
          value={projectDetail?.notification?.type}
        />
      </div>

      <div className="py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">リポジトリ</div>
          <div className="flex gap-2">
            <Button
              variant="contained"
              onClick={() => setRepositoryEditMode(!repositoryEditMode)}
            >
              {repositoryEditMode ? "キャンセル" : "編集"}
            </Button>
            {repositoryEditMode ? (
              <Button variant="contained" onClick={handleDelete}>
                削除
              </Button>
            ) : (
              <NavigateButton
                to={`/repositories/create`}
                state={{ project: projectDetail }}
                className="w-32"
                children="追加する"
              />
            )}
          </div>
        </div>
        <RepositoryList
          repositories={projectDetail.watch_repositories ?? []}
          editMode={repositoryEditMode}
          deleteRepositoryIDs={deleteRepositoryIDs}
          setDeleteRepositoryIDs={setDeleteRepositoryIDs}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;
