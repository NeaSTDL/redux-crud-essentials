import {handleActions} from 'redux-actions';
import {merge, omit} from 'lodash';
import defaultState from './defaultState';

export function setOperation(state, {payload}) {
  return merge(state, payload);
}

export function unsetOperation(state, {payload}) {
  return omit(state, [`entities.${payload}`]);
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
