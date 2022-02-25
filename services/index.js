import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            createdAt
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const res = await request(graphqlAPI, query);
  return res.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_DESC
        last: 3
        ) {
          createdAt
          slug
          title
          featuredImage {
            url
          }
        }
    }
  `;

  const res = await request(graphqlAPI, query);
  return res.posts;
};

export const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($slug: string!, $categories: [string!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        createdAt
        slug
        title
        featuredImage {
          url
        }
      }
    }
  `;

  const res = await request(graphqlAPI, query);
  return res.posts;
};
