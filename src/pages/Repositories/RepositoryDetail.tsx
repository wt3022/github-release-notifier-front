import { Dispatch, SetStateAction, useEffect } from "react";
import { Location } from "../../types/location";

const RepositoryDetail = ({
  setLocationList,
}: {
  setLocationList: Dispatch<SetStateAction<Location[]>>;
}) => {
  useEffect(() => {
    setLocationList([
      { name: "ホーム", href: "/" },
      { name: "プロジェクト", href: "/projects" },
      { name: "リポジトリ", href: "/repositories" },
      { name: "リポジトリ詳細", href: `/repositories/` },
    ]);
  }, []);
  return <div>RepositoryDetail</div>;
};

export default RepositoryDetail;
