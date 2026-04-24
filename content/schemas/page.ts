import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title', type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug', type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'parentSection', type: 'reference', to: [{ type: 'section' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'eyebrow', type: 'localizedString' }),
    defineField({ name: 'intro', type: 'localizedText' }),
    defineField({
      name: 'blocks', title: 'Content blocks', type: 'array',
      of: [
        { type: 'block' },
      ],
    }),
    defineField({
      name: 'seo', type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'image', type: 'image' },
      ],
    }),
    defineField({
      name: 'locale', type: 'string',
      options: { list: [{ title: 'English', value: 'en' }, { title: 'Te reo Māori', value: 'mi' }] },
      initialValue: 'en',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'translationGroup', type: 'string',
      description: 'Shared ID linking en/mi versions of the same page.',
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'slug.current', locale: 'locale' },
    prepare: ({ title, subtitle, locale }) => ({
      title, subtitle: `/${subtitle} — ${locale}`,
    }),
  },
});
