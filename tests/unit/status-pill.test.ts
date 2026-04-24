import { describe, expect, test } from 'vitest';
import { deriveStatus } from '@/components/cnz/status-pill';

describe('deriveStatus', () => {
  test('returns closed when no closeDate', () => {
    expect(deriveStatus()).toBe('closed');
  });

  test('returns closed when closeDate has passed', () => {
    const yesterday = new Date(Date.now() - 86_400_000).toISOString();
    expect(deriveStatus(yesterday)).toBe('closed');
  });

  test('returns closing when within 14 days', () => {
    const soon = new Date(Date.now() + 7 * 86_400_000).toISOString();
    expect(deriveStatus(soon)).toBe('closing');
  });

  test('returns open when more than 14 days away', () => {
    const later = new Date(Date.now() + 30 * 86_400_000).toISOString();
    expect(deriveStatus(later)).toBe('open');
  });

  test('returns upcoming when openDate is in the future', () => {
    const future = new Date(Date.now() + 10 * 86_400_000).toISOString();
    expect(deriveStatus(new Date(Date.now() + 90 * 86_400_000).toISOString(), future)).toBe('upcoming');
  });
});
