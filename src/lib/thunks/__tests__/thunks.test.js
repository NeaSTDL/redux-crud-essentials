import {
  apiCreate,
  errorCreate,
  apiRead,
  errorRead,
  apiUpdate,
  errorUpdate,
  apiDelete
} from '../mocks/api';
import thunksFor from '..';

const mockDispatch = jest.fn();
const {
  makeCreateThunk,
  makeReadThunk,
  makeUpdateThunk,
  makeDeleteThunk
} = thunksFor('fruits', null);

describe('The "thunksFor" factory', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });
  describe('returns a "makeCreateThunk" function that constructs a basic CREATE thunk', () => {
    const createFruitThunk = makeCreateThunk(apiCreate);
    test('that performs a call to an API and returns the response on success.', async () => {
      try {
        const newFruit = await createFruitThunk(
          {name: 'pineapple', color: 'yellow'},
          true
        )(mockDispatch);
        expect(newFruit).toEqual({id: 1, name: 'pineapple', color: 'yellow'});
        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenNthCalledWith(3, {
          type: 'fruits/CREATE',
          payload: {1: {id: 1, name: 'pineapple', color: 'yellow'}}
        });
      } catch (error) {
        throw error;
      }
    });
    test('that calls to an API and throws an error on reject.', async () => {
      expect.assertions(3);
      try {
        return await createFruitThunk(
          {name: 'pineapple', color: 'yellow'},
          false
        )(mockDispatch);
      } catch (error) {
        expect(error).toBe(errorCreate);
        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenNthCalledWith(3, {
          type: 'fruits/SET_ERROR',
          meta: {
            reset: false
          },
          payload: {
            error: errorCreate
          }
        });
      }
    });
  });
  describe('returns a "makeReadThunk" function that constructs a basic READ thunk', () => {
    const readFruitThunk = makeReadThunk(apiRead);
    test('that performs a call to an API and returns the response on success.', async () => {
      try {
        const newFruit = await readFruitThunk({id: 1}, true)(mockDispatch);
        expect(newFruit).toEqual({id: 1, name: 'pineapple', color: 'yellow'});
        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenNthCalledWith(3, {
          type: 'fruits/READ',
          payload: {1: {id: 1, name: 'pineapple', color: 'yellow'}}
        });
      } catch (error) {
        throw error;
      }
    });
    test('that calls to an API and throws an error on reject.', async () => {
      expect.assertions(3);
      try {
        return await readFruitThunk({id: 1}, false)(mockDispatch);
      } catch (error) {
        expect(error).toBe(errorRead);
        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenNthCalledWith(3, {
          type: 'fruits/SET_ERROR',
          meta: {
            reset: false
          },
          payload: {
            error: errorRead
          }
        });
      }
    });
  });
  describe('returns a "makeUpdateThunk" function that constructs a basic UPDATE thunk', () => {
    const updateThunk = makeUpdateThunk(apiUpdate);
    test('that performs a call to an API and returns the response on success.', async () => {
      try {
        const updatedFruit = await updateThunk({id: 1, flavor: 'acid'}, true)(
          mockDispatch
        );
        expect(updatedFruit).toEqual({
          id: 1,
          name: 'pineapple',
          color: 'yellow',
          flavor: 'acid'
        });
        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenNthCalledWith(3, {
          type: 'fruits/UPDATE',
          payload: {
            1: {id: 1, name: 'pineapple', color: 'yellow', flavor: 'acid'}
          }
        });
      } catch (error) {
        throw error;
      }
    });
    test('that calls to an API and throws an error on reject.', async () => {
      expect.assertions(3);
      try {
        return await updateThunk({id: 1, flavor: 'acid'}, false)(mockDispatch);
      } catch (error) {
        expect(error).toBe(errorUpdate);
        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenNthCalledWith(3, {
          type: 'fruits/SET_ERROR',
          meta: {
            reset: false
          },
          payload: {
            error: errorUpdate
          }
        });
      }
    });
  });
  describe('return a "makeDeleteThunk" function that constructs a basic DELETE thunk', () => {
    const deleteThunk = makeDeleteThunk(apiDelete);
    test('that performs a call to an API and returns the response on success.', async () => {
      try {
        const deletedFruit = await deleteThunk({id: 1}, true)(mockDispatch);
        expect(deletedFruit).toEqual(true);
        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenNthCalledWith(3, {
          type: 'fruits/DELETE',
          payload: [1]
        });
      } catch (error) {
        throw error;
      }
    });
  });
});
