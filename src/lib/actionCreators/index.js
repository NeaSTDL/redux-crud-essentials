import {createActions} from 'redux-actions';

export function actionCreatorsFor(entityName, namespace) {
  const entityActionMap = {
    [entityName]: {
      // [TODO] Las acciones deben recibir 1 o N entidades
      CREATE: payload => ({entities: {[payload.id]: payload}}),
      UPDATE: payload => ({entities: {[payload.id]: payload}}),
      DELETE: payload => payload.id
      // [TODO] Crear las acciones para ADD_LIST y REMOVE_LIST
    }
  };
  if (namespace) return createActions({[namespace]: entityActionMap});
  return createActions(entityActionMap);
}
