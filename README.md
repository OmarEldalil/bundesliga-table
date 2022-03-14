# bundesliga-table
aws lambda, rds (amazon Aurora serverless using data api) using serverless framwork

## installation setup
### serverless framework
- create aws account  
- create IAM user giving it AdministratorAccess so serverless can manage cloudformation stack on behalf of you
- install serverless cli globally "npm install --global serverless"
- configure serverless credintials using serverless cli sls config credentials --provider aws --key ${access_key} --secret ${secret}
for more information about setting up credentials of serverless project please read 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

### AWS RDS Aurora (MySql)
- open aws dashboard, go to rds service, click on databases on the left nav, click create database
- select (
  - creation method: standard create
  - engine type: Aurora
  - edition: MySql
  - capacity: serverless
  - select mysql 5.7
  - cluster name identifier: bundesligaRankingProd (any name must be unique)
  - username: any
  - password: any
  - capacity: 1 ACU each (any)
  - leave the default vpc, using data api, we can run sql queries even from outside the vpc
  - **data api: TRUE ---> THIS IS VERY IMPORTANT**
  - initial database name: bundesliga  
) 
then click create and wait until its status is available
- make sure it's working by clicking query editor on the left navigation and enter username and password
- copy .env.example to be .env and update the values of DB_SECRET_ARN and DB_RESOURCE_ARN
  DB_RESOURCE_ARN: go to databases, click on your cluster name identifier, click on configurations and copy ARN
  DB_SECRET_ARN: go to secret manager, open the secret name corresponding the cluster name identifier you've entered and copy the secret ARN
-  sls deploy --stage prod
-  to run it locally, run "npm run start-local"
-  for running unit tests, just run "npm run test"


I've created a third endpoint for seeding the database with bundesliga table, you can call that endpoint just one time and then you can call the 2 endpoints we have, its url will be available after you deploy.

I'm using the serverless Aurora instance so if there's no connections with it, it shutdowns automatically so it's ok just to retry once if you get a message of db is not ready 

NOTE: ranking pagination is implemented, you can pass limit and page in the query params

for ERD and architecture diagram check this https://drive.google.com/file/d/1k4d-lww5tM-Ujx0KGbuxMrla7vAe6iF5/view?usp=sharing
