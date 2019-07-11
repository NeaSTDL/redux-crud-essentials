import {actionCreatorsFor} from './lib/actionCreators';
import {selectorsFor} from './lib/selectors';
import {reducersFor} from './lib/reducers';
import {actionTypesFor} from './lib/actionTypes';
import defaultOpts from './lib/constants/defaultOptions';

export function createReduxUtils({namespace, entityName, ...opts}) {
  return {
    actionTypes: actionTypesFor(entityName, namespace),
    actionCreators: actionCreatorsFor(entityName, namespace, opts),
    reducers: reducersFor(entityName, namespace),
    selectors: selectorsFor(entityName, opts)
  };
}

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

export function createReduxUtilityKit(opts) {
  const {entityName} = opts;
  if (!entityName || typeof entityName !== 'string' || entityName.length === 0)
    throw new Error(
      'Invalid passed value for parameter "entityName" on Redux CRUD essentials function call.'
    );
  return createReduxUtils(opts);
}

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
