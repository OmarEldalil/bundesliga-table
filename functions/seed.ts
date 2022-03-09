import {APIGatewayEvent} from "aws-lambda";
import {APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";
import seed from "../seeds/seed";
import {errorHandlerWrapper} from "../utils/errorHandlerWrapper";

export const seedDb = errorHandlerWrapper(async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  let withData
  try {
    const body = JSON.parse(event.body!)
    withData = body?.withData || false;
  } catch (err) {
    withData = false
  }
  await seed(withData);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'success'
    })
  }
});
