import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';
 
export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string };
      parentSection?: { slug: { current: string } };
    }>(request, process.env.SANITY_REVALIDATE_SECRET);
 
    if (!isValidSignature) {
      return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ error: 'no_type' }, { status: 400 });
    }
 
    // Always revalidate the homepage
    revalidatePath('/');
 
    // Revalidate based on document type
    switch (body._type) {
      case 'page':
        if (body.slug?.current) revalidatePath(`/${body.slug.current}`);
        if (body.parentSection?.slug?.current) revalidatePath(`/${body.parentSection.slug.current}`);
        break;
      case 'fund':
        if (body.slug?.current) revalidatePath(`/funding-and-support/${body.slug.current}`);
        revalidatePath('/funding-and-support');
        revalidatePath('/funding-and-support/all-opportunities/funding-calendar');
        break;
      case 'newsArticle':
        if (body.slug?.current) revalidatePath(`/news/${body.slug.current}`);
        revalidatePath('/news-and-blog');
        break;
      case 'globalSettings':
        revalidatePath('/', 'layout');
        break;
    }
 
    revalidateTag(body._type);
 
    return NextResponse.json({ ok: true, revalidated: body._type });
  } catch (err) {
    console.error('Revalidate error', err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
