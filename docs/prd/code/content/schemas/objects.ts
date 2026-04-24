import { defineType, defineField } from 'sanity';
 
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'mi', title: 'Te reo Māori', type: 'string' }),
  ],
});
 
export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'mi', title: 'Te reo Māori', type: 'text' }),
  ],
});
