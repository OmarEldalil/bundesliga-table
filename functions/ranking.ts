import {APIGatewayEvent} from "aws-lambda";
import {getRanking} from "../services/ranking.service";
import {APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";
import {errorHandlerWrapper} from "../utils/errorHandlerWrapper";

export const ranking = errorHandlerWrapper(async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const rankings = await getRanking();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rankings)
  }
});
