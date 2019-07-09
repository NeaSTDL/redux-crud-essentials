import {actionCreatorsFor} from '..';

describe('About actionCreators functions (without namespace):', () => {
  const forEntity = actionCreatorsFor('fruits');

  test('That the CREATE actionCreator works as expected with an object input.', () => {
    expect(forEntity.fruits.create({id: 1, name: 'banana'})).toEqual({
      type: 'fruits/CREATE',
      payload: {1: {id: 1, name: 'banana'}}
    });
  });

  test('That the CREATE actionCreator works as expected with an array input.', () => {
    expect(
      forEntity.fruits.create([{id: 1, name: 'banana'}, {id: 2, name: 'pear'}])
    ).toEqual({
      type: 'fruits/CREATE',
      payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
    });
  });

  test('That the UPDATE actionCreator works as expected with an object input.', () => {
    expect(forEntity.fruits.update({id: 1, name: 'banana'})).toEqual({
      type: 'fruits/UPDATE',
      payload: {1: {id: 1, name: 'banana'}}
    });
  });

  test('That the UPDATE actionCreator works as expected with an array input.', () => {
    expect(
      forEntity.fruits.update([{id: 1, name: 'banana'}, {id: 2, name: 'pear'}])
    ).toEqual({
      type: 'fruits/UPDATE',
      payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
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
        payload: {1: {id: 1, name: 'banana'}}
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
      payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
    });
  });

  test('That the UPDATE actionCreator works as expected with an object input.', () => {
    expect(forNamespace.nimbus9.fruits.update({id: 1, name: 'banana'})).toEqual(
      {
        type: 'nimbus9/fruits/UPDATE',
        payload: {1: {id: 1, name: 'banana'}}
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
      payload: {1: {id: 1, name: 'banana'}, 2: {id: 2, name: 'pear'}}
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

describe('About the ADD_SELECTED actionCreator.', () => {
  const forEntity = actionCreatorsFor('fruits');

  test(`That it constructs a correct action given an entity object to append the end of the 
  selectedIds list.`, () => {
    expect(forEntity.fruits.addSelected({id: 1, name: 'banana'})).toEqual({
      type: 'fruits/ADD_SELECTED',
      payload: [1],
      meta: {position: 'end'}
    });
  });

  test(`That it constructs a correct action given an entity object to append the end of the 
  selectedIds list.`, () => {
    expect(
      forEntity.fruits.addSelected({id: 1, name: 'banana'}, 'start')
    ).toEqual({
      type: 'fruits/ADD_SELECTED',
      payload: [1],
      meta: {position: 'start'}
    });
  });

  test(`That it constructs a correct action given an entities array to append the end of the 
  selectedIds list.`, () => {
    expect(
      forEntity.fruits.addSelected([
        {id: 1, name: 'banana'},
        {id: 2, name: 'pear'}
      ])
    ).toEqual({
      type: 'fruits/ADD_SELECTED',
      payload: [1, 2],
      meta: {position: 'end'}
    });
  });

  test(`That it constructs a correct action given an entities array to append the end of the 
  selectedIds list.`, () => {
    expect(
      forEntity.fruits.addSelected(
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

describe('About the REMOVE_SELECTED actionCreator.', () => {
  const forEntity = actionCreatorsFor('fruits');

  test(`That it constructs a correct action given an entity object to remove from the 
  selectedIds list.`, () => {
    expect(forEntity.fruits.removeSelected({id: 1, name: 'banana'})).toEqual({
      type: 'fruits/REMOVE_SELECTED',
      payload: [1]
    });
  });

  test(`That it constructs a correct action given an entities array to remove from the 
    selectedIds list.`, () => {
    expect(
      forEntity.fruits.removeSelected([
        {id: 1, name: 'banana'},
        {id: 2, name: 'pear'}
      ])
    ).toEqual({
      type: 'fruits/REMOVE_SELECTED',
      payload: [1, 2]
    });
  });
});
