// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Video } from "../../../types";

import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";
import { shuffle } from "../../../utils/shuffle";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    res.status(200).json(shuffle(data).slice(0, 5));
  } else if (req.method === "POST") {
    const document = req.body;
    if (document.fakemore) {
      const query = allPostsQuery();
      const allPosts = await client.fetch(query);

      const filterPosts: Video[] = [];
      for (let i = 0; i < 5; i++) {
        const filterPost = allPosts.filter(
          (item: Video) =>
            document.clientVideos.every((post: Video) => post._id !== item._id) &&
            filterPosts.every((filterPost) => filterPost._id !== item._id)
        );
        filterPosts.push(filterPost[0]);
      }

      res.status(200).json(filterPosts);
    } else {
      client.create(document).then(() => res.status(201).json("Video Created"));
    }
  }
}
