import {executeQuery} from "../utils/dbClient";
import {UpdatedRanking} from "../interfaces/RankingsUpdates";
import {getRankingsQuery, updateRankingQuery} from "../queries/ranking.query";
import {Ranking} from "../interfaces/Ranking";
import {RankingQuery} from "../interfaces/RankingQuery";

export const bulkUpdateRankings = async (updatedRanks: UpdatedRanking[]): Promise<void> => {
  if (updatedRanks.length) {
    await Promise.all(updatedRanks.map(update => executeQuery(updateRankingQuery(update))))
  }
};

export const getRankings = async (params: RankingQuery) => {
  const resp = await executeQuery(getRankingsQuery(params))
  return resp.records as Ranking[]
};
