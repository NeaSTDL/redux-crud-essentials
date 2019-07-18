import ACTION_TYPES from '../../constants/actionTypes';
import defaultState from '../../constants/defaultState';

export default function createNetworkReducer(prefix) {
  return {
    [`${prefix}/${ACTION_TYPES.SET_IS_FETCHING}`]: (
      state,
      {payload, meta}
    ) => ({
      ...state,
      isFetching:
        meta && meta.reset ? defaultState.network.isFetching : payload.status
    }),
    [`${prefix}/${ACTION_TYPES.SET_ERROR}`]: (state, {payload, meta}) => ({
      ...state,
      error: meta && meta.reset ? defaultState.network.error : payload.error
    })
  };
}
