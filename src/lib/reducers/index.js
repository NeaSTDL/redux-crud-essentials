import {handleActions} from 'redux-actions';
import defaultState from '../constants/defaultState';
import createEntityReducers from './forStore/entities';
import createSelectedIdsReducers from './forStore/selectedIds';
import createNetworkReducers from './forStore/network';

/**
 * A factory function to construct the reducer functions to manage dispatched actions.
 * @param {string} entityName A valid name for the entity to be managed.
 * @param {string} namespace A valid name for the namespace of the Redux collection.
 * @returns {object} An object with the created reducers functions.
 */
export default function reducersFor(entityName, namespace) {
  const prefix = namespace ? `${namespace}/${entityName}` : `${entityName}`;
  return {
    entitiesReducers: handleActions(
      createEntityReducers(prefix),
      defaultState.entities
    ),
    selectedIdsReducers: handleActions(
      createSelectedIdsReducers(prefix),
      defaultState.selectedIds
    ),
    networkReducers: handleActions(
      createNetworkReducers(prefix),
      defaultState.network
    )
  };
}
