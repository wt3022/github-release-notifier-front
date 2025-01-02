import React, { useState } from "react";
import { useBulkDeleteProject, useProjectList } from "../../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, TextField } from "@mui/material";
import MaterialIconOutlined from "../../components/MaterialIconOutlined";

function formatDate(date: string) {
  const dateObj = new Date(date);

  // 数秒前なら N 秒前
  const diffTime = new Date().getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds}秒前`;
  }

  // 数分前なら N 分前
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  }

  // 数時間前なら N 時間前
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours < 24) {
    return `${diffHours}時間前`;
  }

  // 1週間以内なら N 日前
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    return `${diffDays}日前`;
  }

  // 1週間以上なら N 週間前
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks}週間前`;
  }

  // 1ヶ月以内なら N ヶ月前
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths}ヶ月前`;
  }

  // 1年以内なら N 年前
  const diffYears = Math.floor(diffMonths / 12);
  if (diffYears < 100) {
    return `${diffYears}年前`;
  }

  return dateObj.toLocaleDateString();
}

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjectList();
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { deleteProjectIDs, setDeleteProjectIDs, deleteError, deleteProject } =
    useBulkDeleteProject();

  const handleDelete = async () => {
    try {
      await deleteProject(deleteProjectIDs);
      setEditMode(false);
      // 画面をリロード
      window.location.reload();
    } catch (err) {
      console.error("削除エラー:", err);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error || deleteError) {
    console.log(error, deleteError);
    return <div>エラー: {error || deleteError}</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <TextField
          label="検索"
          variant="outlined"
          size="small"
          fullWidth
          helperText="Enterで検索"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(searchText);
            }
          }}
        />
        <Button
          variant="contained"
          onClick={() => navigate("/projects/create")}
          className="h-10 w-32 self-start"
          sx={{ padding: "2px 4px", fontWeight: "bold" }}
        >
          新規作成
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">プロジェクト一覧</h2>
        <div className="flex items-center gap-2">
          {editMode && deleteProjectIDs.length > 0 ? (
            <Button variant="contained" onClick={handleDelete}>
              削除
            </Button>
          ) : (
            <></>
          )}
          <Button variant="contained" onClick={() => setEditMode(!editMode)}>
            編集
          </Button>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-gray-200">
        {projects.length === 0 ? (
          <div>プロジェクトが見つかりません</div>
        ) : (
          projects.map((project) => (
            <div
              key={project.ID}
              className="rounded-lg hover:bg-gray-100 flex items-center justify-between"
              onClick={() => {
                if (!editMode) {
                  navigate(`/projects/${project.ID}`);
                } else {
                  setDeleteProjectIDs((prev) =>
                    prev.includes(project.ID)
                      ? prev.filter((p) => p !== project.ID)
                      : [...prev, project.ID],
                  );
                }
              }}
            >
              <div className="flex items-center gap-2">
                {editMode ? (
                  <Checkbox checked={deleteProjectIDs.includes(project.ID)} />
                ) : (
                  <MaterialIconOutlined
                    iconName="note_stack"
                    iconClassName="px-2"
                  />
                )}
                <div className="px-2 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-medium shrink-0">
                    {project.name.charAt(0)}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {project.name}
                  </div>
                </div>
              </div>
              <div>最終更新日: {formatDate(project.UpdatedAt)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
