import { useRef, useState, useEffect } from "react";
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

const Home = ({ videos }: IProps) => {
  return (
    <div
      id="scrollableDiv"
      className="videos  flex h-[88vh] flex-1 flex-col gap-10 overflow-auto"
    >
      {videos.length ? (
        shuffle(videos).map((video: Video) => <VideoCard post={video} key={video._id} />)
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
