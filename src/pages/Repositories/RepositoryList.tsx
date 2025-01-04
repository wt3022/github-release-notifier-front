import { Repository, watchTypeJaMap } from "../../types/Repositories";
import { formatDate } from "../../utils/date";

function RepositoryList({ repositories }: { repositories: Repository[] }) {
  return (
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
          {repositories?.map((repository) => (
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
  );
}

export default RepositoryList;
