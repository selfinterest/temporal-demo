import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Handle POST request
    const data = req.body;
    res.status(200).json({ message: "Data received", data });
  } else if (req.method === "GET") {
    // Handle GET request
    res.status(200).json({ message: "This is a GET request" });
  } else {
    // Handle other methods or throw an error
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
