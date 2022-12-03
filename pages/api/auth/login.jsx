import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import getIp from "lib/get-ip";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a new ratelimiter,Create a new bucket,
// that refills 5 tokens every 10 seconds and has a maximum size of 5
const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.tokenBucket(5, "60 s", 5),
});

export default async function handler(req, res) {
	// Use a constant string to limit all requests with a single ratelimit
	// Or use a userID, apiKey or ip address for individual limits.
	const identifier = getIp(req);
	const result = await ratelimit.limit(identifier);
	res.setHeader("X-RateLimit-Limit", result.limit);
	res.setHeader("X-RateLimit-Remaining", result.remaining);
	res.setHeader("X-RateLimit-Rest", result.reset);

	if (!result.success) {
		res.status(429).json({ message: "The request has been rate limited.", rateLimitState: result });
		return res.end();
	}
	res.status(200).json({ name: "Kojo Patrick", rateLimiter: { ipAddress: identifier, ...result } });
}
