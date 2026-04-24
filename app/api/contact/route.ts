import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const SCHEMA = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  topic: z.enum(['funding', 'media', 'partnership', 'complaint', 'other']),
  artform: z.string().optional(),
  message: z.string().min(20).max(2000),
  reply: z.boolean().optional(),
  honeypot: z.string().max(0),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = SCHEMA.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid', issues: parsed.error.issues }, { status: 400 });
  }

  const { name, email, phone, topic, artform, message, reply } = parsed.data;

  const routing: Record<string, string> = {
    funding: 'funding@creativenz.govt.nz',
    media: 'comms@creativenz.govt.nz',
    partnership: 'partnerships@creativenz.govt.nz',
    complaint: 'complaints@creativenz.govt.nz',
    other: 'info@creativenz.govt.nz',
  };

  try {
    await resend.emails.send({
      from: 'Website contact <noreply@creativenz.govt.nz>',
      to: routing[topic],
      replyTo: email,
      subject: `[${topic.toUpperCase()}] ${name} — website contact form`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone && `Phone: ${phone}`,
        `Topic: ${topic}`,
        artform && `Artform: ${artform}`,
        `Reply requested: ${reply ? 'Yes' : 'No'}`,
        '',
        'Message:',
        message,
      ].filter(Boolean).join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
