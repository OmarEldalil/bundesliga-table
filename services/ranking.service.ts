import dbClient, {queryBuilder} from "../utils/dbClient";
import {TABLES} from "../constants";

export interface Ranking {
  "id": string,
  "team_id": number,
  "team_name": string,
  "played": number,
  "points": number,
  "scored": number,
  "conceded": number,
  "goals_diff": number
}

export const getRanking = async ({ids, limit = 20}: { ids?: number[], limit?: number } = {}): Promise<Ranking[]> => {
  // using raw query here because of a bug getting the difference between the 2 columns
  const query = queryBuilder
    .raw(`
        SELECT *, scored - conceded AS goals_diff
        FROM ${TABLES.RANKINGS}
                 INNER JOIN ${TABLES.TEAMS} ON ${TABLES.TEAMS}.id = ${TABLES.RANKINGS}.team_id
            ${ids?.length ? `WHERE team_id IN (${ids.join(', ')})` : ''}
        ORDER BY points DESC, goals_diff DESC
            LIMIT ${limit}
    `)

  const resp = await dbClient.query(
    query.toString()
  )
  return resp.records as Ranking[]
};

export interface UpdatedRanking {
  team_id: number
  played: number
  scored: number
  conceded: number
  points: number
}

export const updateRankings = async (updatedRanks: UpdatedRanking[]): Promise<void> => {
  if (updatedRanks.length) {
    await Promise.all(updatedRanks.map(update =>
      dbClient.query(
        queryBuilder(TABLES.RANKINGS).where('team_id', update.team_id).update(update).toString()
      )))
  }
};
