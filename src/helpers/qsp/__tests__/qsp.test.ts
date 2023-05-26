import { getQspParam } from 'helpers/qsp';

describe('get QSP param', () => {
  it('Should return false if param does not exist', () => {
    const test = getQspParam('test');
    expect(test).toEqual(false);
  });

  it('Should return param if it exists', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: 'jedi=master',
      },
    });
    const test = getQspParam('jedi');
    expect(test).toEqual('master');
  });
});
