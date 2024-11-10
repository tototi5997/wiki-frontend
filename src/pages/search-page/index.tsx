import c from "classnames";
import s from "./index.module.less";
import { Input } from "antd";

const SearchPage = () => {
  return (
    <div className={c(s.search_page)}>
      <div className={c(s.search_content)}>
        <Input.Search placeholder="请输入搜索内容" />
      </div>
    </div>
  );
};

export default SearchPage;
