import { defineType, defineField } from 'sanity';

export const fundingResult = defineType({
  name: 'fundingResult',
  title: 'Funding round result',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({ name: 'fund', type: 'reference', to: [{ type: 'fund' }] }),
    defineField({ name: 'roundName', type: 'string' }),
    defineField({ name: 'announcedAt', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'summary', type: 'localizedText' }),
    defineField({
      name: 'recipients', type: 'array',
      of: [{
        type: 'object',
        name: 'recipient',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'project', type: 'localizedString' },
          { name: 'amount', type: 'number' },
          { name: 'region', type: 'string' },
          { name: 'artform', type: 'reference', to: [{ type: 'artform' }] },
        ],
      }],
    }),
    defineField({ name: 'totalAwarded', type: 'number' }),
    defineField({ name: 'totalApplications', type: 'number' }),
  ],
});
