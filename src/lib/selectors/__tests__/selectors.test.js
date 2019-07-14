import {selectorsFor} from '..';

const dummyState = {
  fruits: {
    entities: {
      1: {id: 1, name: 'apple'},
      2: {id: 2, name: 'orange'},
      3: {id: 3, name: 'banana'}
    },
    selectedIds: []
  },
  persons: {
    entities: {
      1: {_id: 1, name: 'Charlie'},
      2: {_id: 2, name: 'Pedro'}
    },
    selectedIds: []
  }
};

describe('The "selectorsFor" factory function', () => {
  test('has the correct content and is structured correctly.', () => {
    const {all, allSelected, byIdentifier} = selectorsFor('example');
    expect(all).toBeDefined();
    expect(typeof all).toEqual('function');
    expect(allSelected).toBeDefined();
    expect(typeof allSelected).toEqual('function');
    expect(byIdentifier).toBeDefined();
    expect(typeof byIdentifier).toEqual('function');
  });

  describe('using default "id" as identifier', () => {
    const fromFruitsSelect = selectorsFor('fruits');
    describe('constructs an "all" selector', () => {
      test('that returns all values from the store in an array format', () => {
        const fruitsListAsArray = fromFruitsSelect.all(dummyState);
        expect(Array.isArray(fruitsListAsArray)).toBeTruthy();
        expect(fruitsListAsArray).toEqual([
          {id: 1, name: 'apple'},
          {id: 2, name: 'orange'},
          {id: 3, name: 'banana'}
        ]);
      });
    });

    describe('constructs an "allSelected" selector', () => {
      test('that returns all values from the store in an array format', () => {
        const fruitsListAsArray = fromFruitsSelect.allSelected(dummyState);
        expect(Array.isArray(fruitsListAsArray)).toBeTruthy();
        expect(fruitsListAsArray).toEqual([]);
      });
      test('that returns all values from the store in an array format', () => {
        const fruitsListAsArray = fromFruitsSelect.allSelected({
          fruits: {...dummyState.fruits, selectedIds: [1, 2]}
        });
        expect(Array.isArray(fruitsListAsArray)).toBeTruthy();
        expect(fruitsListAsArray).toEqual([
          {id: 1, name: 'apple'},
          {id: 2, name: 'orange'}
        ]);
      });
    });

    describe('constructs a "byIdentified" selector', () => {
      test('that returns an specific item when passed an id as props', () => {
        const selectByIdForTest = fromFruitsSelect.byIdentifier();
        expect(selectByIdForTest(dummyState, {id: 1})).toEqual({
          id: 1,
          name: 'apple'
        });
      });
    });
  });

  describe('using "_id" as identifier', () => {
    const fromPersonsSelect = selectorsFor('persons', {identifier: '_id'});
    describe('constructs an "all" selector', () => {
      test('that returns all values from the store in an array format', () => {
        const personsListAsArray = fromPersonsSelect.all(dummyState);
        expect(Array.isArray(personsListAsArray)).toBeTruthy();
        expect(personsListAsArray).toEqual([
          {_id: 1, name: 'Charlie'},
          {_id: 2, name: 'Pedro'}
        ]);
      });
    });

    describe('constructs an "allSelected" selector', () => {
      test('that returns all values from the store in an array format', () => {
        const personsListAsArray = fromPersonsSelect.allSelected(dummyState);
        expect(Array.isArray(personsListAsArray)).toBeTruthy();
        expect(personsListAsArray).toEqual([]);
      });
      test('that returns all values from the store in an array format', () => {
        const personsListAsArray = fromPersonsSelect.allSelected({
          persons: {...dummyState.persons, selectedIds: [1]}
        });
        expect(Array.isArray(personsListAsArray)).toBeTruthy();
        expect(personsListAsArray).toEqual([{_id: 1, name: 'Charlie'}]);
      });
    });

    describe('constructs a "byIdentified" selector', () => {
      test('that returns an specific item when passed an id as props', () => {
        const selectByIdForTest = fromPersonsSelect.byIdentifier();
        expect(selectByIdForTest(dummyState, {_id: 1})).toEqual({
          _id: 1,
          name: 'Charlie'
        });
      });
    });
  });
});
