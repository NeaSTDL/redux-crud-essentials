import createReduxCrud from '..';

describe('About the Redux CRUD factory setup process.', () => {
  test(`That it throws an exception when passed a non-undefined, non-string or non-object value as 
  parameter.`, () => {
    expect(createReduxCrud).not.toThrow();
    expect(() => createReduxCrud(1)).toThrow();
    expect(() => createReduxCrud(true)).toThrow();
    expect(() => createReduxCrud([])).toThrow();
    expect(() => createReduxCrud('')).toThrow();
  });

  test('That it returns a manager function when passed a string as parameter.', () => {
    const n9ReduxCrudManager = createReduxCrud('nimbus9');
    const fruitsManager = n9ReduxCrudManager('fruits');
    expect(typeof n9ReduxCrudManager).toEqual('function');
    expect(fruitsManager).toHaveProperty('actionCreators');
    expect(fruitsManager).toHaveProperty('selectors');
    expect(fruitsManager).toHaveProperty('reducers');
  });

  test('That it returns a wrapper object when passed an object as parameter.', () => {
    const n9ReduxCrudManager = createReduxCrud({
      namespace: 'nimbus9',
      entityName: 'fruits'
    });
    expect(typeof n9ReduxCrudManager).toEqual('object');
    expect(n9ReduxCrudManager).toHaveProperty('actionCreators');
    expect(n9ReduxCrudManager).toHaveProperty('selectors');
    expect(n9ReduxCrudManager).toHaveProperty('reducers');
  });
});
