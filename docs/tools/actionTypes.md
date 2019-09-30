# Action Types <!-- omit in toc -->

By Redux general conventions, the action types are a set of pre-defined constants used by the `action creators` and `reducers` to keep track of each specific kind of action. In this Redux schema, we have set our own conventions for the actions needed to manage a basic CRUD.

## Table of contents <!-- omit in toc -->

- [Usage](#Usage)
- [List of Action Types](#List-of-Action-Types)
  - [For ***entities*** store](#For-entities-store)
  - [For ***selectedIds*** store](#For-selectedIds-store)
  - [For ***network*** store](#For-network-store)

## Usage

```javascript
import createReduxCrud from 'redux-crud-essentials';
const { actionTypes: animalActionTypes } = createReduxCrud({ entityName: 'animals' });
```

If desired, you can use the actions types to write your own reducers and/or action creators (instead of using the already built ones) and fit them for your specific purpose:

```javascript
// Construct your own customized action creator for any of the
// basic CRUD actions:
function createAnimalActionCreator(payload) {
  return {
    type: animalActionTypes.CREATE,
    payload
  }
}
// ...
```

```javascript
// Construct your own reducer functions for any of the
// basic CRUD actions:
function animalsReducer(state, action) {
  switch(action.type) {
    case animalActionTypes.CREATE:
      return addToState(state, action.payload);
    // ...
    default:
      return state;
  }
}
// ...
```

Normally, it wouldn't be necessary to construct your own reducers/actionCreators, but nonetheless all the actions are available to be used.

## List of Action Types

Here we list all the unique action types used by the Redux CRUD factory, classified by their target store:

### For ***entities*** store

| Action name |              Description              |
| :---------- | :-----------------------------------: |
| CREATE      |   Adds into the store a new entity.   |
| READ        | Adds into the store fetched entities. |
| UPDATE      |     Modifies an existing entity.      |
| DELETE      |   Removes from the store an entity.   |

### For ***selectedIds*** store

| Action name     |                       Description                       |
| :-------------- | :-----------------------------------------------------: |
| ADD_SELECTED    | Adds one or more entities ID into the selectedIds list. |
| REMOVE_SELECTED | Removes one or more entities from the selectedIds list. |

### For ***network*** store

| Action name     |                               Description                                |
| :-------------- | :----------------------------------------------------------------------: |
| SET_IS_FETCHING |           Sets the current network state for an entity store.            |
| SET_ERROR       | Sets an error state received from a network process for an entity store. |