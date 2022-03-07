import {getMatch, insertMatch} from "../repositories/match.repo";
import {getRanking, UpdatedRanking, updateRankings} from "./ranking.service";

export interface MatchEvent {
  home: { teamId: number, goalsScored: number },
  away: { teamId: number, goalsScored: number },
}

export const addMatch = async (match: MatchEvent): Promise<void> => {
  const matches = await getMatch({
    homeTeamId: match.home.teamId,
    awayTeamId: match.away.teamId,
  })
  if (matches.length) {
    throw new Error('Match has been played already')
  }
  await insertMatch(match);
  const updates = getRankingsUpdate(match)
  const teamsRankings = await getRanking({ids: [match.home.teamId, match.away.teamId]})
  const updatedRanks: UpdatedRanking[] = teamsRankings.map(ranking => ({
    team_id: ranking.team_id as number,
    played: ranking.played + 1 as number,
    scored: ranking.scored + updates[ranking.team_id].scored as number,
    conceded: ranking.conceded + updates[ranking.team_id].conceded as number,
    points: ranking.points + updates[ranking.team_id].points as number,
  }))
  await updateRankings(updatedRanks)
}

const getRankingsUpdate = (match: MatchEvent) => {
  let updates = {
    [match.home.teamId]: {
      points: 0,
      scored: match.home.goalsScored,
      conceded: match.away.goalsScored,
    },
    [match.away.teamId]: {
      points: 0,
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
