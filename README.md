# bundesliga-table
aws lambda, rds (amazon Aurora serverless using data api) using serverless framwork

## installation setup
- create aws account  
- create IAM user giving it AdministratorAccess so serverless can manage cloudformation stack on behalf of you
- install serverless cli globally "npm install --global serverless"
- configure serverless credintials using serverless cli sls config credentials --provider aws --key ${access_key} --secret ${secret}
- create RDS aurora instance making sure of checking data api to true
- copy .env.example to be .env and update the values inside it with correct ones from aws console
-  to run it locally, run "npm run start-local"
-  for running unit tests, just run "npm run test"

for more information about setting up credentials of serverless project please read 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

I've created a third endpoint for seeding the database with bundesliga table, you can call that endpoint just one time and then you can call the 2 endpoints we have.

I'm using the serverless Aurora instance so if there's no connections with it, it shutdowns automatically so it's ok just to retry once if you get a message of db is not ready 
