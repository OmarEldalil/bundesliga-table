import {APIGatewayEvent} from "aws-lambda";
import {getRanking} from "../services/ranking.service";
import {APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";

export const ranking = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const rankings = await getRanking();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rankings)
  }
};
