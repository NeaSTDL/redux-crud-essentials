export default function makeReadThunk(actionCreators) {
  const {setError, setIsFetching, read} = actionCreators;
  return fnApiRead => {
    return (...readParams) => async dispatch => {
      dispatch(setError(null, true));
      dispatch(setIsFetching(true));
      try {
        const fetchedEntities = await fnApiRead(...readParams);
        dispatch(read(fetchedEntities));
        if (fetchedEntities) return fetchedEntities;
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
