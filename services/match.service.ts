import {getMatch, insertMatch} from "../repositories/match.repo";
import {getRanking, updateRankings} from "./ranking.service";
import {MatchEvent} from "../interfaces/MatchEvent";
import {RankingsUpdates, UpdatedRanking} from "../interfaces/RankingsUpdates";
import {ValidationError} from "../errors/ValidationError";

export const addMatch = async (match: MatchEvent): Promise<void> => {
  const matches = await getMatch({
    homeTeamId: match.home.teamId,
    awayTeamId: match.away.teamId,
  })
  if (matches?.length) {
    throw new ValidationError('Match has been played already')
  }
  const updates = getRankingsUpdates(match)
  const teamsRankings = await getRanking({ids: [match.home.teamId, match.away.teamId]})
  if (teamsRankings.length !== 2) {
    throw new ValidationError('Team(s) are not found.')
  }
  const updatedRanks: UpdatedRanking[] = teamsRankings.map(ranking => ({
    team_id: ranking.team_id,
    played: ranking.played + updates[ranking.team_id]?.played,
    scored: ranking.scored + updates[ranking.team_id]?.scored,
    conceded: ranking.conceded + updates[ranking.team_id]?.conceded,
    points: ranking.points + updates[ranking.team_id]?.points,
  }))
  await insertMatch(match);
  await updateRankings(updatedRanks)
}

export const getRankingsUpdates = (match: MatchEvent): { [key: string]: RankingsUpdates } => {
  let updates = {
    [match.home.teamId]: {
      points: 0,
      played: 1,
      scored: match.home.goalsScored,
      conceded: match.away.goalsScored,
    },
    [match.away.teamId]: {
      points: 0,
      played: 1,
      scored: match.away.goalsScored,
      conceded: match.home.goalsScored,
    },
  }
  if (match.home.goalsScored > match.away.goalsScored) {
    updates[match.home.teamId].points = 3
  } else if (match.home.goalsScored < match.away.goalsScored) {
    updates[match.away.teamId].points = 3
  } else {
    updates[match.home.teamId].points = 1
    updates[match.away.teamId].points = 1
  }

  return updates
}
