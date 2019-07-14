import defaultOptions from '../constants/defaultOptions';
import createAllSelector from './operations/all';
import createByIdentifierSelector from './operations/byIdentifier';
import createAllSelectedIdsSelector from './operations/allSelected';

/**
 * A factory function to create an object with basic selector operations for the Redux CRUD.
 * @param {string} entityName A valid name for the entity being created.
 * @param {object} options A configuration settings object provided by the user to modify the
 * expected behavior.
 * @returns {object} A map of selector operations.
 */
export function selectorsFor(entityName, options = defaultOptions) {
  return {
    all: createAllSelector(entityName, options),
    allSelected: createAllSelectedIdsSelector(entityName, options),
    byIdentifier: createByIdentifierSelector(entityName, options)
  };
}
