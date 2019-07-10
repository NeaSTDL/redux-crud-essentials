import {handleActions} from 'redux-actions';
import {merge, omit, concat, without} from 'lodash';
import ACTION_TYPES from '../constants/actionTypes';

export function mergeOntoObjectState(state, action) {
  return merge({}, state, action.payload);
}

export function omitFromObjectState(state, action) {
  if (!Array.isArray(action.payload))
    throw new Error('[RDXC]: "payload" is not an array.');
  return omit(state, action.payload);
}

export function addToArrayState(state, action) {
  if (action.meta.position === 'start') return concat(action.payload, state);
  return concat(state, action.payload);
}

export function removeFromArrayState(state, action) {
  return without(state, ...action.payload);
}

export function createEntityReducer(prefix) {
  return {
    [`${prefix}/${ACTION_TYPES.CREATE}`]: mergeOntoObjectState,
    [`${prefix}/${ACTION_TYPES.UPDATE}`]: mergeOntoObjectState,
    [`${prefix}/${ACTION_TYPES.DELETE}`]: omitFromObjectState
  };
}

export function createSelectedIdsReducer(prefix) {
  return {
    [`${prefix}/${ACTION_TYPES.ADD_SELECTED}`]: addToArrayState,
    [`${prefix}/${ACTION_TYPES.REMOVE_SELECTED}`]: removeFromArrayState
  };
}

export function reducersFor(entityName, namespace) {
  const prefix = namespace ? `${namespace}/${entityName}` : `${entityName}`;
  return {
    entitiesReducers: handleActions(createEntityReducer(prefix), {}),
    selectedIdsReducers: handleActions(createSelectedIdsReducer(prefix), [])
  };
}
