import {errorHandlerWrapper} from "../errorHandlerWrapper";

describe('errorHandlerWrapper test', function () {
  it('should return the output of the actual function normally when there\'s no error', async () => {
    const returnedValue = {hello: 'world'}
    const lambda = errorHandlerWrapper(jest.fn().mockReturnValueOnce(returnedValue))
    expect(await lambda({any: 'any'})).toMatchObject(returnedValue)
  });

  it('should throw 500 error if there\'s no statusCode', async () => {
    const error = {message: 'some error'}
    const lambda = errorHandlerWrapper(jest.fn().mockRejectedValueOnce(error))
    expect(await lambda({any: 'any'})).toMatchObject({
      statusCode: 500,
    })
  });

  it('should throw correct error code if exists with its message', async () => {
    const error = {message: 'some validation error', statusCode: 400}
    const lambda = errorHandlerWrapper(jest.fn().mockRejectedValueOnce(error))
    expect(await lambda({any: 'any'})).toMatchObject({
      body: JSON.stringify({
        message: error.message
      }),
      statusCode: 400,
    })
  });
});
