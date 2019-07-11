import ACTION_TYPES from '../constants/actionTypes';

/**
 * A function that creates an action type set for an specific entity/namespace pair.
 * @param {string} entityName A name for the new identity being constructed.
 * @param {string} namespace A name for the construction's namespace.
 * @returns {object} An object containing the constructed set of action types.
 */
export function actionTypesFor(entityName, namespace) {
  const prefix = namespace ? `${namespace}/${entityName}` : entityName;
  return Object.keys(ACTION_TYPES).reduce((actions, ACTION_TYPE) => {
    actions[ACTION_TYPE] = `${prefix}/${ACTION_TYPE}`;
    return actions;
  }, {});
}
