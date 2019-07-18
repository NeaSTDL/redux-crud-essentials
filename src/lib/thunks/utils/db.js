const mockDataCollection = {
  1: {id: 1, name: 'pineapple', color: 'yellow'},
  2: {id: 2, name: 'apple', color: 'red'}
};

export function mockUpdate(args) {
  if (Array.isArray(args))
    return args.map(entity => ({...mockDataCollection[entity.id], ...args}));
  if (typeof args === 'object')
    return {...mockDataCollection[args.id], ...args};
  return null;
}

export function mockRead(args) {
  if (Array.isArray(args))
    return args.map(entity => mockDataCollection[entity.id]);
  if (typeof args === 'object') return mockDataCollection[args.id];
  return null;
}

export function mockSave(args) {
  if (Array.isArray(args))
    return args.map((entity, idx) => ({id: idx + 1, ...entity}));
  if (typeof args === 'object') return {id: 1, ...args};
  return null;
}

export const errorNoItemDeleted = new Error('Not contains all items');

export function mockDelete(args) {
  if (Array.isArray(args) || typeof args === 'object') return args;
  return null;
}
