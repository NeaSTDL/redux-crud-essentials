import defaultState from '../defaultState';
import {reducersFor} from '..';

describe('That the reducer factory constructs all reducers as intended.', () => {
  const reducers = reducersFor('fruits');

  test('That CREATE reducer adds an item on a blank state correctly.', () => {
    expect(
      reducers(defaultState, {
        type: 'fruits/CREATE',
        payload: {entities: {1: {id: 1, name: 'banana', color: 'yellow'}}}
      })
    ).toEqual({
      entities: {
        1: {id: 1, name: 'banana', color: 'yellow'}
      }
    });
  });

  test('That CREATE reducer adds an item on a pre-filled state correctly.', () => {
    expect(
      reducers(
        {
          entities: {
            1: {id: 1, name: 'banana', color: 'yellow'}
          }
        },
        {
          type: 'fruits/CREATE',
          payload: {entities: {2: {id: 2, name: 'apple', color: 'red'}}}
        }
      )
    ).toEqual({
      entities: {
        1: {id: 1, name: 'banana', color: 'yellow'},
        2: {id: 2, name: 'apple', color: 'red'}
      }
    });
  });

  test('That UPDATE reducer updates an existing item correctly on a filled state.', () => {
    expect(
      reducers(
        {
          entities: {
            1: {id: 1, name: 'banana', color: 'yellow'}
          }
        },
        {
          type: 'fruits/UPDATE',
          payload: {entities: {1: {id: 1, name: 'pear', color: 'green'}}}
        }
      )
    ).toEqual({
      entities: {
        1: {id: 1, name: 'pear', color: 'green'}
      }
    });
  });

  test('That DELETE reducer removes an existing item correctly on a filled state.', () => {
    expect(
      reducers(
        {
          entities: {
            1: {id: 1, name: 'banana', color: 'yellow'},
            2: {id: 2, name: 'apple', color: 'red'}
          }
        },
        {
          type: 'fruits/DELETE',
          payload: 2
        }
      )
    ).toEqual({
      entities: {
        1: {id: 1, name: 'banana', color: 'yellow'}
      }
    });
  });
});
