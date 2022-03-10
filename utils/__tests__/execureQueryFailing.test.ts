import {executeQuery} from "../dbClient";

jest.mock('data-api-client', () => {
  return jest.fn().mockReturnValue({
    query: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
      setTimeout(resolve, 10000, 'any data')
    }))
  })
})
describe('should test executeQuery to get data if no timeout', function () {
  it('should throw an error if the query timeout', async () => {
    const query = 'some query'
    const func = () => executeQuery(query)
    await expect(func).rejects.toThrowError()
  });
});
