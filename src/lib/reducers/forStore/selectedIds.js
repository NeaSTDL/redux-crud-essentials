import {addToArrayState, removeFromArrayState} from '../operations';
import ACTION_TYPES from '../../constants/actionTypes';

export default function createSelectedIdsReducer(prefix) {
  return {
    [`${prefix}/${ACTION_TYPES.ADD_SELECTED}`]: addToArrayState,
    [`${prefix}/${ACTION_TYPES.REMOVE_SELECTED}`]: removeFromArrayState
  };
}
