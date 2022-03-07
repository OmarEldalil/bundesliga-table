import dbClient, {queryBuilder} from "../utils/dbClient";
import {TABLES} from "../constants";
import {MatchEvent} from "../services/match.service";

export interface Match {
  home_team_id: number
  home_team_score: number
  away_team_id: number
  away_team_score: number
}

export const getMatch = async ({homeTeamId, awayTeamId}): Promise<Match[]> => {
  const resp = await dbClient.query(queryBuilder.select('id').from(TABLES.MATCHES).where({
    'home_team_id': homeTeamId,
    'away_team_id': awayTeamId,
  }).toString())

  return resp.records
};

export const insertMatch = async (match: MatchEvent): Promise<void> => {
  const matchObject: Match = {
    home_team_id: match.home.teamId,
    home_team_score: match.home.goalsScored,
    away_team_id: match.away.teamId,
    away_team_score: match.away.goalsScored
  }
  await dbClient.query(queryBuilder.insert(matchObject).into(TABLES.MATCHES).toString())
};
