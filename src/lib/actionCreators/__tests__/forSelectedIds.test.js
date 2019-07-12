import {actionCreatorsFor} from '..';

describe('The actionCreator functions for "selectedIds" store', () => {
  describe('created with a NULL "namespace"', () => {
    const fruitsActions = actionCreatorsFor('fruits');

    describe('construct an ADD_SELECTED action creator function', () => {
      test(`that returns a valid action given an entity object to append the end of the 
      selectedIds list.`, () => {
        expect(fruitsActions.addSelected({id: 1, name: 'banana'})).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1],
          meta: {position: 'end'}
        });
      });

      test(`that returns a valid action given an entity object to append the end of the 
      selectedIds list.`, () => {
        expect(
          fruitsActions.addSelected({id: 1, name: 'banana'}, 'start')
        ).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1],
          meta: {position: 'start'}
        });
      });

      test(`that returns a valid action given an entities array to append the end of the 
      selectedIds list.`, () => {
        expect(
          fruitsActions.addSelected([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1, 2],
          meta: {position: 'end'}
        });
      });

      test(`that returns a valid action given an entities array to append the end of the 
      selectedIds list.`, () => {
        expect(
          fruitsActions.addSelected(
            [{id: 1, name: 'banana'}, {id: 2, name: 'pear'}],
            'start'
          )
        ).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1, 2],
          meta: {position: 'start'}
        });
      });
    });

    describe('construct a REMOVE_SELECTED action creator function', () => {
      test(`that returns a valid action given an entity object to remove from the 
      selectedIds list.`, () => {
        expect(fruitsActions.removeSelected({id: 1, name: 'banana'})).toEqual({
          type: 'fruits/REMOVE_SELECTED',
          payload: [1]
        });
      });

      test(`that returns a valid action given an array of entities' IDs to remove from the 
        selectedIds list.`, () => {
        expect(
          fruitsActions.removeSelected([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/REMOVE_SELECTED',
          payload: [1, 2]
        });
      });
    });
  });

  describe('created with a non-NULL identifier', () => {
    const fruitsActions = actionCreatorsFor('fruits', null, {
      identifier: '_id'
    });

    describe('construct an ADD_SELECTED action creator function', () => {
      test(`that returns a valid action given an entity object to append the end of the 
      selectedIds list.`, () => {
        expect(fruitsActions.addSelected({_id: 1, name: 'banana'})).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1],
          meta: {position: 'end'}
        });
      });

      test(`that returns a valid action given an entity object to append the end of the 
      selectedIds list.`, () => {
        expect(
          fruitsActions.addSelected({_id: 1, name: 'banana'}, 'start')
        ).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1],
          meta: {position: 'start'}
        });
      });

      test(`that returns a valid action given an entities array to append the end of the 
      selectedIds list.`, () => {
        expect(
          fruitsActions.addSelected([
            {_id: 1, name: 'banana'},
            {_id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1, 2],
          meta: {position: 'end'}
        });
      });

      test(`that returns a valid action given an entities array to append the end of the 
      selectedIds list.`, () => {
        expect(
          fruitsActions.addSelected(
            [{_id: 1, name: 'banana'}, {_id: 2, name: 'pear'}],
            'start'
          )
        ).toEqual({
          type: 'fruits/ADD_SELECTED',
          payload: [1, 2],
          meta: {position: 'start'}
        });
      });
    });

    describe('construct a REMOVE_SELECTED action creator function', () => {
      test(`that returns a valid action given an entity object to remove from the selectedIds list.
      `, () => {
        expect(fruitsActions.removeSelected({_id: 1, name: 'banana'})).toEqual({
          type: 'fruits/REMOVE_SELECTED',
          payload: [1]
        });
      });

      test(`that returns a valid action given an array of entities' IDs to remove from the 
        selectedIds list.`, () => {
        expect(
          fruitsActions.removeSelected([
            {_id: 1, name: 'banana'},
            {_id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/REMOVE_SELECTED',
          payload: [1, 2]
        });
      });
    });
  });
});
