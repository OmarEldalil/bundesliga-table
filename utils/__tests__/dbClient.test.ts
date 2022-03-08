import {executeQuery} from "../dbClient";
import * as data from 'data-api-client'

jest.mock('data-api-client', () => {
  return jest.fn().mockReturnValue({
    query: jest.fn()
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

});
