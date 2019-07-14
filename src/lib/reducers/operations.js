import {merge, omit, concat, without} from 'lodash';

export function mergeOntoObjectState(state, action) {
  return merge({}, state, action.payload);
}

export function omitFromObjectState(state, action) {
  if (!Array.isArray(action.payload))
    throw new Error('[RDXC]: "payload" is not an array.');
  return omit(state, action.payload);
}

export function addToArrayState(state, action) {
  if (action.meta && action.meta.position === 'start')
    return concat(action.payload, state);
  return concat(state, action.payload);
}

export function removeFromArrayState(state, action) {
  return without(state, ...action.payload);
}
