import {APIGatewayEvent} from "aws-lambda";
import {APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";
import seed from "../seeds/seed";

export const seedDb = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  await seed();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'success'
    })
  }
};
