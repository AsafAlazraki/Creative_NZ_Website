import { defineType, defineField } from 'sanity';

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({ name: 'standfirst', type: 'localizedText' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'person' }] }),
    defineField({ name: 'authorOverride', type: 'string' }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (r) => r.required() }),
    defineField({
      name: 'categories', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'newsCategory' }] }],
    }),
    defineField({
      name: 'artforms', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artform' }] }],
    }),
    defineField({
      name: 'featuredImage', type: 'image',
      fields: [
        { name: 'alt', type: 'localizedString', validation: (r) => r.required() },
        { name: 'caption', type: 'localizedString' },
        { name: 'credit', type: 'string' },
      ],
    }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'pinned', type: 'boolean', initialValue: false }),
  ],
});
