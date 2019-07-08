import {actionCreatorsFor} from './lib/actionCreators';
import {selectorsFor} from './lib/selectors';
import {reducersFor} from './lib/reducers';

export function createManager(namespace) {
  return entityName => {
    if (!entityName)
      throw new Error(
        "[ReduxCrud] You must pass 'entityName' as a valid non-empty string!"
      );
    return {
      actionCreators: actionCreatorsFor(entityName, namespace),
      reducers: reducersFor(entityName, namespace),
      selectors: selectorsFor(entityName)
    };
  };
}

export function createReduxUtilityKit(opts) {
  const {namespace, entityName} = opts;
  if (!entityName || typeof entityName !== 'string' || entityName.length === 0)
    throw new Error(
      'Invalid passed value for parameter "entityName" on Redux CRUD essentials function call.'
    );
  return {
    actionCreators: actionCreatorsFor(entityName, namespace),
    reducers: reducersFor(entityName, namespace),
    selectors: selectorsFor(entityName)
  };
}

export default function createReduxCrud(args) {
  if (args === undefined || (typeof args === 'string' && args.length > 0))
    return createManager(args);
  if (typeof args === 'object') return createReduxUtilityKit(args);
  throw new Error(
    'Invalid argument type provided for Redux CRUD essentials function call.'
  );
}
