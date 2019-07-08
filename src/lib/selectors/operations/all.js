import {createSelector} from 'reselect';

/**
 * A function that creates a selector instance for an specific entity name.
 * @param {string} entityName A name for the given entity type to be selected from the store.
 * @returns {function} A function that will receive the state as a parameter to return the
 * selected entities.
 */
export function createAllSelectorFor(entityName) {
  return state => state[entityName].entities;
}

/**
 * A function that creates a selector instance to retrieve all values for an specific entity name.
 * @param {string} entityName A name for the given entity type to be selected from the store.
 * @returns {function} A memoized-improved selector function to retrieve all entities in an Array
 * format.
 */

// [TODO] Debe seleccionar ALL en base a los IDs en la lista
export default function All(entityName) {
  return createSelector(
    [createAllSelectorFor(entityName)],
    entities => Object.keys(entities).map(entity => entities[entity])
  );
}
