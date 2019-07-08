import {actionCreatorsFor} from '..';

describe('About actionCreators functions (without namespace):', () => {
  const forEntity = actionCreatorsFor('fruits');

  test('That the CREATE actionCreator works as expected with an object input.', () => {
    expect(forEntity.fruits.create({id: 1, name: 'banana'})).toEqual({
      type: 'fruits/CREATE',
      payload: {entities: {1: {id: 1, name: 'banana'}}}
    });
  });

  test('That the CREATE actionCreator works as expected with an array input.', () => {
    expect(
      forEntity.fruits.create([{id: 1, name: 'banana'}, {id: 2, name: 'pear'}])
    ).toEqual({
      type: 'fruits/CREATE',
      payload: {
        entities: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
      }
    });
  });

  test('That the UPDATE actionCreator works as expected with an object input.', () => {
    expect(forEntity.fruits.update({id: 1, name: 'banana'})).toEqual({
      type: 'fruits/UPDATE',
      payload: {entities: {1: {id: 1, name: 'banana'}}}
    });
  });

  test('That the UPDATE actionCreator works as expected with an array input.', () => {
    expect(
      forEntity.fruits.update([{id: 1, name: 'banana'}, {id: 2, name: 'pear'}])
    ).toEqual({
      type: 'fruits/UPDATE',
      payload: {
        entities: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
      }
    });
  });

  test('That the DELETE actionCreator works as expected with an object input.', () => {
    expect(forEntity.fruits.delete({id: 1, name: 'banana'})).toEqual({
      type: 'fruits/DELETE',
      payload: [1]
    });
  });

  test('That the DELETE actionCreator works as expected with an object input.', () => {
    expect(
      forEntity.fruits.delete([{id: 1, name: 'banana'}, {id: 2, name: 'pear'}])
    ).toEqual({
      type: 'fruits/DELETE',
      payload: [1, 2]
    });
  });
});

describe('About actionCreators functions (with namespace):', () => {
  const forNamespace = actionCreatorsFor('fruits', 'nimbus9');

  test('That the CREATE actionCreator works as expected with an object input.', () => {
    expect(forNamespace.nimbus9.fruits.create({id: 1, name: 'banana'})).toEqual(
      {
        type: 'nimbus9/fruits/CREATE',
        payload: {entities: {1: {id: 1, name: 'banana'}}}
      }
    );
  });

  test('That the CREATE actionCreator works as expected with an array input.', () => {
    expect(
      forNamespace.nimbus9.fruits.create([
        {id: 1, name: 'banana'},
        {id: 2, name: 'pear'}
      ])
    ).toEqual({
      type: 'nimbus9/fruits/CREATE',
      payload: {
        entities: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
      }
    });
  });

  test('That the UPDATE actionCreator works as expected with an object input.', () => {
    expect(forNamespace.nimbus9.fruits.update({id: 1, name: 'banana'})).toEqual(
      {
        type: 'nimbus9/fruits/UPDATE',
        payload: {entities: {1: {id: 1, name: 'banana'}}}
      }
    );
  });

  test('That the UPDATE actionCreator works as expected with an array input.', () => {
    expect(
      forNamespace.nimbus9.fruits.update([
        {id: 1, name: 'banana'},
        {id: 2, name: 'pear'}
      ])
    ).toEqual({
      type: 'nimbus9/fruits/UPDATE',
      payload: {
        entities: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
      }
    });
  });

  test('That the DELETE actionCreator works as expected with an object input.', () => {
    expect(forNamespace.nimbus9.fruits.delete({id: 1, name: 'banana'})).toEqual(
      {
        type: 'nimbus9/fruits/DELETE',
        payload: [1]
      }
    );
  });

  test('That the DELETE actionCreator works as expected with an array input.', () => {
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
