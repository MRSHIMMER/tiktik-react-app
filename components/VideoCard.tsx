import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const verticalStyle = "text-3xl text-white";
  const horizontalStyle = "text-3xl text-black";

  const getButtonStyle = (ref: React.RefObject<HTMLVideoElement>): string => {
    return ref.current!.videoHeight / ref.current!.videoWidth > 1.5
      ? verticalStyle
      : horizontalStyle;
  };

  const onVideoPress = () => {
    if (playing) {
      //videoRed有可能为Null
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col  border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex cursor-pointer gap-3 rounded p-2 font-semibold ">
          <div className="h-10 w-10 md:h-16 md:w-16">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className=" rounded-full"
                  src={post.postedBy?.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="md:text-md flex items-center gap-2 font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-md text-blue-400" />
                </p>
                <p className="hidden text-xs font-medium capitalize text-gray-500 md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href="/">
              <p className="mt-2 font-normal ">{post.caption}</p>
            </Link>
          </div>
        </div>
      </div>
      {/* 视频中的图标要使用绝对定位，父元素这里需要使用相对定位，否则绝对定位的上下文将是窗口 */}
      <div className=" flex gap-4 lg:ml-20">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className="h-[382px] w-[214px] cursor-pointer rounded-xl bg-gray-100 md:h-[514px] md:w-[288px] lg:h-[600px] lg:w-[336px]"
            ></video>
          </Link>
          {/* 使用绝对定位将图标移动到视频上层 */}
          {isHover && (
            <div>
              <div className="absolute left-4 bottom-6 cursor-pointer">
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className={getButtonStyle(videoRef)} />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className={getButtonStyle(videoRef)} />
                  </button>
                )}
              </div>
              <div className="absolute right-4 bottom-6 cursor-pointer">
                {isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiOutlineVolumeOff className={getButtonStyle(videoRef)} />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiOutlineVolumeUp className={getButtonStyle(videoRef)} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
