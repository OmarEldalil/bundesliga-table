import {queryBuilder} from "../utils/dbClient";
import {TABLES} from "../constants";
import {UpdatedRanking} from "../interfaces/RankingsUpdates";
import {RankingQuery} from "../interfaces/RankingQuery";

export const updateRankingQuery = (update: UpdatedRanking) => {
  return queryBuilder(TABLES.RANKINGS).where('team_id', update.team_id).update(update)
}
export const getRankingsQuery = ({ids, limit, page}: RankingQuery = {}) => {
  // using raw query here because of a bug getting the difference between the 2 columns
  return queryBuilder
    .raw(`
        SELECT *, scored - conceded AS goals_diff
        FROM ${TABLES.RANKINGS}
                 INNER JOIN ${TABLES.TEAMS} ON ${TABLES.TEAMS}.id = ${TABLES.RANKINGS}.team_id
            ${ids?.length ? `WHERE team_id IN (${ids.join(', ')})` : ''}
        ORDER BY points DESC, goals_diff DESC
            LIMIT ${limit || 20} OFFSET ${(limit! * (page!-1)) || 0}
    `).toString()
};
