import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi= createApi({
   reducerPath: "authApi",
   baseQuery: fetchBaseQuery({
    baseUrl: "https://restaurantapi2.azurewebsites.net/api/"
   }),
   
   endpoints: (builder) =>({
    registerUser: builder.mutation({
            query:(userData) => ({
                url: "Auth/register",
                method: "POST",
                header: {
                "Content-type": "application/json",
                },
            body: userData
            }),
        }),
         loginUser: builder.mutation({
            query:(userCredentials) => ({
                url: "Auth/login",
                method: "POST",
                header: {
                "Content-type": "application/json",
                },
            body: userCredentials
            }),
        }),
   }),
});

export const { useRegisterUserMutation, useLoginUserMutation} = authApi;
export default authApi;