export default function makeCreateThunk(actionCreators) {
  const {setError, setIsFetching, create} = actionCreators;
  return fnApiCreate => {
    return (...createParams) => async dispatch => {
      dispatch(setError(null, true));
      dispatch(setIsFetching(true));
      try {
        const newEntities = await fnApiCreate(...createParams);
        dispatch(create(newEntities));
        if (newEntities) return newEntities;
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
