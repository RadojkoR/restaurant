import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
   reducerPath: "menuItemApi",
   baseQuery: fetchBaseQuery({
    baseUrl: "https://restaurantapi2.azurewebsites.net/api/",
    prepareHeaders:(headers: Headers, api)=> {
        const token = localStorage.getItem("token");
        token && headers.append("authorization", "Bearer "+token);
    }
   }),
   tagTypes: ["MenuItems"],
   endpoints: (builder) =>({
    getMenuItems : builder.query({
        query: () => ({
            url: "menuitem"
        }),
        providesTags: ["MenuItems"]
    }),
    getMenuItemById : builder.query({
        query: (id) => ({
            url: `menuitem/${id}`,
        }),
        providesTags: ["MenuItems"]
    })
   }),
});

export const {useGetMenuItemsQuery, useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;