import { defineType, defineField } from 'sanity';

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global settings',
  type: 'document',
  fields: [
    defineField({
      name: 'announcementBanner', type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', initialValue: false },
        { name: 'message', type: 'localizedString' },
        { name: 'linkUrl', type: 'url' },
        { name: 'linkText', type: 'localizedString' },
        {
          name: 'severity', type: 'string',
          options: { list: ['info', 'warning', 'critical'] },
          initialValue: 'info',
        },
        { name: 'dismissible', type: 'boolean', initialValue: true },
      ],
    }),
    defineField({
      name: 'primaryNav', type: 'array',
      of: [{
        type: 'object',
        name: 'navItem',
        fields: [
          { name: 'label', type: 'localizedString' },
          { name: 'href', type: 'string' },
          {
            name: 'children', type: 'array',
            of: [{
              type: 'object',
              name: 'navChild',
              fields: [
                { name: 'label', type: 'localizedString' },
                { name: 'href', type: 'string' },
              ],
            }],
          },
        ],
      }],
    }),
    defineField({
      name: 'footerColumns', type: 'array',
      of: [{
        type: 'object',
        name: 'footerColumn',
        fields: [
          { name: 'heading', type: 'localizedString' },
          {
            name: 'links', type: 'array',
            of: [{
              type: 'object',
              name: 'footerLink',
              fields: [
                { name: 'label', type: 'localizedString' },
                { name: 'href', type: 'string' },
              ],
            }],
          },
        ],
      }],
    }),
    defineField({
      name: 'contact', type: 'object',
      fields: [
        { name: 'phone', type: 'string', initialValue: '+64 4 473 0880' },
        { name: 'email', type: 'string', initialValue: 'info@creativenz.govt.nz' },
        { name: 'address', type: 'localizedText' },
      ],
    }),
    defineField({
      name: 'social', type: 'array',
      of: [{
        type: 'object',
        name: 'socialLink',
        fields: [
          {
            name: 'platform', type: 'string',
            options: { list: ['facebook', 'instagram', 'linkedin', 'youtube'] },
          },
          { name: 'url', type: 'url' },
        ],
      }],
    }),
    defineField({
      name: 'featuredStories', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'newsArticle' }] }],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'flags', type: 'object',
      fields: [
        { name: 'fundFinderEnabled', type: 'boolean', initialValue: false },
      ],
    }),
  ],
});
