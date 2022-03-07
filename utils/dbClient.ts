import * as data from 'data-api-client'
import knex from "knex";

const db = data({
  secretArn: process.env.DB_SECRET_ARN!,
  resourceArn: process.env.DB_RESOURCE_ARN!,
  database: process.env.DB_NAME
})

export const queryBuilder = knex({client: 'mysql'})
export default db
