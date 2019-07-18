export default function makeDestroyThunk(actionCreators) {
  const {setError, setIsFetching, delete: destroy} = actionCreators;
  return fnApiDestroy => {
    return (...destroyParams) => async dispatch => {
      dispatch(setError(null, true));
      dispatch(setIsFetching(true));
      try {
        const destroyedEntities = await fnApiDestroy(...destroyParams);
        if (destroyedEntities) {
          dispatch(destroy(destroyedEntities));
          return true;
        }
      } catch (error) {
        dispatch(setError({error}));
        throw error;
      } finally {
        dispatch(setIsFetching(false));
      }

      return null;
    };
  };
}
