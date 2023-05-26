import { generateLabelValuePairs, generateNameValuePairs } from 'helpers/options';

const expected = [
  { name: 'Feline', value: 'cat' },
  { name: 'Canine', value: 'dog' },
];

describe('Generate Name/Value Pairs', () => {
  it('should generate array of pairs from enum', () => {
    enum Pets {
      dog = 'Canine',
      cat = 'Feline',
    }
    const pairs = generateNameValuePairs(Pets);
    expect(pairs).toEqual(expected);
  });

  it('should generate array of pairs from object', () => {
    const Pets = {
      cat: 'Feline',
      dog: 'Canine',
    };
    const pairs = generateNameValuePairs(Pets);
    expect(pairs).toEqual(expected);
  });
});

describe('Generate Label/Value Pairs', () => {
  it('should generate array of label/value pairs from array', () => {
    const Pets = ['Cat', 'Dog'];
    const arr = generateLabelValuePairs(Pets);
    expect(arr).toEqual([
      {
        label: 'Cat',
        value: 'cat',
      },
      {
        label: 'Dog',
        value: 'dog',
      },
    ]);
  });
});
