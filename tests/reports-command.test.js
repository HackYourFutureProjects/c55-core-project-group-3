import { test, expect, vi } from 'vitest';
import { fetchDate } from '../src/cli-commands/reports-command';

async function runWithDate(isoString) {
  const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.useFakeTimers();
  vi.setSystemTime(new Date(isoString));
  await fetchDate();
  const logged = spy.mock.calls[0];
  vi.useRealTimers();
  spy.mockRestore();
  return logged;
}

test('formats a Tuesday correctly', async () => {
  const result = await runWithDate('2026-04-14T00:00:00Z');
  expect(result[0]).toBe('Date:');
  expect(result[1]).toBe('Tuesday 14 April 2026');
});