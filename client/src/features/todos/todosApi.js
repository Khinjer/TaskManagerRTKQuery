import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4400/' }),
  tagTypes: ['TODOS'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: ['TODOS'],
    }),
    getTodoById: builder.query({
      query: (id) => `/todos/${id}`,
      providesTags: ['TODOS'],
    }),
    addTodo: builder.mutation({
      query: ({ title, description }) => ({
        method: 'POST',
        body: { title, description },
        url: '/todos',
      }),
      invalidatesTags: ['TODOS'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/todos/${id}`,
      }),
      invalidatesTags: ['TODOS'],
    }),
    editTodo: builder.mutation({
      query: ({ id, title, description }) => ({
        method: 'PUT',
        url: `/todos/${id}`,
        body: { title, description },
      }),
      invalidatesTags: ['TODOS'],
    }),
    editTodoStatus: builder.mutation({
      query: ({ id, status }) => ({
        method: 'PATCH',
        url: `/todos/${id}`,
        body: { status },
      }),
      invalidatesTags: ['TODOS'],
    }),
  }),
});

export const {
  useGetTodoByIdQuery,
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useEditTodoStatusMutation,
} = todosApi;
