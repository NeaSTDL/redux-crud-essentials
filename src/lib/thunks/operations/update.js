export default function makeUpdateThunk(actionCreators) {
  const {setError, setIsFetching, update} = actionCreators;
  return fnApiUpdate => {
    return (...updateParams) => async dispatch => {
      dispatch(setError(null, true));
      dispatch(setIsFetching(true));
      try {
        const updatedEntities = await fnApiUpdate(...updateParams);
        dispatch(update(updatedEntities));
        if (updatedEntities) return updatedEntities;
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
