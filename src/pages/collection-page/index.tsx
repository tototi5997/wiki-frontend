import { Image, Timeline } from "antd";
import { useAllCollectios } from "@/state/collection/hook";
import { Children } from "react";
import { serverPrefix } from "@/hooks/useServerImg";
import dayjs from "dayjs";
import s from "./index.module.less";
import c from "classnames";

const CollectionPage = () => {
  const { data } = useAllCollectios({ page: 1, pageSize: 100 });

  const { collections } = data ?? {};

  const renderCollections = () => {
    return collections?.map((collection) => {
      return {
        children: (
          <div className="fbv gap-10">
            <div>{dayjs(collection?.create_at).format("YYYY-MM-DD HH:mm")}</div>
            <div>{collection?.title}</div>
            <div>{collection?.description}</div>
            {collection.images?.length && collection.images.map((image) => Children.toArray(<Image src={serverPrefix + image} />))}
          </div>
        ),
      };
    });
  };
  return (
    <div className={c(s.collection_page, "px-170 pt-50 mobile:px-20 mobile:pt-10 h-full")}>
      <div className={c(s.content)}>
        <Timeline items={renderCollections()} />
      </div>
    </div>
  );
};

export default CollectionPage;
