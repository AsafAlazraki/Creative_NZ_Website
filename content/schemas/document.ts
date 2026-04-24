import { defineType, defineField } from 'sanity';

export const document = defineType({
  name: 'document',
  title: 'Downloadable document',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'file', type: 'file', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'localizedText' }),
    defineField({ name: 'fileType', type: 'string', options: { list: ['PDF', 'DOCX', 'XLSX'] } }),
    defineField({ name: 'sizeBytes', type: 'number' }),
    defineField({ name: 'publishedAt', type: 'date' }),
  ],
});
