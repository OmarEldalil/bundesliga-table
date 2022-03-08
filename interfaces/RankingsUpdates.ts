export interface RankingsUpdates {
  points: number
  played: number
  scored: number
  conceded: number
}

export interface UpdatedRanking extends RankingsUpdates{
  team_id: number
}
