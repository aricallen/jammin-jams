export const parseAxiosError = (err) => {
  if (typeof err === 'string') {
    return {
      status: err,
      message: 'Unknown error has occured. Please try again',
      error: err,
    };
  }
  return {
    status: err.response.status,
    message: err.response.data.message,
    error: err.response,
  };
};
