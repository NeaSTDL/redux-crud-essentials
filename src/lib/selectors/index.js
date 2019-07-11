import defaultOpts from '../constants/defaultOptions';
import createAllSelector from './operations/all';
import createByIdentifierSelector from './operations/byIdentifier';
import createAllSelectedIdsSelector from './operations/allSelected';

export function selectorsFor(entityName, opts = defaultOpts) {
  return {
    all: createAllSelector(entityName, opts),
    allSelected: createAllSelectedIdsSelector(entityName, opts),
    byIdentifier: createByIdentifierSelector(entityName, opts)
  };
}
