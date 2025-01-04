import React, { useState } from "react";
import { useBulkDeleteProject, useProjectList } from "../../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, TextField } from "@mui/material";
import MaterialIconOutlined from "../../components/MaterialIconOutlined";
import { formatDate } from "../../utils/date";
import { NavigateButton } from "../../components/Button";

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
        <NavigateButton
          to="/projects/create"
          className="h-10 w-32 self-start"
          sx={{ padding: "2px 4px", fontWeight: "bold" }}
          children="新規作成"
        />
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
