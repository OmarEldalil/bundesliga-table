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
      // to retry after 2 seconds for 3 times if the instance is down
      for (let i = 0; i < 3; i++) {
        await delay(2000)
        try {
          return await db.query(query)
        } catch (err) {
          console.log(err);
        }
      }
      throw new ServerError('DB is not ready, please try again later.')
    } else if (err?.code === 'BadRequestException' && err?.message?.indexOf("doesn't exist") > -1) {
      throw new ServerError('DB is not seeded, please seed it and try again.')
    }else{
      throw new Error(err.message)
    }
  }
}

const delay = time => new Promise(resolve => setTimeout(resolve, time));
