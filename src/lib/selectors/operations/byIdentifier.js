import {createSelector} from 'reselect';

/**
 * A function that will create a primitve selector instance for retrieving by ID an entity.
 * @param {string} entityName A name for the entity type to be selected.
 * @param {string} identifierName A name for the identifier property in the collection.
 * @returns {function} A primitive selector instance to be used by reselect.
 */
export function createByIdentifierSelectorFor(entityName, identifierName) {
  return (state, props) => state[entityName].entities[props[identifierName]];
}

/**
 * A function that creates a selector instance to retrieve values by ID for an specific entity name.
 * @param {string} entityName A name for the entity type to be selected.
 * @param {object} options A configuration object to modify the selector behavior.
 * @returns {function} A memoized-improved selector function to be used for store values selection.
 */
// [TODO] Construir una fabrica para este selector
export default function byIdentifier(entityName, options) {
  const {identifierName} = options;
  return createSelector(
    [createByIdentifierSelectorFor(entityName, identifierName)],
    entity => entity
  );
}
