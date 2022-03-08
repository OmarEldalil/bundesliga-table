import {APIGatewayEvent} from "aws-lambda";
import {addMatch} from "../services/match.service";
import {APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";
import {errorHandlerWrapper} from "../utils/errorHandlerWrapper";
import {ValidationError} from "../errors/ValidationError";
import matchResultSchema from "../requests/matchResultSchema";

export const matchResult = errorHandlerWrapper(async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  let match
  try {
    match = JSON.parse(event.body!)
    await matchResultSchema.validate(match)
  } catch (err) {
    let message = err.message;
    if (err instanceof SyntaxError) {
      message = 'request body is not a valid json';
    }
    throw new ValidationError(message)
  }
  await addMatch(match);
  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'success'
    })
  }
});
