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

export function actionCreatorsFor(
  entityName,
  namespace,
  options = defaultOpts
) {
  const {identifier} = options;
  const entityActionMap = {
    [entityName]: {
      ...entitiesStoreActionCreators(identifier),
      ...selectedIdsStoreActionsCreators(identifier)
    }
  };
  if (namespace) return createActions({[namespace]: entityActionMap});
  return createActions(entityActionMap);
}
