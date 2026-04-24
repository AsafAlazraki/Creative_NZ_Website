import { defineType, defineField } from 'sanity';
 
export const fund = defineType({
  name: 'fund',
  title: 'Fund',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'shortName', type: 'localizedString' }),
    defineField({
      name: 'slug', type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category', type: 'string',
      options: {
        list: ['Grant', 'Fellowship', 'Scholarship', 'Bursary', 'Residency', 'Investment'],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'audience', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'applicantType' }] }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'artforms', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artform' }] }],
    }),
    defineField({ name: 'summary', type: 'localizedText' }),
    defineField({
      name: 'amount', type: 'object',
      fields: [
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'currency', type: 'string', initialValue: 'NZD' },
        { name: 'note', type: 'localizedString' },
      ],
    }),
    defineField({
      name: 'rounds', type: 'array',
      of: [{
        type: 'object',
        name: 'fundRound',
        fields: [
          { name: 'name', type: 'localizedString' },
          { name: 'openDate', type: 'date' },
          { name: 'closeDate', type: 'datetime' },
          {
            name: 'status', type: 'string',
            options: { list: ['upcoming', 'open', 'closed'] },
          },
          { name: 'results', type: 'reference', to: [{ type: 'fundingResult' }] },
        ],
      }],
    }),
    defineField({ name: 'eligibility', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'whatWeFund', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'whatWeDoNotFund', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'howToApply', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'assessmentCriteria', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'timeline', type: 'array',
      of: [{
        type: 'object',
        name: 'timelineStep',
        fields: [
          { name: 'title', type: 'localizedString' },
          { name: 'description', type: 'localizedText' },
          { name: 'durationLabel', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'faqs', type: 'array',
      of: [{
        type: 'object',
        name: 'faq',
        fields: [
          { name: 'question', type: 'localizedString' },
          { name: 'answer', type: 'localizedText' },
        ],
      }],
    }),
    defineField({ name: 'contactPerson', type: 'reference', to: [{ type: 'person' }] }),
    defineField({ name: 'portalUrl', type: 'url' }),
    defineField({
      name: 'relatedFunds', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'fund' }] }],
    }),
  ],
  preview: {
    select: { title: 'name.en', category: 'category' },
    prepare: ({ title, category }) => ({ title, subtitle: category }),
  },
});
