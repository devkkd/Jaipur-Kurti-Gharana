/**
 * Simple in-memory rate limiter for API routes
 * Limits requests per IP per time window
 */

const rateLimitMap = new Map();

export function rateLimit({ limit = 20, windowMs = 60 * 1000 } = {}) {
  return function check(ip) {
    const now = Date.now();
    const key = ip;

    if (!rateLimitMap.has(key)) {
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }

    const entry = rateLimitMap.get(key);

    if (now > entry.resetAt) {
      // Window expired, reset
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }

    if (entry.count >= limit) {
      return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
    }

    entry.count++;
    return { allowed: true };
  };
}

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 5 * 60 * 1000);

export function getIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}
