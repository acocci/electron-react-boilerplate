import { diffInSeconds, parseISODate } from '../dates';

const lastSentTs = '2023-03-28T04:05:08.249790Z';
const lastRecvTs = '2023-03-28T04:05:13.662011Z';

describe('Parse ISO Date', () => {
  it('should convert ISO Date to date with timezone', () => {
    const parsed = new Date(parseISODate(lastRecvTs));
    expect(parsed).toEqual(new Date(lastRecvTs));
  });
});

describe('Get Difference in Seconds (newer, older)', () => {
  it('should return seconds passed', () => {
    const diff = diffInSeconds(lastRecvTs, lastSentTs);
    expect(diff).toEqual(5);
  });

  it('should return zero seconds if times are the same', () => {
    const diff = diffInSeconds(lastRecvTs, lastRecvTs);
    expect(diff).toEqual(0);
  });

  it('should return zero if one of times are invalid', () => {
    const diff = diffInSeconds(lastRecvTs, 'notadate');
    expect(diff).toEqual(0);
  });
});
