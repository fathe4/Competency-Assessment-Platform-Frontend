import { baseApi } from "./baseApi";
// Example types
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({ url: "/posts", method: "GET" }),
      providesTags: ["Post"],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        data: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useAddPostMutation } = postsApi;
