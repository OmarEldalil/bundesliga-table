import * as matchService from "../match.service";
import * as rankingService from "../ranking.service";
import * as matchRepo from "../../repositories/match.repo";
import {getRankingsUpdates} from "../match.service";

jest.mock("../../repositories/match.repo", () => {
  return {
    getMatch: jest.fn(),
    insertMatch: jest.fn()
  }
})
jest.mock("../ranking.service", () => {
  return {
    getRanking: jest.fn(),
    updateRankings: jest.fn(),
  }
})
jest.mock('data-api-client')

const matchEvent = {
  "home": {
    "teamId": 18,
    "goalsScored": 1
  },
  "away": {
    "teamId": 2,
    "goalsScored": 2
  }
}
const drawMatchEvent = {
  "home": {
    "teamId": 4,
    "goalsScored": 1
  },
  "away": {
    "teamId": 2,
    "goalsScored": 1
  }
}
describe('match service', function () {
  describe('addMatch', function () {
    it('should throw an error if the match is already played', async () => {
      // @ts-ignore
      matchRepo.getMatch.mockReturnValueOnce([{id: 5}])
      await expect(matchService.addMatch(matchEvent)).rejects.toThrowError()
    });

    it('should throw an error if rankings length is not equal to 2', async () => {
      // @ts-ignore
      rankingService.getRanking.mockReturnValueOnce([{teamId: 2}])
      await expect(matchService.addMatch(matchEvent)).rejects.toThrowError()
    });

    it('should insert the match and update the rankings', async () => {
      // @ts-ignore
      matchRepo.getMatch.mockReturnValueOnce([])
      // @ts-ignore
      rankingService.getRanking.mockReturnValueOnce([
        {
          team_id: 2,
          played: 2,
          scored: 4,
          conceded: 7,
          points: 6
        }, {
          team_id: 1,
          played: 2,
          scored: 4,
          conceded: 6,
          points: 1
        },
      ])
      await matchService.addMatch(matchEvent);
      expect(matchRepo.insertMatch).toBeCalled()
      expect(rankingService.updateRankings).toBeCalled()
    });

  });
  describe('getRankingsUpdates', function () {
    it('should calculate the incremental updates in ranking for both teams', async () => {
      expect(getRankingsUpdates(matchEvent)).toMatchSnapshot()
      expect(getRankingsUpdates(drawMatchEvent)).toMatchSnapshot()
    });
  });
});
