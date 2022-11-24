import type { NextPage } from "next";
import axios from "axios";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { Video } from "../types";
import { shuffle } from "../utils/shuffle";

import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="videos flex h-full flex-col gap-10">
      {videos.length ? (
        shuffle(videos)
          .slice(0, 5)
          .map((video: Video) => <VideoCard post={video} key={video._id} />)
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
