import {createActions} from 'redux-actions';

function mapEntityArray(entities) {
  return entities.reduce((accum, entity) => {
    accum[entity.id] = entity;
    return accum;
  }, {});
}

function toEntitiesMap(payload) {
  if (Array.isArray(payload)) return {entities: mapEntityArray(payload)};
  if (typeof payload === 'object') return {entities: {[payload.id]: payload}};
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

export function actionCreatorsFor(entityName, namespace) {
  const entityActionMap = {
    [entityName]: {
      CREATE: payload => toEntitiesMap(payload),
      UPDATE: payload => toEntitiesMap(payload),
      DELETE: payload => toEntitiesIDArray(payload)
      // [TODO] Crear las acciones para ADD_LIST y REMOVE_LIST
    }
  };
  if (namespace) return createActions({[namespace]: entityActionMap});
  return createActions(entityActionMap);
}
