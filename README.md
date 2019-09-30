# Redux CRUD <!-- omit in toc -->
A specialized functional factory to construct elemental CRUD operation's facilities for Redux implementations.

## Motivation <!-- omit in toc -->
As most of Redux CRUD implementations created nowadays tend to follow certain specific conventions, this library looks forward to wrap most of the boilerplate code generally written into easy and ready-to-use factories to add into your project.

## Table of contents <!-- omit in toc -->
- [Code style](#Code-style)
- [Features](#Features)
- [Basic usage](#Basic-usage)
  - [Redux Manager Creator](#Redux-Manager-Creator)
  - [Redux Utility Toolkit Factory](#Redux-Utility-Toolkit-Factory)
- [API Reference](#API-Reference)
  - [Redux CRUD Factory](#Redux-CRUD-Factory)
  - [Redux Manager Instance](#Redux-Manager-Instance)
  - [Redux Utility Toolkit](#Redux-Utility-Toolkit)
    - [Action Types](#Action-Types)
    - [Action Creators](#Action-Creators)
    - [Reducers](#Reducers)
    - [Selectors](#Selectors)
    - [Thunks](#Thunks)
- [Contribute](#Contribute)
- [Credits](#Credits)
- [License](#License)

## Code style
This project uses xo.js to follow general accepted conventions on code writing. For more information, look on the official [XO.js repository site](https://github.com/xojs/xo).

## Features
* Compliance with basic Redux conventions
* Easy-to-use
* Flexible
* Configurable

## Basic usage
To begin with, you will need to import the package:

```javascript
import createReduxCrud from 'redux-crud-essentials';
```

This will give you access to the `createReduxCrud` factory which, for ease of use and flexibility, has been written to be used in two different ways:
* As a [Redux Manager Creator](#Redux-Manager-Creator).
* As a [Redux Utility Toolkit Factory](#Redux-Utility-Toolkit-Factory).

### Redux Manager Creator
As the most simple scenario, we use our main factory function to create a plain Redux Manager instance via a simple call:

```javascript
// Create a Redux Manager
const reduxManager = createReduxCrud();
```
The Redux Manager consists of a secondary factory function that can create different Redux Utility Toolkits on demand:

```javascript
// The Redux Manager can be used to create utilities for a Redux 'animals' store
const animalsReduxUtilities = reduxManager('animals');
const plantsReduxUtilities = reduxManager('plants');
```

Each of the now created Redux Utilities objects will contain the tools to construct your Redux Store architecture:

```javascript
// Each Redux Utilities object will contain tools as:
const { reducers, actionCreators, actionTypes, selectors, thunks } = animalsReduxUtilities;
```

As for how to use the tools, please refer to [Redux Utilities Toolkit] on the API references.

### Redux Utility Toolkit Factory
As other approach to use the main core factory, it is also possible to pass an `options` object onto it to automatically create a Redux Utilities object. This type of usage is to be referred as a `Redux Utility Toolkit Factory`:

```javascript
import createReduxCrud from 'redux-crud-essentials';

// Pass an options object with an 'entityName' property:
const animalsReduxUtilities = createReduxCrud({ entityName: 'animals' });
const {
  reducers,
  actionTypes,
  actionCreators,
  selectors,
  thunks
} = animalsReduxUtilities;
```

This method is quicker than the Redux Manager's way to setup, but creating a manager can also present useful on its own. For more information on this, please refer the examples.

## API Reference

### Redux CRUD Factory

* **createReduxCrud**(*params*)

A single factory function exported by default at the moment of import. This function will return different constructions depending on how parameters are passed onto it:

| Argument |   Type   |                                                                              Description                                                                               |                             Returns |
| :------- | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------------------------: |
| *params* | `string` |                                     This will create a Redux Manager instance using the passed `string` value as the `entityName`.                                     |              Redux Manager instance |
|          | `object` | This can either create a `Redux Utility Toolkit` or a `Redux Manager`, <br>if given or not respectively an `entityName` property with a non-falsy `string` type value. | Redux Utility Toolkit/Redux Manager |

### Redux Manager Instance

* **reduxManager**(*entityName* *[, options]*)

A secondary factory function used to create one (or more) Redux Utility Toolkits by receiving a `string` value via the `entityName` parameter and an optional `options` object that would contain settings for the specific created toolkit.

| Argument     |   Type   |                                                                               Description |
| :----------- | :------: | ----------------------------------------------------------------------------------------: |
| *entityName* | `string` |                                      Name of the entity type for the managed Redux store. |
| *options*    | `object` | An *OPTIONAL* object containing settings to be used to modify the tools expected behavior. |

### Redux Utility Toolkit

An object returned by either a Redux Manager or a Redux Utility Toolkit Factory that contains constructed tools to be used to create the Redux CRUD scheme. Here are listed the different types of tools:
* [Action Types](#Action-Types)
* [Action Creators](#Action-Creators)
* [Reducers](#Reducers)
* [Thunks](#Thunks)
* [Selectors](#Selectors)

#### Action Types

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionTypes } = createReduxCrud({ entityName: 'fruits' });
console.log(actionTypes.CREATE) // fruits/CREATE
```

An object containing the action types constants to be used by `reducers` and `action creators`. For more information into the chosen convention for these and their possible uses, refer to the [action types guide](./docs/tools/actionTypes.md).

#### Action Creators

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators } = createReduxCrud({ entityName: 'fruits' });
console.log(actionCreators.create({ name: 'apple', color: 'red' }));
// {
//   type: fruits/CREATE,
//   payload: { name: 'apple', color: 'red' }
// }
```

An object containing action creator functions to easily construct actions for Redux dispatcher. For more information into the chosen convention for these and their usage, refer to the [action creators guide](./docs/tools/actionCreators.md).

#### Reducers

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { reducers } = createReduxCrud({ entityName: 'fruits' });
const { entitiesReducers } = reducers;
const newState = entitiesReducers({}, {
  type: 'fruits/CREATE',
  payload: {1: {id: 1, name: 'banana', color: 'yellow'}}
});
console.log(newState);
// { 1: {id: 1, name: 'banana', color: 'yellow'} }
```

An object containing reducers for each segment of an Entity's Redux Store schema. For more information into the chosen convention for these and their usage, refer to the [reducers guide](./docs/tools/reducers.md).

#### Selectors

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { selectors } = createReduxCrud({ entityName: 'fruits' });
const { allSelected, byIdentifier } = selectors;
const state = {
  fruits: {
    entities: {
      1: { id: 1, name: 'apple', color: 'red' },
      2: { id: 2, name: 'pineapple', color: 'yellow' },
      3: { id: 3, name: 'orange', color: 'orange' }
    },
    selectedIds: [1],
    network: {
      isFetching: false,
      error: null
    }
  }
};

const createdByIdentifierSelector = byIdentifier();
console.log(createdByIdentifierSelector(state, { id: 2 }));
// { id: 2, name: 'pineapple', color: 'yellow' }

console.log(allSelected(state));
// [{ id: 1, name: 'apple', color: 'red' }]
```

An object containing basic selectors to ease the manipulation of the Redux State data. For more information into the chosen convention for these and their usage, refer to the [selectors guide](./docs/tools/selectors.md).

#### Thunks

```javascript
const fetch = require('node-fetch');

export function myFruitCreateApi(fruit) {
  return fetch('https://my.api.com/fruits', { method: 'POST', body: JSON.stringify(fruit) });
}
```
```javascript
import createReduxCrud from 'redux-crud-essentials';
import { myFruitCreateApi } from './fruits/api';

const { thunks } = createReduxCrud({ entityName: 'fruits' });
const { makeCreateThunk } = thunks;

export const createFruitThunk = makeCreateThunk(myFruitCreateApi);
// ...Pass it with mapDispatchToProps to consume via Redux...
```

An object containing basic factories to construct quickly manageable CRUD thunks functions. For more information into the chosen convention for these and their usage, refer to the [thunks guide](./docs/tools/thunks.md).

## Version release
To publish a new release, it would be necessary to:
  - Be logged with an authorized account for the NPM repository.
  - Make sure that all tests are passing properly.

To execute the process, run:

```
  yarn release
```

## Contribute
To request/present an issue, please follow the guidelines presented in the [Contribution Guide](./docs/development/contributing.md).

## Credits
This idea was developed based on a suggestion given by [@rolilink](https://github.com/Rolilink).

## License
MIT