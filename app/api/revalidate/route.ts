import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import crypto from 'node:crypto';

type Body = {
  _type?: string;
  slug?: { current?: string };
  parentSection?: { slug?: { current?: string } };
};

function verifySignature(rawBody: string, signature: string | null, secret: string | undefined): boolean {
  if (!secret || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  const signature = request.headers.get('sanity-webhook-signature');

  if (!verifySignature(raw, signature, process.env.SANITY_REVALIDATE_SECRET)) {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
  }

  let body: Body;
  try {
    body = JSON.parse(raw) as Body;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const type = body._type;
  if (!type) {
    return NextResponse.json({ error: 'no_type' }, { status: 400 });
  }

  revalidatePath('/');

  const slug = body.slug?.current;
  const parentSlug = body.parentSection?.slug?.current;

  switch (type) {
    case 'page':
      if (slug) revalidatePath(`/${slug}`);
      if (parentSlug) revalidatePath(`/${parentSlug}`);
      break;
    case 'fund':
      if (slug) revalidatePath(`/funding-and-support/${slug}`);
      revalidatePath('/funding-and-support');
      revalidatePath('/funding-and-support/all-opportunities/funding-calendar');
      break;
    case 'newsArticle':
      if (slug) revalidatePath(`/news/${slug}`);
      revalidatePath('/news-and-blog');
      break;
    case 'globalSettings':
      revalidatePath('/', 'layout');
      break;
  }

  revalidateTag(type);

  return NextResponse.json({ ok: true, revalidated: type });
}
