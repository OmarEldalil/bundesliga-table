import {executeQuery} from "../dbClient";
import * as data from 'data-api-client'

jest.mock('data-api-client', () => {
  return jest.fn().mockReturnValue({
    query: jest.fn().mockReturnValue(new Promise((resolve, reject) => {
      setTimeout(resolve, 100, 'any data')
    }))
  })
})
describe('dbClient', function () {
  it('should test executeQuery to stringify the query and run it', async () => {
    const query = {toString: jest.fn()}
    // @ts-ignore
    await executeQuery(query)
    expect(query.toString).toBeCalled()
    // @ts-ignore
    expect(data().query).toBeCalled()
  });
  it('should test executeQuery to run the query', async () => {
    const query = 'some query'
    await executeQuery(query)
    // @ts-ignore
    expect(data().query).toBeCalled()
  });
  it('should test executeQuery to get data if no timeout', async () => {
    const query = 'some query'
    const res = await executeQuery(query)
    // @ts-ignore
    expect(data().query).toBeCalled()
    expect(res).toBe('any data')
  });
});
