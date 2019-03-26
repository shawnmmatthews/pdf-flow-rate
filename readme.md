You need to download and install serverless framework globally.
https://serverless.com/

npm install -g serverless

Setup credentials following this video - https://www.youtube.com/watch?v=KngM5bfpttA

You then need to change the custom bucket name to something unique inside of of serveless.yml

Then do "sls deploy" or "serverless deploy" command inside of the root folder.

If operation is successful you can then do the following.

You can use the following curl command to run this operation.

curl -d '{"text" : "<VARIABLE>", "filename": "<FILENAME>"}' https://<URL>.execute-api.us-east-1.amazonaws.com/dev/v1/sender

