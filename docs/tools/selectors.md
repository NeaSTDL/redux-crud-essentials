# Selectors <!-- omit in toc -->

On Redux terminology, the `selectors` are functions used to query/retrieve specific segments of a Redux State. For Redux CRUD tools, we will create several selectors for each created entity store.

## Table of contents <!-- omit in toc -->

- [Format](#Format)
- [Usage](#Usage)
- [List of Selectors](#List-of-Selectors)
  - [all()](#all)
  - [allSelected()](#allSelected)
  - [byIdentifier()](#byIdentifier)

## Format

A `selector` is a function that receives a Redux State instance and returns a portion. For example:

```javascript
function selectEntities(state) {
  return state.entities;
}
```

In our Redux CRUD wrapper, you can find a basic collection of selector functions, as shown below:

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { selectors } = createReduxCrud({ entityName: 'animals' });
const { allSelected, all, byIdentifier } = selectors;
```

## Usage

To use most of the `selector` functions, you'll simply need to call them by passing the state, like this:

```javascript
import createReduxCrud from 'redux-crud-essentials';

const state = {
  animals: {
    entities: {
      1: { name: 'lion', isCarnivore: true },
      2: { name: 'giraffe', isCarnivore: false }
    },
    selectedIds: [1],
    network: {
      isFetching: false,
      error: null
    }
  }
}

const { selectors } = createReduxCrud({ entityName: 'animals' });
const { allSelected, all, byIdentifier } = selectors;

const selectedAnimals = allSelected(state);
console.log(selectedAnimals);
// [{ id: 1, name: 'lion', isCarnivore: true }]
```

On a more Redux-like approach, it is preferred to use selectors on the `mapStateToProps` function, like this:

```javascript
import React from 'react';
import { connect } from 'react-redux';
import createReduxCrud from 'redux-crud-essentials';

const { selectors } = createReduxCrud({ entityName: 'animals' });
const { allSelected } = selectors;

const AnimalList = props => (
  <React.Fragment>
    { props.selectedAnimals.map(animal => <p>{animal.name}</p>) }
  </React.Fragment>
);

// Use your selectors in the mapStateToProps function
const mapStateToProps = (state, props) => ({
  selectedAnimals: allSelected(state);
})

export default connect(mapStateToProps, null)(AnimalList);
```

## List of Selectors

### all()

This selector gets all the entity items in the store:

```javascript
import createReduxCrud from 'redux-crud-essentials';

const state = {
  animals: {
    entities: {
      1: { id: 1, name: 'lion', isCarnivore: true },
      2: { id: 2, name: 'giraffe', isCarnivore: false }
    },
    selectedIds: [1],
    network: {
      isFetching: false,
      error: null
    }
  }
}

const { selectors } = createReduxCrud({ entityName: 'animals' });
const { all } = selectors;

const allAnimals = all(state);
console.log(allAnimals);
// [
//   { id: 1, name: 'lion', isCarnivore: true },
//   { id: 2, name: 'giraffe', isCarnivore: false }
// ]
```

### allSelected()

This selector gets all the items with their ID listed in the 'selectedIds' store:

```javascript
import createReduxCrud from 'redux-crud-essentials';

const state = {
  animals: {
    entities: {
      1: { id: 1, name: 'lion', isCarnivore: true },
      2: { id: 2, name: 'giraffe', isCarnivore: false }
    },
    selectedIds: [1],
    network: {
      isFetching: false,
      error: null
    }
  }
}

const { selectors } = createReduxCrud({ entityName: 'animals' });
const { allSelected } = selectors;

const allSelectedAnimals = allSelected(state);
console.log(allSelectedAnimals);
// [
//   { id: 1, name: 'lion', isCarnivore: true }
// ]
```

### byIdentifier()

This selector gets an specific item from the store's entities by an identifier sent via props.


This specific selector works as a factory due to the nature of its implementation with the 'reselect' library. So, in order to us this selector, it will be needed to create a 'byIdentifier' instance first, and then, perform the select operation as shown below: 

```javascript
import createReduxCrud from 'redux-crud-essentials';

const state = {
  animals: {
    entities: {
      1: { id: 1, name: 'lion', isCarnivore: true },
      2: { id: 2, name: 'giraffe', isCarnivore: false }
    },
    selectedIds: [1],
    network: {
      isFetching: false,
      error: null
    }
  }
}

const { selectors } = createReduxCrud({ entityName: 'animals' });
const { byIdentifier } = selectors;
const selectAnimalByID = byIdentifier();

const allSelectedAnimals = selectAnimalByID(state, { id: 1 });
console.log(allSelectedAnimals);
// { id: 1, name: 'lion', isCarnivore: true }
```
