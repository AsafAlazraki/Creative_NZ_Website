export function SkipLink({ locale = 'en' }: { locale?: 'en' | 'mi' }) {
  return (
    <a href="#main" className="skip-link">
      {locale === 'mi' ? 'Peke ki te kiko matua' : 'Skip to main content'}
    </a>
  );
}
