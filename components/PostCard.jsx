import React from "react";
import moment from "moment";
import Link from "next/link";
import Img from "next/image";
import { CalendarIcon } from "@radix-ui/react-icons";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-8 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <Img
          src={post.featuredImage.url}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="shadow-lg rounded-t-lg lg:rounded-lg"
          priority
        />
      </div>
      <h3 className="transition duration-200 text-center mb-8 cursor-pointer text-3xl font-semibold hover:text-purple-400">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h3>
      <div className="flex text-center justify-center flex-col md:flex-row mb-8 w-full">
        <div className="flex items-center justify-center w-auto mb-3 md:mb-0 md:mr-8">
          <Img
            src={post.author.photo.url}
            alt={post.author.name}
            width="30"
            height="30"
            objectFit="cover"
            loading="lazy"
            className="shadow-lg rounded-full"
          />
          <p className="align-middle inline ml-2 text-lg text-gray-700">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700 inline-flex items-center justify-center">
          <CalendarIcon className="w-7 h-7 mr-2 text-purple-500" />
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`} passHref>
          <span className="cursor-pointer transition duration-300 transform hover:-translate-y-1 hover:translate-x-1 inline-block bg-purple-400 text-lg font-medium rounded-full text-white px-8 py-1">
            Read More
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
