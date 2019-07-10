import createAllSelector from './operations/all';
import createByIdentifierSelector from './operations/byIdentifier';
import createAllSelectedIdsSelector from './operations/allSelected';

const defaultOpts = {
  identifierName: 'id'
};

export function selectorsFor(entityType, opts = defaultOpts) {
  return {
    all: createAllSelector(entityType, opts),
    allSelected: createAllSelectedIdsSelector(entityType, opts),
    byIdentifier: createByIdentifierSelector(entityType, opts)
  };
}
