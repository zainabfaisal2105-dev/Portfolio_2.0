import { getUpstashCredentials, getRedisClient, loadGuestbook } from "../../server/storage.js";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const creds = getUpstashCredentials();
  let dbStatus = "not_configured";
  let pingResult: any = null;
  let testError: any = null;

  const redis = getRedisClient();
  if (redis) {
    dbStatus = "credentials_found";
    try {
      const pong = await redis.ping();
      pingResult = pong;
      if (pong === "PONG" || pong) {
        dbStatus = "connected";
      }
    } catch (err: any) {
      dbStatus = "client_ping_failed";
      testError = err?.message || String(err);
    }
  }

  const posts = await loadGuestbook().catch(() => []);

  // Check which env variable names are populated (without revealing secrets)
  const envCheck = {
    hasUPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    hasUPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    hasKV_REST_API_URL: !!process.env.KV_REST_API_URL,
    hasKV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
    hasREDIS_REST_API_URL: !!process.env.REDIS_REST_API_URL,
    hasREDIS_REST_API_TOKEN: !!process.env.REDIS_REST_API_TOKEN,
    hasUPSTASH_REDIS_URL: !!process.env.UPSTASH_REDIS_URL,
    hasUPSTASH_REDIS_TOKEN: !!process.env.UPSTASH_REDIS_TOKEN,
  };

  return res.status(200).json({
    status: "ok",
    databaseStatus: dbStatus,
    envCheck,
    pingResult,
    testError,
    postsCount: posts.length,
    timestamp: new Date().toISOString(),
  });
}
