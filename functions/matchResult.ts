import {APIGatewayEvent} from "aws-lambda";
import {addMatch} from "../services/match.service";
import {APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";

export const matchResult = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const match = JSON.parse(event.body!)
    await addMatch(match);
  } catch (err) {
    console.log(err);
    throw new Error('Unable to parse body params');
  }
  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'success'
    })
  }
};
