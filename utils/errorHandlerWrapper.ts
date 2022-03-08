export const errorHandlerWrapper = (callback) => async (event) => {
  {
    try {
      return await callback(event)
    } catch (err) {
      console.log(err);
      let message = 'Internal Server Error';
      if (err?.statusCode) {
        message = err.message
      }
      return {
        statusCode: err.statusCode || 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message
        })
      }
    }
  }
}
