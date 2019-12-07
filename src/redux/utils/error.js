export const parseAxiosError = err => {
  return {
    status: err.response.status,
    message: err.response.data.message,
    error: err.response,
  };
};
