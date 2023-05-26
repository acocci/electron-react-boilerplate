import { defaultDisplayType, DisplayOptions } from 'features/ToggleView/ToggleView.types';
import { isDashboard, isDefaultDisplayType, isList } from 'helpers/toggleView';

describe('Return correct view', () => {
  it('should return true if default display type', () => {
    const currentType = isDefaultDisplayType(defaultDisplayType);
    expect(currentType).toEqual(true);
  });

  it('should return false if not default display type', () => {
    const currentType = isDefaultDisplayType('fooDisplay');
    expect(currentType).toEqual(false);
  });

  it('should return true if dashboard', () => {
    const currentType = isDashboard(DisplayOptions.DASHBOARD);
    expect(currentType).toEqual(true);
  });

  it('should return false if not dashboard', () => {
    const currentType = isDashboard(DisplayOptions.LIST);
    expect(currentType).toEqual(false);
  });

  it('should return true if list', () => {
    const currentType = isList(DisplayOptions.LIST);
    expect(currentType).toEqual(true);
  });

  it('should return false if not list', () => {
    const currentType = isList(DisplayOptions.DASHBOARD);
    expect(currentType).toEqual(false);
  });
});
