import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({ name: 'startAt', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'endAt', type: 'datetime' }),
    defineField({ name: 'location', type: 'localizedString' }),
    defineField({ name: 'online', type: 'boolean', initialValue: false }),
    defineField({ name: 'description', type: 'localizedText' }),
    defineField({ name: 'registerUrl', type: 'url' }),
  ],
});
