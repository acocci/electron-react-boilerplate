import { expectedFormatted, formatCatalog, mockCatalog } from 'helpers/catalog';

describe('Generate formatted catalog', () => {
  it('should return a list of formatted catalog messages', () => {
    const formattedCatalog = formatCatalog(mockCatalog);
    expect(formattedCatalog).toEqual(expectedFormatted);
  });
});
