import * as data from 'data-api-client'
import knex, {Knex} from "knex";
import {iDataAPIQueryResult} from "data-api-client";
import QueryBuilder = Knex.QueryBuilder;
import {ServerError} from "../errors/ServerError";
import {GLOBAL_FUNCTION_TIMEOUT} from "../constants";

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
    return await Promise.race([
      db.query(query),
      new Promise((resolve, reject) => setTimeout(reject, GLOBAL_FUNCTION_TIMEOUT, 'timeout'))
    ])
  } catch (err) {
    console.log(err);
    if (err?.code === 'BadRequestException' && err.message === 'BadRequestException: Communications link failure' || err === 'timeout') {
      throw new ServerError('DB is not ready, please try again later.')
    } else if (err?.code === 'BadRequestException' && err?.message?.indexOf("doesn't exist") > -1) {
      throw new ServerError('DB is not seeded, please seed it and try again.')
    } else {
      throw new Error(err.message)
    }
  }
}
