import {actionCreatorsFor} from './lib/actionCreators';
import {selectorsFor} from './lib/selectors';
import {reducersFor} from './lib/reducers';
import {actionTypesFor} from './lib/actionTypes';
import defaultOpts from './lib/constants/defaultOptions';

/**
 * A wrapper for the Redux utilities.
 * @param {object} settings A configuration settings object provided by the user.
 * @returns {object} An object with the created Redux Utilities.
 */
export function createReduxUtils(settings) {
  const {namespace, entityName, ...opts} = settings;
  return {
    actionTypes: actionTypesFor(entityName, namespace),
    actionCreators: actionCreatorsFor(entityName, namespace, opts),
    reducers: reducersFor(entityName, namespace),
    selectors: selectorsFor(entityName, opts)
  };
}

/**
 * A factory function to create a new Redux Manager instance.
 * @param {string=} namespace A valid name for the Redux namespace.
 * @param {object} managerOpts A configuration object containing user desired settings.
 * @returns {object} A Redux Manager object.
 */
export function createManager(namespace, managerOpts = {}) {
  return (entityName, entityOpts = defaultOpts) => {
    if (!entityName)
      throw new Error(
        "[ReduxCrud] You must pass 'entityName' as a valid non-empty string!"
      );
    return createReduxUtils({
      entityName,
      namespace,
      ...managerOpts,
      ...entityOpts
    });
  };
}

/**
 * A factory function to construct a Redux Utility Kit.
 * @param {object} options An object containing settings parameters for the Manager instance.
 * @returns {object} An instance of a Redux Utilities object.
 */
export function createReduxUtilityKit(options) {
  const {entityName} = options;
  if (!entityName || typeof entityName !== 'string' || entityName.length === 0)
    throw new Error(
      'Invalid passed value for parameter "entityName" on Redux CRUD essentials function call.'
    );
  return createReduxUtils(options);
}

/**
 * Factory function defined to construct a Redux Manager or a Utilities Toolkit depending on the
 * given argument:
 *  - If presented a string, it will return a Redux Manager function instance.
 *  - If presented an object:
 *    - Will return a Redux Manager function if it contains a valid 'entityName' property.
 *    - Will return a Redux Utility Toolkit if otherwise.
 * @param {(string|object)} args An argument to pass configuration settings for the ReduxCrud.
 * @returns {function|object} Either a Redux Manager or a Redux Utilities Toolkit instances.
 */
export default function createReduxCrud(args) {
  if (args === undefined || (typeof args === 'string' && args.length > 0))
    return createManager(args, {...defaultOpts});
  if (!Array.isArray(args) && typeof args === 'object')
    if (args.entityName) return createReduxUtilityKit(args);
    else return createManager(args.namespace, {...defaultOpts, ...args});
  throw new Error(
    'Invalid argument type provided for Redux CRUD essentials function call.'
  );
}
