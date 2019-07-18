import actionCreatorsFor from '../actionCreators';
import makeCreateThunk from './operations/create';
import makeReadThunk from './operations/read';
import makeUpdateThunk from './operations/update';
import makeDeleteThunk from './operations/delete';

export default function thunksFor(entityName, namespace, options) {
  const actionCreatorsSet = actionCreatorsFor(entityName, namespace, options);
  return {
    makeCreateThunk: makeCreateThunk(actionCreatorsSet),
    makeReadThunk: makeReadThunk(actionCreatorsSet),
    makeUpdateThunk: makeUpdateThunk(actionCreatorsSet),
    makeDeleteThunk: makeDeleteThunk(actionCreatorsSet)
  };
}
