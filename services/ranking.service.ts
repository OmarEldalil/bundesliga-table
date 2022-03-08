import {UpdatedRanking} from "../interfaces/RankingsUpdates";
import {bulkUpdateRankings, getRankings} from "../repositories/rankings.repo";
import {Ranking} from "../interfaces/Ranking";
import {RankingQuery} from "../interfaces/RankingQuery";

export const getRanking = async (params: RankingQuery = {limit: 20}): Promise<Ranking[]> => {
  return await getRankings(params)
};

export const updateRankings = async (updatedRanks: UpdatedRanking[]): Promise<void> => {
  if (updatedRanks.length) {
    await bulkUpdateRankings(updatedRanks)
  }
};
