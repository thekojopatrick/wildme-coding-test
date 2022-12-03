import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter,Create a new bucket,
// that refills 5 tokens every 10 seconds and has a maximum size of 10.

const redis = new Redis({
	url: `${process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL}`,
	token: `${process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN}`,
});

const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.tokenBucket(5, "10 s", 10),
});

export default async function middleware(request: NextRequest, event: NextFetchEvent): Promise<Response | undefined> {
	// use a userID, apiKey or ip address for individual limits.
	const ip = request.ip ?? "127.0.0.1";
	const basicAuth = request.headers.get("authorization");

	// Use a constant string to limit all requests with a single ratelimit
	const { success, pending, limit, reset, remaining } = await ratelimit.limit(`mw_${ip}`);
	event.waitUntil(pending);

	// if success validate user else redirect /api/blocked
	const res = success ? NextResponse.next() : NextResponse.redirect(new URL("/api/blocked", request.url));

	// set headers
	res.headers.set("X-RateLimit-Limit", limit.toString());
	res.headers.set("X-RateLimit-Remaining", remaining.toString());
	res.headers.set("X-RateLimit-Reset", reset.toString());

	return res;
}

//Protected /api/ routes
export const config = {
	matcher: "/api/:path*",
};
