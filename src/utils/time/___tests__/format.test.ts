import { formatIntoDateTime } from '../format';

describe('format', () => {
  describe('formatIntoDateTime', () => {
    it('returns correctly formatted date', () => {
      const date = new Date(2020, 11, 24, 2, 12);

      expect(formatIntoDateTime(date)).toMatchInlineSnapshot(
        `"24.12.2020 02:12"`
      );
    });
  });
});
