import createReduxCrud from '..';

describe('The Redux CRUD factory', () => {
  it(`Throws an exception when passed a non-undefined, non-string or non-object value as
  parameter.`, () => {
    expect(createReduxCrud).not.toThrow();
    expect(() => createReduxCrud(1)).toThrow();
    expect(() => createReduxCrud(true)).toThrow();
    expect(() => createReduxCrud([])).toThrow();
    expect(() => createReduxCrud('')).toThrow();
  });

  it('Returns a manager function when passed a string as parameter.', () => {
    const n9ReduxCrudManager = createReduxCrud('nimbus9');
    const fruitsManager = n9ReduxCrudManager('fruits');
    expect(typeof n9ReduxCrudManager).toEqual('function');
    expect(fruitsManager).toHaveProperty('actionTypes');
    expect(fruitsManager).toHaveProperty('actionCreators');
    expect(fruitsManager).toHaveProperty('selectors');
    expect(fruitsManager).toHaveProperty('reducers');
  });

  it(`Returns a manager function when passed an object without a valid "entityName" property as
  parameter.`, () => {
    const n9ReduxCrudManager = createReduxCrud({
      namespace: 'nimbus9',
      identifier: '_id'
    });
    const fruitsManager = n9ReduxCrudManager('fruits');
    expect(typeof n9ReduxCrudManager).toEqual('function');
    expect(fruitsManager).toHaveProperty('actionTypes');
    expect(fruitsManager).toHaveProperty('actionCreators');
    expect(fruitsManager).toHaveProperty('selectors');
    expect(fruitsManager).toHaveProperty('reducers');
  });

  it(`Returns an utilities object when passed an object with a valid "entityName" property as
  parameter.`, () => {
    const fruitsManager = createReduxCrud({
      namespace: 'nimbus9',
      entityName: 'fruits'
    });
    expect(typeof fruitsManager).toEqual('object');
    expect(fruitsManager).toHaveProperty('actionTypes');
    expect(fruitsManager).toHaveProperty('actionCreators');
    expect(fruitsManager).toHaveProperty('selectors');
    expect(fruitsManager).toHaveProperty('reducers');
  });
});
