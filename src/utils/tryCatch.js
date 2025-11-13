export async function tryCatch(callback, ...args) {
  try {
    const data = await callback(...args);
    return data;
  } catch (error) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ??
      (status === 404 ? 'Not Found' : status === 500 ? 'Internal Server Error' : 'Request Failed');

    throw {
      message,
      statusCode: status ?? 500,
      response: error.response,
    };
  }
}