import createAllSelector from './operations/all';
import createByIdentifierSelector from './operations/byIdentifier';

const defaultOpts = {
  identifierName: 'id'
};

export function selectorsFor(entityType, opts = defaultOpts) {
  return {
    all: createAllSelector(entityType, opts),
    byIdentifier: createByIdentifierSelector(entityType, opts)
  };
}
