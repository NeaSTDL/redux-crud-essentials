import defaultState from '../../constants/defaultState';
import {reducersFor} from '..';

describe('The entitiesReducer factory', () => {
  const {entitiesReducers} = reducersFor('fruits');

  describe('constructs a CREATE reducer', () => {
    test('that returns a reduced state from a blank state correctly.', () => {
      expect(
        entitiesReducers(defaultState.entities, {
          type: 'fruits/CREATE',
          payload: {1: {id: 1, name: 'banana', color: 'yellow'}}
        })
      ).toEqual({
        1: {id: 1, name: 'banana', color: 'yellow'}
      });
    });

    test('that returns a reduced state from a non-blank state correctly.', () => {
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
  });

  describe('constructs an UPDATE reducer', () => {
    test('That returns a state with an updated item correctly from a filled state.', () => {
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
  });

  describe('constructs a DELETE reducer', () => {
    test('that returns a state with a removed item correctly from a filled state.', () => {
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
});
