import {createSelector} from 'reselect';

/**
 * A function that creates a selector instance for an specific entity name.
 * @param {string} entityName A name for the given entity type to be selected from the store.
 * @returns {function} A function that will receive the state as a parameter to return the
 * selected entities.
 */
export function createAllSelectedIdsSelectorFor(entityName) {
  return state =>
    state[entityName].selectedIds.map(
      selectedId => state[entityName].entities[selectedId]
    );
}

/**
 * A function that creates a selector instance to retrieve all values for an specific entity name.
 * @param {string} entityName A name for the given entity type to be selected from the store.
 * @returns {function} A memoized-improved selector function to retrieve all entities in an Array
 * format.
 */
export default function AllSelected(entityName) {
  return createSelector(
    [createAllSelectedIdsSelectorFor(entityName)],
    entities => entities
  );
}
