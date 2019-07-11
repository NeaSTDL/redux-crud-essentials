import {createSelector} from 'reselect';
import defaultOptions from '../../constants/defaultOptions';

/**
 * A function that will create a primitve selector instance for retrieving by ID an entity.
 * @param {string} entityName A name for the entity type to be selected.
 * @param {string} identifier A name for the identifier property in the collection.
 * @returns {function} A primitive selector instance to be used by reselect.
 */
export function createByIdentifierSelectorFor(entityName, identifier) {
  return (state, props) => state[entityName].entities[props[identifier]];
}

/**
 * A function that creates a selector instance to retrieve values by ID for an specific entity name.
 * @param {string} entityName A name for the entity type to be selected.
 * @param {object} options A configuration object to modify the selector behavior.
 * @returns {function} A memoized-improved selector function to be used for store values selection.
 */
export default function byIdentifier(entityName, options = defaultOptions) {
  const {identifier} = options;
  return () =>
    createSelector(
      [createByIdentifierSelectorFor(entityName, identifier)],
      entity => entity
    );
}
