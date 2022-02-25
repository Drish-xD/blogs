import React from "react";

const PostDetail = ({ post }) => {
  console.log(post);
  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">{post.title}</h2>
      {post.content.raw.children.map((para, index) => (
        <p key={index} className="font-normal text-base my-4">
          {para.children[0].text}
        </p>
      ))}
    </div>
  );
};

export default PostDetail;
