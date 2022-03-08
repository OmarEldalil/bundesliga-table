import {APIGatewayEvent} from "aws-lambda";
import {getRanking} from "../services/ranking.service";
import {APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";
import {errorHandlerWrapper} from "../utils/errorHandlerWrapper";
import rankingSchema from "../requests/rankingSchema";
import {ValidationError} from "../errors/ValidationError";

export const ranking = errorHandlerWrapper(async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    await rankingSchema.validate(event.queryStringParameters || {})

  } catch (err) {
    throw new ValidationError(err.message)
  }

  // @ts-ignore
  let {limit, page}: { limit: number | undefined, page: number | undefined } = event.queryStringParameters || {}
  limit = isNaN(Number(limit)) ? undefined : Number(limit);
  page = isNaN(Number(page)) ? undefined : Number(page);
  const rankings = await getRanking({limit, page});
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rankings)
  }
});
