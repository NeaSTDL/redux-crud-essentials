import {handleActions} from 'redux-actions';
import {merge, omit} from 'lodash';
import defaultState from './defaultState';

export function setOperation(state, {payload}) {
  return merge(state, payload);
}

export function unsetOperation(state, {payload}) {
  if (!Array.isArray(payload))
    throw new Error('[RDXC]: "payload" is not an array.');
  return omit(state, payload.map(entityId => `entities.${entityId}`));
}

export function reducersFor(entityName, namespace) {
  const prefix = namespace ? `${namespace}/${entityName}` : `${entityName}`;
  const reducerMap = {
    [`${prefix}/CREATE`]: setOperation,
    [`${prefix}/UPDATE`]: setOperation,
    [`${prefix}/DELETE`]: unsetOperation
  };
  return handleActions(reducerMap, defaultState);
}

// [TODO] Implementar logica para lista de visibilidad
