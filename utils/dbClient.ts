import * as data from 'data-api-client'
import knex, {Knex} from "knex";
import {iDataAPIQueryResult} from "data-api-client";
import QueryBuilder = Knex.QueryBuilder;
import {ServerError} from "../errors/ServerError";

const db = data({
  secretArn: process.env.DB_SECRET_ARN!,
  resourceArn: process.env.DB_RESOURCE_ARN!,
  database: process.env.DB_NAME
})

export const queryBuilder = knex({client: 'mysql'})

export const executeQuery = async (query: QueryBuilder | string): Promise<iDataAPIQueryResult | any> => {
  if (typeof query !== 'string') {
    query = query.toString()
  }
  try {
    return await db.query(query)
  } catch (err) {
    if (err?.code === 'BadRequestException' && err.message === 'BadRequestException: Communications link failure') {
      throw new ServerError('DB is not ready, please try again later.')
    } else if (err?.code === 'BadRequestException' && err?.message?.indexOf("doesn't exist") > -1) {
      throw new ServerError('DB is not seeded, please seed it and try again.')
    }else{
      throw new Error(err.message)
    }
  }
}
