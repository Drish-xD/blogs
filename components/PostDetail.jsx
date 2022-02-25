import React from "react";
import Image from "next/image";
import { CalendarIcon } from "@radix-ui/react-icons";
import moment from "moment";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold my-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="my-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold my-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            loading="lazy"
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-8 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="shadow-lg rounded-t-lg lg:rounded-lg"
          priority
        />
      </div>
      <div className="flex text-center justify-around mb-8 w-full">
        <div className="flex items-center justify-center w-auto mr-8">
          <Image
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
      <div className="px-3">
        <h2 className="text-3xl font-semibold mb-8">{post.title}</h2>
        {post.content.raw.children.map((typeobj, index) => {
          const children = typeobj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );
          return getContentFragment(index, children, typeobj, typeobj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
