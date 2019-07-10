import {createActions} from 'redux-actions';
import ACTION_TYPES from '../constants/actionTypes';

function mapEntityArray(entities) {
  return entities.reduce((accum, entity) => {
    accum[entity.id] = entity;
    return accum;
  }, {});
}

function toEntitiesMap(payload) {
  if (Array.isArray(payload)) return mapEntityArray(payload);
  if (typeof payload === 'object') return {[payload.id]: payload};
  throw new Error(
    `[Redux CRUD]: It is not allowed no pass invalid/empty parameters on action creators.`
  );
}

function toEntitiesIDArray(payload) {
  if (Array.isArray(payload)) return payload.map(entity => entity.id);
  if (typeof payload === 'object') return [payload.id];
  throw new Error(
    `[Redux CRUD]: It is not allowed no pass invalid/empty parameters on action creators.`
  );
}

const entitiesStoreActionCreators = {
  [ACTION_TYPES.CREATE]: payload => toEntitiesMap(payload),
  [ACTION_TYPES.UPDATE]: payload => toEntitiesMap(payload),
  [ACTION_TYPES.DELETE]: payload => toEntitiesIDArray(payload)
};

const selectedIdsStoreActionsCreators = {
  [ACTION_TYPES.ADD_SELECTED]: [
    payload => toEntitiesIDArray(payload),
    (payload, position = 'end') => ({position})
  ],
  [ACTION_TYPES.REMOVE_SELECTED]: payload => toEntitiesIDArray(payload)
};

export function actionCreatorsFor(entityName, namespace) {
  const entityActionMap = {
    [entityName]: {
      ...entitiesStoreActionCreators,
      ...selectedIdsStoreActionsCreators
    }
  };
  if (namespace) return createActions({[namespace]: entityActionMap});
  return createActions(entityActionMap);
}
