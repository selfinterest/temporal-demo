import { getDynamoClient } from "@/services/dynamo";
import * as DynamoDB from "@aws-sdk/client-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dynamoClient = getDynamoClient();
    const gameId = req.body.gameId;
    const now = Date.now();

    if (!gameId || Array.isArray(gameId)) {
      res.status(400).end(`Invalid request`);
    } else {
      const command = new DynamoDB.GetItemCommand({
        TableName: "MoneyGames",
        Key: { id: { S: gameId } },
      });
      const data = await dynamoClient.send(command);
      if (data.Item) {
        // validate game is not expired
        const expiration = Number(data.Item.expiration.N);
        if (expiration < now) {
          return res.status(400).json({
            ok: false,
            message: "Game expired",
          });
        }
        /*return res.status(200).json({
          ok: true,
          id: data.Item.id.S,
          expiration: data.Item.expiration.N,
        });*/
      } else {
        return res.status(404).json({ ok: false, message: "Game not found" });
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