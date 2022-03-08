import {updateRankingQuery, getRankingsQuery} from "../ranking.query";

jest.mock('data-api-client')
describe('ranking query', function () {
  it('should updateRankingQuery match snapshot', async () => {
    expect(updateRankingQuery({
      team_id: 1, conceded: 1, played: 2, points: 4, scored: 5
    })).toMatchSnapshot()
  });
  it('should insertMatchQuery match snapshot', async () => {
    expect(getRankingsQuery()).toMatchSnapshot()
  });
});
