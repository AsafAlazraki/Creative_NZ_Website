import { defineType, defineField } from 'sanity';
 
export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'iwiAffiliation', type: 'string' }),
    defineField({ name: 'role', type: 'localizedString' }),
    defineField({
      name: 'team', type: 'string',
      options: {
        list: ['Council', 'Executive', 'Arts development', 'Māori arts',
               'Pacific arts', 'Communications', 'Operations'],
      },
    }),
    defineField({
      name: 'photo', type: 'image',
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'email', type: 'email' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({
      name: 'visibility', type: 'string',
      options: { list: ['public', 'internal'] },
      initialValue: 'public',
    }),
  ],
});
