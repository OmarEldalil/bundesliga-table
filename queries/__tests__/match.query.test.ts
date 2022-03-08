import {getMatchQuery, insertMatchQuery} from "../match.query";

jest.mock('data-api-client')
describe('match query', function () {
  it('should getMatchQuery match snapshot', async () => {
    expect(getMatchQuery({homeTeamId: 1, awayTeamId: 2})).toMatchSnapshot()
  });
  it('should insertMatchQuery match snapshot', async () => {
    expect(insertMatchQuery({
      home_team_score: 1,
      away_team_score: 1,
      home_team_id: 2,
      away_team_id: 1
    })).toMatchSnapshot()
  });
});
