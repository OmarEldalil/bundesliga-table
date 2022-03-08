import * as rankingRepo from "../../repositories/rankings.repo";
import {getRanking, updateRankings} from "../ranking.service";

jest.mock("../../repositories/rankings.repo", () => {
  return {
    getRankings: jest.fn(),
    bulkUpdateRankings: jest.fn(),
  }
})
describe('ranking service', function () {
  beforeEach(() => {
    // @ts-ignore
    rankingRepo.bulkUpdateRankings.mockClear()
  })

  it('should test getRanking', async () => {
    await getRanking()
    expect(rankingRepo.getRankings).toBeCalled()
    await getRanking({limit: 10})
    expect(rankingRepo.getRankings).toBeCalledWith({limit: 10})
    await getRanking({ids: [1, 10]})
    expect(rankingRepo.getRankings).toBeCalledWith({ids: [1, 10]})
  });

  it('should test updateRankings to call bulkUpdateRankings if there are updatedRanks', async () => {
    await updateRankings([
      {
        team_id: 1, conceded: 1, played: 2, points: 4, scored: 5
      }
    ])
    expect(rankingRepo.bulkUpdateRankings).toBeCalled()

  });

  it('should test updateRankings to call bulkUpdateRankings if there are updatedRanks', async () => {
    await updateRankings([])
    expect(rankingRepo.bulkUpdateRankings).not.toBeCalled()
  });
});
