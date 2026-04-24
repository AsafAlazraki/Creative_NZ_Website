import { defineType, defineField } from 'sanity';

export const section = defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({ name: 'parent', type: 'reference', to: [{ type: 'section' }] }),
    defineField({ name: 'introPage', type: 'reference', to: [{ type: 'page' }] }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({
      name: 'theme', type: 'string',
      options: { list: ['orange', 'lime', 'cyan', 'coral', 'plum', 'navy'] },
    }),
  ],
});
