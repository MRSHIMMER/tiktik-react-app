import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { Video } from "../types";
import { BASE_URL } from "../utils";
import { shuffle } from "../utils/shuffle";

interface IProps {
  videos: Video[];
}

// 暂时放弃同构渲染
const Home = ({ videos }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Video[]>([]);

  useEffect(() => {}, []);

  // 客户端数据获取
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log("hello");
    const response = await axios.post(`${BASE_URL}/api/post`, {
      fakemore: "fakemore",
      clientVideos: [...data, ...videos],
    });
    setData([...data, ...response.data]);
    setLoading(false);
    console.log(response);
  };

  return (
    <div
      id="scrollableDiv"
      className="videos  flex h-[88vh] flex-1 flex-col gap-10 overflow-auto"
    >
      {/* <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 15}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>It is all, nothing more</h4>}
        scrollableTarget="scrollableDiv"
      >
        {videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))}
      </InfiniteScroll> */}
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={"No videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
