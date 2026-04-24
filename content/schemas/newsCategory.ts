import { defineType, defineField } from 'sanity';

export const newsCategory = defineType({
  name: 'newsCategory',
  title: 'News category',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name.en' } }),
  ],
});
