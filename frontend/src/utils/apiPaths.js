export const BASE_URL = "https://job-portal-neon-one.vercel.app/";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/register",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/user/update-profile",
    DELETE_RESUME: "/api/user/delete-resume",
  },

  DASHBOARD: {
    OVERVIEW: "/api/analytics/overview",
  },

  JOBS: {
    GET_ALL_JOBS: "/api/jobs",
    GET_JOB_BY_ID: (id) => `/api/jobs/${id}`,
    POST_JOB: "/api/jobs",
    GET_JOBS_EMPLOYER: "/api/jobs/get-jobs-employer",
    UPDATE_JOB: (id) => `/api/jobs/${id}`,
    TOGGLE_CLOSE: (id) => `/api/jobs/${id}/toggle-close`,
    DELETE_JOB: (id) => `/api/jobs/${id}`,

    SAVE_JOB: (id) => `/api/saved-jobs/${id}`,
    UNSAVE_JOB: (id) => `/api/saved-jobs/${id}`,
    GET_SAVED_JOB: "/api/saved-jobs/my",
  },

  APPLICATIONS: {
    APPLY_TO_JOB: (id) => `/api/applications/${id}`,
    GET_ALL_APPLICATIONS: (id) => `/api/applications/job/${id}`,
    UPDATE_STATUS: (id) => `/api/applications/${id}/status`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};
