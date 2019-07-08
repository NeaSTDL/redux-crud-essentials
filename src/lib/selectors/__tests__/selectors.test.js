import {selectorsFor} from '..';

const dummyState = {
  fruits: {
    entities: {
      1: {id: 1, name: 'apple'},
      2: {id: 2, name: 'orange'},
      3: {id: 3, name: 'banana'}
    }
  }
};

test('That selectorsFor factory is correctly created and functional.', () => {
  const {all, byIdentifier} = selectorsFor('example');
  expect(all).toBeDefined();
  expect(byIdentifier).toBeDefined();
  expect(typeof all).toEqual('function');
  expect(typeof byIdentifier).toEqual('function');
});

describe('That the selector factories perform as intended.', () => {
  const fromFruitsSelect = selectorsFor('fruits', {identifierName: 'id'});

  test('The instanced "all" selector returns all values from the store in an array format', () => {
    const fruitsListAsArray = fromFruitsSelect.all(dummyState);
    expect(Array.isArray(fruitsListAsArray)).toBeTruthy();
    expect(fruitsListAsArray).toEqual([
      {id: 1, name: 'apple'},
      {id: 2, name: 'orange'},
      {id: 3, name: 'banana'}
    ]);
  });

  test('The "byIdentified" selector, an specific item is fetched', () => {
    expect(fromFruitsSelect.byIdentifier(dummyState, {id: 1})).toEqual({
      id: 1,
      name: 'apple'
    });
  });
});
