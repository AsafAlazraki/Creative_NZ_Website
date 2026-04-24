import { page } from './page';
import { section } from './section';
import { fund } from './fund';
import { fundingResult } from './fundingResult';
import { newsArticle } from './newsArticle';
import { person } from './person';
import { artform } from './artform';
import { applicantType } from './applicantType';
import { newsCategory } from './newsCategory';
import { document } from './document';
import { event } from './event';
import { globalSettings } from './globalSettings';
import { localizedString, localizedText } from './objects';

export const schemaTypes = [
  page, section, fund, fundingResult, newsArticle, person,
  artform, applicantType, newsCategory, document, event, globalSettings,
  localizedString, localizedText,
];
