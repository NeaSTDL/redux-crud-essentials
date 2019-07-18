import {createActions} from 'redux-actions';
import ACTION_TYPES from '../constants/actionTypes';
import defaultOpts from '../constants/defaultOptions';

function mapEntityArray(entities, identifier) {
  return entities.reduce((accum, entity) => {
    accum[entity[identifier]] = entity;
    return accum;
  }, {});
}

function toEntitiesMap(payload, identifier) {
  if (Array.isArray(payload)) return mapEntityArray(payload, identifier);
  if (typeof payload === 'object') return {[payload[identifier]]: payload};
  throw new Error(
    `[Redux CRUD]: It is not allowed no pass invalid/empty parameters on action creators.`
  );
}

function toEntitiesIDArray(payload, identifier) {
  if (Array.isArray(payload)) return payload.map(entity => entity[identifier]);
  if (typeof payload === 'object') return [payload[identifier]];
  throw new Error(
    `[Redux CRUD]: It is not allowed no pass invalid/empty parameters on action creators.`
  );
}

const entitiesStoreActionCreators = identifier => ({
  [ACTION_TYPES.CREATE]: payload => toEntitiesMap(payload, identifier),
  [ACTION_TYPES.READ]: payload => toEntitiesMap(payload, identifier),
  [ACTION_TYPES.UPDATE]: payload => toEntitiesMap(payload, identifier),
  [ACTION_TYPES.DELETE]: payload => toEntitiesIDArray(payload, identifier)
});

const selectedIdsStoreActionsCreators = identifier => ({
  [ACTION_TYPES.ADD_SELECTED]: [
    payload => toEntitiesIDArray(payload, identifier),
    (payload, position = 'end') => ({position})
  ],
  [ACTION_TYPES.REMOVE_SELECTED]: payload =>
    toEntitiesIDArray(payload, identifier)
});

const networkStoreActionCreators = () => ({
  [ACTION_TYPES.SET_IS_FETCHING]: [
    payload => payload,
    (payload, reset = false) => ({reset})
  ],
  [ACTION_TYPES.SET_ERROR]: [
    payload => payload,
    (payload, reset = false) => ({reset})
  ]
});

/**
 * A factory to create a set of action creator functions for a specific Redux entity.
 * @param {string} entityName A name for the entity to be used with the returned action creators.
 * @param {string} namespace An optional name for a expected namespace for the action types.
 * @param {object} options A configuration settings collection to modify the library behavior.
 * @returns {object} A set of action creator functions for a specific Redux entity.
 */
export default function actionCreatorsFor(
  entityName,
  namespace,
  options = defaultOpts
) {
  const {identifier} = options;
  const entityActionMap = {
    [entityName]: {
      ...entitiesStoreActionCreators(identifier),
      ...selectedIdsStoreActionsCreators(identifier),
      ...networkStoreActionCreators()
    }
  };
  const entityActionCreators = namespace
    ? createActions({[namespace]: entityActionMap})
    : createActions(entityActionMap);
  return namespace
    ? entityActionCreators[namespace][entityName]
    : entityActionCreators[entityName];
}
