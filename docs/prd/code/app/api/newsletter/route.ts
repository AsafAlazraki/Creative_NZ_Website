import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
 
const SCHEMA = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional(),
  interests: z.array(z.string()).optional(),
  consent: z.literal(true),
  honeypot: z.string().max(0), // spam honeypot
});
 
// Rate limiter — simple in-memory. For prod, use Upstash Redis or similar.
const attempts = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || record.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (record.count >= 5) return false;
  record.count++;
  return true;
}
 
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }
 
  const body = await request.json().catch(() => null);
  const parsed = SCHEMA.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
 
  const { email, name, interests } = parsed.data;
 
  // Mailchimp Members API
  const listId = process.env.MAILCHIMP_LIST_ID!; // '817361bc26'
  const apiKey = process.env.MAILCHIMP_API_KEY!;
  const dc = apiKey.split('-')[1]; // e.g. 'us21'
 
  const subscriberHash = await hashEmail(email.toLowerCase());
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;
 
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: 'pending', // double opt-in
      merge_fields: name ? { FNAME: name } : {},
      interests: interests ? Object.fromEntries(interests.map((i) => [i, true])) : {},
    }),
  });
 
  if (!res.ok) {
    console.error('Mailchimp error', await res.text());
    return NextResponse.json({ error: 'provider_error' }, { status: 502 });
  }
 
  // Don't reveal whether email was new or existing (enumeration avoidance)
  return NextResponse.json({ ok: true });
}
 
async function hashEmail(email: string): Promise<string> {
  const buf = await crypto.subtle.digest('MD5', new TextEncoder().encode(email));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
