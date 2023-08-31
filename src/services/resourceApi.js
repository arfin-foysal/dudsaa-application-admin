import { apiSliceAdmin } from "../store/api/apiSliceAdmin";
export const resourceApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "resourceApi",
  tagTypes: ["Resource"],
  endpoints: (builder) => ({
    getNotice: builder.query({
      query: () => ({
        url: `admin/notice-list`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    getDashboard: builder.query({
      query: () => ({
        url: `admin/dashboard`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    getJob: builder.query({
      query: () => ({
        url: `admin/job-list`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    getEvent: builder.query({
      query: () => ({
        url: `admin/event-list`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    getPoll: builder.query({
      query: () => ({
        url: `admin/poll-list`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    noticeSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/notice-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    jobSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/job-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    eventSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/event-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    pollSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/poll-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    pollOptionUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/poll-option-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
   eventPhotoSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/event-photo-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
   donationSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/donation-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
     deletePollOption: builder.mutation({
      query: (id) => ({
        url: `admin/poll-option-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resource"],
     }),
     deleteEventPhotoDelete: builder.mutation({
      query: (id) => ({
        url: `admin/event-photo-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resource"],
     }),
     getEventPhotoList: builder.query({
      query: (id) => ({
        url:  `admin/event-photo-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
     userListAdmin: builder.query({
      query: (id) => ({
        url:  `admin/user-list-admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Resource"],
     }),
     getDonation: builder.query({
      query: () => ({
        url: `admin/donation-list`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
  }),
});

export const { 
  useGetNoticeQuery,
  useNoticeSaveOrUpdateMutation,
  usePollSaveOrUpdateMutation,
  useGetPollQuery,
  usePollOptionUpdateMutation,
  useDeletePollOptionMutation,
  useGetJobQuery,
  useJobSaveOrUpdateMutation,
  useGetEventQuery,
  useEventSaveOrUpdateMutation,
  useEventPhotoSaveOrUpdateMutation,
  useGetEventPhotoListQuery,
  useDeleteEventPhotoDeleteMutation,
  useUserListAdminQuery,
  useGetDashboardQuery,
  useGetDonationQuery,
  useDonationSaveOrUpdateMutation,
  
} =
  resourceApi;
