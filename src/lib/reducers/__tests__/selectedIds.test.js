import reducersFor from '..';

describe('The selectedIdsReducers factory', () => {
  const {selectedIdsReducers} = reducersFor('fruits');

  describe('constructs an ADD reducer', () => {
    test('that appends a given set of IDs on a blank state.', () => {
      expect(
        selectedIdsReducers([], {
          type: 'fruits/ADD_SELECTED',
          payload: [1]
        })
      ).toEqual([1]);
      expect(
        selectedIdsReducers([], {
          type: 'fruits/ADD_SELECTED',
          payload: [1, 2, 3]
        })
      ).toEqual([1, 2, 3]);
    });

    test('that appends a given set of IDs on a pre-loaded state.', () => {
      expect(
        selectedIdsReducers([1, 2], {
          type: 'fruits/ADD_SELECTED',
          payload: [3]
        })
      ).toEqual([1, 2, 3]);
      expect(
        selectedIdsReducers([1, 2], {
          type: 'fruits/ADD_SELECTED',
          payload: [3, 4]
        })
      ).toEqual([1, 2, 3, 4]);
    });

    test('that can prepend a given ID list on a blank state by using meta->position.', () => {
      expect(
        selectedIdsReducers([], {
          type: 'fruits/ADD_SELECTED',
          payload: [3],
          meta: {position: 'start'}
        })
      ).toEqual([3]);
      expect(
        selectedIdsReducers([], {
          type: 'fruits/ADD_SELECTED',
          payload: [3, 4],
          meta: {position: 'start'}
        })
      ).toEqual([3, 4]);
    });

    test('that can prepend a given ID list on a pre-loaded state by using meta->position.', () => {
      expect(
        selectedIdsReducers([1, 2], {
          type: 'fruits/ADD_SELECTED',
          payload: [3],
          meta: {position: 'start'}
        })
      ).toEqual([3, 1, 2]);
      expect(
        selectedIdsReducers([1, 2], {
          type: 'fruits/ADD_SELECTED',
          payload: [3, 4],
          meta: {position: 'start'}
        })
      ).toEqual([3, 4, 1, 2]);
    });
  });

  describe('constructs a REMOVE reducer', () => {
    test('that unsets the corresponding ID(s) on the state.', () => {
      expect(
        selectedIdsReducers([1, 2, 3], {
          type: 'fruits/REMOVE_SELECTED',
          payload: [2]
        })
      ).toEqual([1, 3]);
      expect(
        selectedIdsReducers([1, 2, 3], {
          type: 'fruits/REMOVE_SELECTED',
          payload: [4]
        })
      ).toEqual([1, 2, 3]);
    });
  });
});
