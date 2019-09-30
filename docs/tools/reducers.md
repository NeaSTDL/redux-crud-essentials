# Reducers <!-- omit in toc -->

On Redux terminology, the `reducers` are functions used to reduce a `state` and an `action` into a new state. For Redux CRUD tools, we have bundled together several reducers for each one created entity store.

## Table of contents <!-- omit in toc -->

- [Format](#Format)
- [Usage](#Usage)
- [List of Reducers](#List-of-Reducers)
  - [For ***entities*** store](#For-entities-store)
  - [For ***selectedIds*** store](#For-selectedIds-store)
  - [For ***network*** store](#For-network-store)

## Format

A `reducer` is a function that receives a `state` and an `action` and outputs a new modified state computed through the processing of the action:

```javascript
function reducer(state, action) {
  switch(action.type) {
    case ACTION_A:
      return applyActionA(state, action.payload)l
    default:
      return state;
  }
}
```

## Usage

During a Redux Utility Toolkit creation process, the Redux CRUD factory will return an object wrapper as shown below:

```javascript
import createReduxCrud from 'redux-crud-essentials';
const { reducers: animalReducers } = createReduxCrud({ entityName: 'animals' });
console.log(animalReducers);
// {
//   entitiesReducers,
//   selectedIdsReducers,
//   networkReducers
// }
```

These properties contain reducer functions that could then be used as they are (in a traditional Redux implementation):

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { reducers: animalReducers, actionCreators } = createReduxCrud({ entityName: 'animals' });
const { entitiesReducers } = animalReducers;
const initialState = {
  animals: {
    entities: {},
    selectedIds: [],
    network: { isFetching: false, error: null }
  }
};

const reducedState = entitiesReducers(
  initialState,
  actionCreators.create({
    id: 1,
    name: 'dog',
    isCarnivore: true
  })
);
console.log(reducedState);
// {
//   animals: {
//     entities: {
//       1: { id: 1, name: 'dog', isCarnivore: true }
//     },
//     selectedIds: [],
//     network: { isFetching: false, error: null }
//   }
// }
```
 or also combined together (which is preferred) via Redux's library `combineReducers` function:
```javascript
import createReduxCrud from 'redux-crud-essentials';
import { combineReducers } from 'redux';

const { reducers } = createReduxCrud({ entityName: 'animals' });
const {
  entitiesReducers: entities,
  selectedIdsReducers: selectedIds,
  networkReducers: network
} = reducers;

export default combineReducers({
  entities,
  selectedIds,
  network
});
```

## List of Reducers

### For ***entities*** store

| Action |           Action Type           |                                                           Description |
| :----- | :-----------------------------: | --------------------------------------------------------------------: |
| create | [`namespace`]/[`entityName`]/**CREATE** | Merges previous and new entity maps together to include new entities. |
| read   |  [`namespace`]/[`entityName`]/**READ**  | Merges previous and new entity maps together to include new entities. |
| update | [`namespace`]/[`entityName`]/**UPDATE** | Merges previous and new entity maps together to include new entities. |
| delete | [`namespace`]/[`entityName`]/**DELETE** |                       Omits passed entity IDs from actual entity map. |

### For ***selectedIds*** store

| Action |           Action Type           |                                                           Description |
| :----- | :-----------------------------: | --------------------------------------------------------------------: |
| addSelected | [`namespace`]/[`entityName`]/**ADD_SELECTED** | Merges previous and new entity ids together to include new entities. |
| removeSelected   |  [`namespace`]/[`entityName`]/**REMOVE_SELECTED**  | Omits passed entity maps from the current state. |

### For ***network*** store

| Action |           Action Type           |                                                           Description |
| :----- | :-----------------------------: | --------------------------------------------------------------------: |
| setIsFetching | [`namespace`]/[`entityName`]/**SET_IS_FETCHING** | Modifies current value for state's 'isFetching' property. |
| setError   |  [`namespace`]/[`entityName`]/**SET_ERROR**  | Modifies current value for state's 'error' property. |