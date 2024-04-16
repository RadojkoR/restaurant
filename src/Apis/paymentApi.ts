import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
   reducerPath: "paymentApi",
   baseQuery: fetchBaseQuery({
    baseUrl: "https://restaurantapi2.azurewebsites.net/api/",
    prepareHeaders:(headers: Headers, api)=> {
        const token = localStorage.getItem("token");
        token && headers.append("authorization", "Bearer "+token);
    }
   }),
   
   endpoints: (builder) =>({
        initiatePayment : builder.mutation({
            query: (userId) => ({
                url: "payment",
                method: "POST",
                params: {
                    userId: userId
                }
            }),
        }),
    
   }),
});

export const {useInitiatePaymentMutation } = paymentApi;
export default paymentApi;