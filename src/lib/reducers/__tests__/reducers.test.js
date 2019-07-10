import defaultState from '../../constants/defaultState';
import {reducersFor} from '..';

describe('About the "entities" reducer factory.', () => {
  const {entitiesReducers} = reducersFor('fruits');

  test('That its CREATE reducer adds an item on a blank state correctly.', () => {
    expect(
      entitiesReducers(defaultState.entities, {
        type: 'fruits/CREATE',
        payload: {1: {id: 1, name: 'banana', color: 'yellow'}}
      })
    ).toEqual({
      1: {id: 1, name: 'banana', color: 'yellow'}
    });
  });

  test('That its CREATE reducer adds an item on a pre-filled state correctly.', () => {
    expect(
      entitiesReducers(
        {
          1: {id: 1, name: 'banana', color: 'yellow'}
        },
        {
          type: 'fruits/CREATE',
          payload: {2: {id: 2, name: 'apple', color: 'red'}}
        }
      )
    ).toEqual({
      1: {id: 1, name: 'banana', color: 'yellow'},
      2: {id: 2, name: 'apple', color: 'red'}
    });
  });

  test('That its UPDATE reducer updates an existing item correctly on a filled state.', () => {
    expect(
      entitiesReducers(
        {
          1: {id: 1, name: 'banana', color: 'yellow'}
        },
        {
          type: 'fruits/UPDATE',
          payload: {1: {id: 1, name: 'pear', color: 'green'}}
        }
      )
    ).toEqual({
      1: {id: 1, name: 'pear', color: 'green'}
    });
  });

  test('That its DELETE reducer removes an existing item correctly on a filled state.', () => {
    expect(
      entitiesReducers(
        {
          1: {id: 1, name: 'banana', color: 'yellow'},
          2: {id: 2, name: 'apple', color: 'red'}
        },
        {
          type: 'fruits/DELETE',
          payload: [2]
        }
      )
    ).toEqual({
      1: {id: 1, name: 'banana', color: 'yellow'}
    });
  });
});

describe('About the "selectedIds" reducer factory.', () => {
  const {selectedIdsReducers} = reducersFor('fruits');

  test('That its ADD reducer sets the corresponding ID(s) on the state.', () => {
    expect(
      selectedIdsReducers([], {
        type: 'fruits/ADD_SELECTED',
        payload: [1],
        meta: {position: 'end'}
      })
    ).toEqual([1]);
  });

  test('That its ADD reducer sets the corresponding ID(s) on the state.', () => {
    expect(
      selectedIdsReducers([1, 2], {
        type: 'fruits/ADD_SELECTED',
        payload: [3],
        meta: {position: 'end'}
      })
    ).toEqual([1, 2, 3]);
  });

  test('That its ADD reducer sets the corresponding ID(s) on the state.', () => {
    expect(
      selectedIdsReducers([], {
        type: 'fruits/ADD_SELECTED',
        payload: [1],
        meta: {position: 'start'}
      })
    ).toEqual([1]);
  });

  test('That its ADD reducer sets the corresponding ID(s) on the state.', () => {
    expect(
      selectedIdsReducers([1, 2], {
        type: 'fruits/ADD_SELECTED',
        payload: [3],
        meta: {position: 'start'}
      })
    ).toEqual([3, 1, 2]);
  });

  test('That its REMOVE reducer unsets the corresponding ID(s) on the state.', () => {
    expect(
      selectedIdsReducers([1, 2, 3], {
        type: 'fruits/REMOVE_SELECTED',
        payload: [2]
      })
    ).toEqual([1, 3]);
  });
});
