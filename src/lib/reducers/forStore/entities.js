import {mergeOntoObjectState, omitFromObjectState} from '../operations';
import ACTION_TYPES from '../../constants/actionTypes';

export default function createEntityReducer(prefix) {
  return {
    [`${prefix}/${ACTION_TYPES.CREATE}`]: mergeOntoObjectState,
    [`${prefix}/${ACTION_TYPES.UPDATE}`]: mergeOntoObjectState,
    [`${prefix}/${ACTION_TYPES.DELETE}`]: omitFromObjectState
  };
}
