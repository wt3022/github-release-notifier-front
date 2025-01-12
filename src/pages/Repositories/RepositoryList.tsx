import { Checkbox } from "@mui/material";
import { Repository, watchTypeJaMap } from "../../types/Repositories";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

function RepositoryList({
  repositories,
  editMode,
  deleteRepositoryIDs,
  setDeleteRepositoryIDs,
}: {
  repositories: Repository[];
  editMode: boolean;
  deleteRepositoryIDs: number[];
  setDeleteRepositoryIDs: Dispatch<SetStateAction<number[]>>;
}) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {editMode && (
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                選択
              </th>
            )}
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
          {repositories?.map((repository) => (
            <tr
              key={repository.ID}
              onClick={() => {
                if (!editMode) {
                  navigate(`/repositories/${repository.ID}`);
                } else {
                  setDeleteRepositoryIDs((prev) =>
                    prev.includes(repository.ID)
                      ? prev.filter((p) => p !== repository.ID)
                      : [...prev, repository.ID],
                  );
                }
              }}
            >
              {editMode && (
                <td className="px-6 whitespace-nowrap text-sm text-gray-500">
                  <Checkbox
                    checked={deleteRepositoryIDs.includes(repository.ID)}
                  />
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {repository.owner}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {repository.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {watchTypeJaMap[repository.watch_type]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row gap-2">
                <div className="text-xs">
                  {dayjs(repository.last_published_at).format("YYYY/MM/DD")}
                </div>
                <div className="text-xs">
                  {formatDate(repository.last_published_at)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RepositoryList;
