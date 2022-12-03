import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
	res.status(429).json({ message: "The request has been rate limited." });
	return res.end();
}
