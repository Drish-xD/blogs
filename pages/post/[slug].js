import Head from "next/head";
import React from "react";
import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidgets,
  Author,
  Comments,
  CommentsForm,
} from "../../components";

const PostDetails = ({ post }) => {
  console.log(post);
  return (
    <div className="container mx-auto mb-8 px-10`">
      <Head>
        <title>Blog CMS System</title>
        <meta name="description" content="Blog CMS System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <PostDetail />
          <Author />
          <CommentsForm />
          <Comments />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidgets categories="" slug="" />
            <Categories />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}