import {actionCreatorsFor} from '..';

test('That action creators without namespace are built correctly.', () => {
  const forEntity = actionCreatorsFor('fruits');

  expect(forEntity.fruits.create({id: 1, name: 'banana'})).toEqual({
    type: 'fruits/CREATE',
    payload: {entities: {1: {id: 1, name: 'banana'}}}
  });
  expect(forEntity.fruits.update({id: 1, name: 'banana'})).toEqual({
    type: 'fruits/UPDATE',
    payload: {entities: {1: {id: 1, name: 'banana'}}}
  });
  expect(forEntity.fruits.delete({id: 1, name: 'banana'})).toEqual({
    type: 'fruits/DELETE',
    payload: 1
  });
});

test('That action creators with namespace are built correctly.', () => {
  const forNamespace = actionCreatorsFor('fruits', 'nimbus9');
  expect(forNamespace.nimbus9.fruits.create({id: 1, name: 'banana'})).toEqual({
    type: 'nimbus9/fruits/CREATE',
    payload: {entities: {1: {id: 1, name: 'banana'}}}
  });
  expect(forNamespace.nimbus9.fruits.update({id: 1, name: 'banana'})).toEqual({
    type: 'nimbus9/fruits/UPDATE',
    payload: {entities: {1: {id: 1, name: 'banana'}}}
  });
  expect(forNamespace.nimbus9.fruits.delete({id: 1, name: 'banana'})).toEqual({
    type: 'nimbus9/fruits/DELETE',
    payload: 1
  });
});
