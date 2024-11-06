import * as DynamoDB from "@aws-sdk/client-dynamodb";
import { awsCredentialsProvider } from "@vercel/functions/oidc";

const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const AWS_ROLE_ARN = process.env.AWS_ROLE_ARN!;

export const getDynamoClient = () => {
  const isLocal = process.env.NODE_ENV === "development";
  let dynamoClient: DynamoDB.DynamoDBClient;

  if (!isLocal) {
    dynamoClient = new DynamoDB.DynamoDBClient({
      region: AWS_REGION,
      // Use the Vercel AWS SDK credentials provider
      credentials: awsCredentialsProvider({
        roleArn: AWS_ROLE_ARN,
      }),
    });
  } else {
    dynamoClient = new DynamoDB.DynamoDBClient({
      region: AWS_REGION || "us-east-1",
    });
  }

  return dynamoClient;
};

export const submitBid = () => {
  const client = getDynamoClient();
};
