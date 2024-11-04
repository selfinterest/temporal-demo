import { NextApiRequest, NextApiResponse } from "next";

import * as DynamoDB from "@aws-sdk/client-dynamodb";
import { awsCredentialsProvider } from "@vercel/functions/oidc";

const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const AWS_ROLE_ARN = process.env.AWS_ROLE_ARN!;

const dynamoClient = new DynamoDB.DynamoDBClient({
  region: AWS_REGION,
  // Use the Vercel AWS SDK credentials provider
  credentials: awsCredentialsProvider({
    roleArn: AWS_ROLE_ARN,
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const gameId = req.query.id;
    if (!gameId || Array.isArray(gameId)) {
      res.status(400).end(`Invalid request`);
    } else {
      const command = new DynamoDB.GetItemCommand({
        TableName: "MoneyGames",
        Key: { id: { S: gameId } },
      });
      const data = await dynamoClient.send(command);
      if (data.Item) {
        return res.status(200).json({ item: data.Item });
      } else {
        return res.status(404);
      }
    }
    // Handle GET request
    //res.status(200).json({ message: "This is a GET request" });
  } else {
    // Handle other methods or throw an error
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
