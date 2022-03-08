import {queryBuilder} from "../utils/dbClient";
import {TABLES} from "../constants";
import {Match} from "../interfaces/Match";

export const getMatchQuery = ({homeTeamId, awayTeamId}) => {
   return queryBuilder.select('id').from(TABLES.MATCHES).where({
     'home_team_id': homeTeamId,
     'away_team_id': awayTeamId,
   })
}

export const insertMatchQuery = (match: Match) => {
  return queryBuilder.insert(match).into(TABLES.MATCHES)
};
