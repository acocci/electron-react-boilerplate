import { decodeURIPairs, encodeURIPairs } from 'helpers/uri';
import { GenericRecord } from 'types/generic.types';

const bodyDetails: GenericRecord = {
  client_id: 'chpida_api',
  grant_type: 'password',
  password: 'test',
  username: 'username',
};

const encoded = 'client_id=chpida_api&grant_type=password&password=test&username=username';

describe('Generate encoded URI', () => {
  it('should generate encoded array of URI pairs', () => {
    const endcodedURIGenerate = encodeURIPairs(bodyDetails);
    expect(endcodedURIGenerate).toEqual(encoded);
  });
});

describe('Generate decoded URI', () => {
  it('should generate encoded array of URI pairs', () => {
    const decodedURIGenerate = decodeURIPairs(encoded);
    expect(decodedURIGenerate).toEqual(bodyDetails);
  });
});
