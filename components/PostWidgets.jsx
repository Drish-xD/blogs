import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidgets = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res));
    }
  }, [categories, slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-8 mb-8 mx-2 lg:mx-0">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {!slug ? "Recent Posts" : "Related Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            width="50"
            height="40"
            objectFit="cover"
            loading="lazy"
            className="rounded-md"
          />
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidgets;
