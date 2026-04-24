import { defineType, defineField } from 'sanity';

export const applicantType = defineType({
  name: 'applicantType',
  title: 'Applicant type',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name.en' } }),
    defineField({ name: 'description', type: 'localizedText' }),
    defineField({
      name: 'tier', type: 'string',
      options: { list: ['earlyCareer', 'artist', 'organisation'] },
    }),
  ],
});
