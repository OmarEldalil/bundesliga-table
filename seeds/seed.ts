import {executeQuery, queryBuilder} from '../utils/dbClient'
import {TABLES} from "../constants";
import {Knex} from "knex";
import CreateTableBuilder = Knex.CreateTableBuilder;
import * as initialTeams from "./teams.json"
import * as initialRankings from "./rankings.json"

const createTeamsTableQuery = queryBuilder.schema.createTableIfNotExists(TABLES.TEAMS, function (table: CreateTableBuilder) {
  table.increments().primary();
  table.string('name');
}).toString()

const createRankingsTableQuery = queryBuilder.schema.createTableIfNotExists(TABLES.RANKINGS, function (table: CreateTableBuilder) {
  table.increments();
  table.integer('team_id').unsigned()
  table.integer('played').defaultTo(0);
  table.integer('points').defaultTo(0);
  table.integer('scored').defaultTo(0);
  table.integer('conceded').defaultTo(0);
}).toString()

const createMatchesTableQuery = queryBuilder.schema.createTableIfNotExists(TABLES.MATCHES, function (table: CreateTableBuilder) {
  table.increments();
  table.integer('home_team_id').notNullable();
  table.integer('home_team_score').notNullable();
  table.integer('away_team_id').notNullable();
  table.integer('away_team_score').notNullable();
}).toString()

const createTeamIdForeignConstrain = queryBuilder.schema.alterTable(TABLES.RANKINGS, function (table) {
  table.foreign('team_id').references(`${TABLES.TEAMS}.id`);
}).toString()

async function seed(withData = false) {
  try {
    await executeQuery(createTeamsTableQuery)
    await executeQuery(createRankingsTableQuery)
    try {
      await executeQuery(createTeamIdForeignConstrain)
    } catch (err) {
      console.warn(err);
    }
    await executeQuery(createMatchesTableQuery)
    if (withData) {
      await executeQuery(queryBuilder.insert(initialTeams).into(TABLES.TEAMS).toString())
      await executeQuery(queryBuilder.insert(initialRankings).into(TABLES.RANKINGS).toString())
    }
  } catch (err) {
    console.log(err);
  }
  console.log('seeded successfully');
}

export default seed
