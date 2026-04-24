export const LOCALES = ['en', 'mi'] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'mi';
}

export function pickLocalized<T>(value: { en?: T; mi?: T } | null | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.en;
}

export const t = {
  en: {
    skipToMain: 'Skip to main content',
    search: 'Search',
    signIn: 'Sign in',
    loading: 'Loading…',
    noResults: 'No results.',
    back: 'Back',
    readMore: 'Read more',
    apply: 'Apply',
    closingIn: (days: number) => `Closing in ${days} day${days === 1 ? '' : 's'}`,
    closed: 'Closed',
    open: 'Open',
    upcoming: 'Upcoming',
  },
  mi: {
    skipToMain: 'Peke ki te kiko matua',
    search: 'Rapu',
    signIn: 'Takiuru',
    loading: 'E uta ana…',
    noResults: 'Kāore he hua.',
    back: 'Hoki',
    readMore: 'Pānui atu',
    apply: 'Tono',
    closingIn: (days: number) => `E kati ana ā ${days} rā`,
    closed: 'Kua kati',
    open: 'Tuwhera',
    upcoming: 'Kei te tū mai',
  },
} as const;
