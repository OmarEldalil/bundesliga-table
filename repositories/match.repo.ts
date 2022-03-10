import {executeQuery} from "../utils/dbClient";
import {MatchEvent} from "../interfaces/MatchEvent";
import {Match} from "../interfaces/Match";
import {getMatchQuery, insertMatchQuery} from "../queries/match.query";


export const getMatch = async ({homeTeamId, awayTeamId}): Promise<Match[]> => {
  const resp = await executeQuery(getMatchQuery({homeTeamId, awayTeamId}))

  return resp?.records
};

export const insertMatch = async (match: MatchEvent): Promise<void> => {
  const matchObject: Match = {
    home_team_id: match.home.teamId,
    home_team_score: match.home.goalsScored,
    away_team_id: match.away.teamId,
    away_team_score: match.away.goalsScored
  }
  await executeQuery(insertMatchQuery(matchObject))
};
