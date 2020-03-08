export const parseAxiosError = (err) => {
  if (typeof err === 'string') {
    return {
      status: err,
      message: 'Unknown error has occured. Please try again',
      error: err,
    };
  }
  // FE error from parsing response
  if (!err.response) {
    console.error('FRONTEND_ERROR!');
    console.error(err.message);
  }

  return {
    status: err.response.status,
    message: err.response.data.message,
    error: err.response,
  };
};
