import { useState, useRef, ChangeEvent, Children } from "react";
import { Input, InputRef, message, Spin } from "antd";
import { useEntrySearch } from "@/state/entry/hook";
import { TypeEntry } from "@/api/entry";
import Icon from "@/components/icon";
import { useNavigate } from "react-router-dom";
import c from "classnames";
import s from "./index.module.less";

const SearchPage = () => {
  const [val, setVal] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const { onAssociation, assData } = useEntrySearch();
  const navigate = useNavigate();

  // 搜索框变化
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    setShow(false);
    // setShow(!!e.target.value);
    // const value = inputRef.current?.input?.value;
    // onAssociation.mutate({ q: value });
  };

  const handleSearch = () => {
    if (!val) return message.warning("请输入搜索内容");
    onAssociation.mutate({ q: val });
    setShow(true);
  };

  // 处理词条结果
  const onHandleText = (data: TypeEntry[]) => {
    const newData = data.map((e: TypeEntry) => {
      if (e.title.includes(val)) {
        const titleArr = e.title.split(val);
        return {
          ...e,
          title: titleArr.join(`<span style="color: #1677ff;">${val}</span>`),
        };
      } else {
        return e;
      }
    });
    return newData || [];
  };

  // 跳转词条详情页
  const onDetail = (e: TypeEntry) => {
    navigate(`/entryDetail?id=${e.id}`);
  };

  return (
    <div className={c(s.search_page, "px-0 py-170 mobile:px-20 mobile:py-0")}>
      <div className={c(s.search_content, "px-100 py-120 mobile:px-10 mobile:py-120")}>
        <Input.Search
          ref={inputRef}
          className={s["input-wrapper"]}
          placeholder="请输入搜索内容"
          enterButton="搜索"
          prefix={<Icon name="search" fill="#fff" />}
          allowClear
          value={val}
          onChange={onInput}
          onSearch={handleSearch}
        />
        {show && (
          <div className={c(s["association-wrapper"], "fbv fbjc")}>
            {onAssociation.isPending && <Spin size="large" />}
            {!onAssociation.isPending &&
              onHandleText(assData).map((e: TypeEntry) =>
                Children.toArray(
                  <div className={c(s["association-item"])} dangerouslySetInnerHTML={{ __html: e.title }} onClick={() => onDetail(e)}></div>
                )
              )}
            {!assData.length && !onAssociation.isPending && <div className={c(s["association-item"], s["no-data"])}>无搜索结果</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
