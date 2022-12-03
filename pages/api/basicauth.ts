import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader("WWW-authenticate", 'Basic realm="Secure Area"');
	res.statusCode = 401;

	const basicAuth = res.status(200);

	console.log("Hello:", res.status(200).status);

	basicAuth ? res.status(201).json({ hello: "world" }) : res.status(401).end(`Auth Required.`);
}
