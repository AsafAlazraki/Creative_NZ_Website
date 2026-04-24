import { defineType, defineField } from 'sanity';

export const artform = defineType({
  name: 'artform',
  title: 'Artform',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name.en' } }),
    defineField({
      name: 'colorToken', type: 'string',
      options: { list: ['orange', 'lime', 'cyan', 'coral', 'plum', 'navy'] },
    }),
    defineField({ name: 'description', type: 'localizedText' }),
  ],
});
