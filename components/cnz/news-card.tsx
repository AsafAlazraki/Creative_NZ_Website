import Link from 'next/link';
import { Eyebrow } from './eyebrow';

type Props = {
  slug: string;
  title: string;
  standfirst?: string;
  category?: string;
  publishedAt?: string;
  feature?: boolean;
};

export function NewsCard({ slug, title, standfirst, category, publishedAt, feature }: Props) {
  const year = publishedAt ? new Date(publishedAt).getFullYear() : new Date().getFullYear();
  const href = `/news/${year}/${slug}`;
  return (
    <article className={feature ? 'md:col-span-2' : ''}>
      <Link href={href} className="group block no-underline">
        <div className="aspect-[2/1] rounded-lg bg-paper-alt" />
        <div className="mt-4 flex items-center gap-2 text-xs">
          {category && <Eyebrow>{category}</Eyebrow>}
          {publishedAt && (
            <time dateTime={publishedAt} className="text-muted">
              {new Date(publishedAt).toLocaleDateString('en-NZ', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          )}
        </div>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-tight group-hover:underline">
          {title}
        </h3>
        {standfirst && <p className="mt-2 text-sm text-ink/80">{standfirst}</p>}
      </Link>
    </article>
  );
}
