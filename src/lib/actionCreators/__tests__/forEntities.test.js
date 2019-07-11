import {actionCreatorsFor} from '..';

describe('The actionCreator functions for "entities" store', () => {
  describe('created with a NULL "namespace"', () => {
    const forEntity = actionCreatorsFor('fruits');
    describe('construct a CREATE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(forEntity.fruits.create({id: 1, name: 'banana'})).toEqual({
          type: 'fruits/CREATE',
          payload: {1: {id: 1, name: 'banana'}}
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forEntity.fruits.create([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/CREATE',
          payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
        });
      });
    });
    describe('construct an UPDATE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(forEntity.fruits.update({id: 1, name: 'banana'})).toEqual({
          type: 'fruits/UPDATE',
          payload: {1: {id: 1, name: 'banana'}}
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forEntity.fruits.update([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/UPDATE',
          payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
        });
      });
    });
    describe('construct a DELETE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(forEntity.fruits.delete({id: 1, name: 'banana'})).toEqual({
          type: 'fruits/DELETE',
          payload: [1]
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forEntity.fruits.delete([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/DELETE',
          payload: [1, 2]
        });
      });
    });
  });
  describe('created with a non-NULL "namespace"', () => {
    const forNamespace = actionCreatorsFor('fruits', 'nimbus9');
    describe('construct a CREATE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(
          forNamespace.nimbus9.fruits.create({id: 1, name: 'banana'})
        ).toEqual({
          type: 'nimbus9/fruits/CREATE',
          payload: {1: {id: 1, name: 'banana'}}
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forNamespace.nimbus9.fruits.create([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'nimbus9/fruits/CREATE',
          payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
        });
      });
    });
    describe('construct an UPDATE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(
          forNamespace.nimbus9.fruits.update({id: 1, name: 'banana'})
        ).toEqual({
          type: 'nimbus9/fruits/UPDATE',
          payload: {1: {id: 1, name: 'banana'}}
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forNamespace.nimbus9.fruits.update([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'nimbus9/fruits/UPDATE',
          payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
        });
      });
    });
    describe('construct a DELETE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(
          forNamespace.nimbus9.fruits.delete({id: 1, name: 'banana'})
        ).toEqual({
          type: 'nimbus9/fruits/DELETE',
          payload: [1]
        });
      });
      test('that returns an action when passed an array', () => {
        expect(
          forNamespace.nimbus9.fruits.delete([
            {id: 1, name: 'banana'},
            {id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'nimbus9/fruits/DELETE',
          payload: [1, 2]
        });
      });
    });
  });
  describe('created with a non-default identifier', () => {
    const forEntity = actionCreatorsFor('fruits', null, {identifier: '_id'});
    describe('construct a CREATE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(forEntity.fruits.create({_id: 1, name: 'banana'})).toEqual({
          type: 'fruits/CREATE',
          payload: {1: {_id: 1, name: 'banana'}}
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forEntity.fruits.create([
            {_id: 1, name: 'banana'},
            {_id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/CREATE',
          payload: {1: {_id: 1, name: 'banana'}, 2: {_id: 2, name: 'pear'}}
        });
      });
    });
    describe('construct an UPDATE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(forEntity.fruits.update({_id: 1, name: 'banana'})).toEqual({
          type: 'fruits/UPDATE',
          payload: {1: {_id: 1, name: 'banana'}}
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forEntity.fruits.update([
            {_id: 1, name: 'banana'},
            {_id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/UPDATE',
          payload: {1: {_id: 1, name: 'banana'}, 2: {_id: 2, name: 'pear'}}
        });
      });
    });
    describe('construct a DELETE action creator function', () => {
      test('that returns an action when passed an object', () => {
        expect(forEntity.fruits.delete({_id: 1, name: 'banana'})).toEqual({
          type: 'fruits/DELETE',
          payload: [1]
        });
      });

      test('that returns an action when passed an array', () => {
        expect(
          forEntity.fruits.delete([
            {_id: 1, name: 'banana'},
            {_id: 2, name: 'pear'}
          ])
        ).toEqual({
          type: 'fruits/DELETE',
          payload: [1, 2]
        });
      });
    });
  });
});
