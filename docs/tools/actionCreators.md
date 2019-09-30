# Action Creators <!-- omit in toc -->

On Redux terminology, the `action creators` are functions used to construct `actions`, which are objects that follow an specific format, containing: 
* Their `type`(also referred as `action type`).
* (***OPTIONAL***) Their `payload` (which is any kind of data given as an input to perform the action).
* (***OPTIONAL***) Their `meta` (which contains raw details about the action).

For this Redux schema, a set of pre-constructed actionCreators are exposed to allow the management of your Redux CRUD implementation.

## Table of contents <!-- omit in toc -->

- [Format](#Format)
- [Usage](#Usage)
- [List of Action Creators](#List-of-Action-Creators)
  - [For ***entities*** store](#For-entities-store)
    - [***create***(*entitySet*)](#createentitySet)
    - [***read***(*entitySet*)](#readentitySet)
    - [***update***(*entitySet*)](#updateentitySet)
    - [***delete***(*entitySet*)](#deleteentitySet)
  - [For ***selectedIds*** store](#For-selectedIds-store)
    - [***addSelected***(*entitySet*)](#addSelectedentitySet)
    - [***removeSelected***(*entitySet*)](#removeSelectedentitySet)
  - [For ***network*** store](#For-network-store)
    - [***setIsFetching***(*status*)](#setIsFetchingstatus)
    - [***setError***(*error*)](#setErrorerror)

## Format

The structure of a basic Redux action object is shown as follows:
```javascript
{
  type: [ACTION_TYPE],
  payload: [ACTION_PAYLOAD],
  meta: [ACTION_META]
}
```
By following this format, the action creators exposed by Redux CRUD factory will assemble their actions internally.

***NOTE***: Not all actions contain a `mete` property. 

## Usage

```javascript
import createReduxCrud from 'redux-crud-essentials';
const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const {
  create,
  read,
  update,
  delete: destroy,  // Renaming to not create conflict with JavaScript 'delete' keyword. 
  addSelected,
  removeSelected,
  setIsFetching,
  setError
} = animalActionCreators;
//...
```

Each action creator will expect an input when used that would contain an object entity:

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const newAnimal = { name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.create(newAnimal));
// {
//   type: 'animals/CREATE',
//   payload: { name: 'lion', isCarnivore: true }
// }
```

## List of Action Creators

### For ***entities*** store

#### ***create***(*entitySet*)

Sets a non-existent entity onto the target Redux Store.

| Parameter |   Type(s)    |                                                                                                                Description |
| :-------- | :----------: | -------------------------------------------------------------------------------------------------------------------------: |
| entitySet | object/array | A set of entities to add onto the Redux State. </br>It can be either a single entity object or an array of entity objects. |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const newAnimal = { name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.create(newAnimal));
// {
//   type: 'animals/CREATE',
//   payload: { name: 'lion', isCarnivore: true }
// }
```

#### ***read***(*entitySet*)


Sets a collection of fetched entities onto the target Redux Store.

| Parameter |   Type(s)    |                                                                                                                Description |
| :-------- | :----------: | -------------------------------------------------------------------------------------------------------------------------: |
| entitySet | object/array | A set of entities to add onto the Redux State. </br>It can be either a single entity object or an array of entity objects. |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const fetchedAnimal = { name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.read(fetchedAnimal));
// {
//   type: 'animals/READ',
//   payload: { name: 'lion', isCarnivore: true }
// }
```

#### ***update***(*entitySet*)

Sets a collection of fetched entities onto the target Redux Store.

| Parameter |   Type(s)    |                                                                                                                     Description |
| :-------- | :----------: | ------------------------------------------------------------------------------------------------------------------------------: |
| entitySet | object/array | A set of entities to add onto the Redux State. </br>It can be either a single entity object or an array of entity objects. |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const updatedAnimal = { name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.update(updatedAnimal));
// {
//   type: 'animals/UPDATE',
//   payload: { name: 'lion', isCarnivore: true }
// }
```

#### ***delete***(*entitySet*)

Sets a collection of fetched entities onto the target Redux Store.

| Parameter |   Type(s)    |                                                                                                           Description |
| :-------- | :----------: | --------------------------------------------------------------------------------------------------------------------: |
| entitySet | object/array | A set of entities to add onto the Redux State. </br>It can be either a single entity object or an array of entity objects. |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const updatedAnimal = { name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.update(updatedAnimal));
// {
//   type: 'animals/UPDATE',
//   payload: { name: 'lion', isCarnivore: true }
// }
```

### For ***selectedIds*** store

#### ***addSelected***(*entitySet*)

Sets a collection of entities on the selectedIds store list.

| Parameter |   Type(s)    |                                                                                                                                                       Description |
| :-------- | :----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| entitySet | object/array | A set of entities to add onto the Redux State. </br>It can be either a single entity object or an array of entity objects. It MUST contain an IDENTIFIER property |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const selectedAnimal = { id: 1, name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.addSelected(selectedAnimal));
// {
//   type: 'animals/ADD_SELECTED',
//   payload: [1]
// }
```

#### ***removeSelected***(*entitySet*)

Removes a collection of entities on the selectedIds store list.

| Parameter |   Type(s)    |                                                                                                                                                       Description |
| :-------- | :----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| entitySet | object/array | A set of entities to add onto the Redux State. </br>It can be either a single entity object or an array of entity objects. It MUST contain an IDENTIFIER property |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const removedAnimal = { id: 1, name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.removeSelected(removedAnimal));
// {
//   type: 'animals/REMOVE_SELECTED',
//   payload: [1]
// }
```

### For ***network*** store

Removes a collection of entities on the selectedIds store list.

| Parameter |   Type(s)    |                                                                                                                                                       Description |
| :-------- | :----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| entitySet | object/array | A set of entities to add onto the Redux State. </br>It can be either a single entity object or an array of entity objects. It MUST contain an IDENTIFIER property |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
const removedAnimal = { id: 1, name: 'lion', isCarnivore: 'true' };
console.log(animalActionCreators.removeSelected(removedAnimal));
// {
//   type: 'animals/REMOVE_SELECTED',
//   payload: [1]
// }
```

#### ***setIsFetching***(*status*)

Sets the status for the network processing for a Redux Store

| Parameter | Type(s) |                                            Description |
| :-------- | :-----: | -----------------------------------------------------: |
| status    |  bool   | A true/false value to describe current network status. |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
console.log(animalActionCreators.setIsFetching(true));
// {
//   type: 'animals/SET_IS_FETCHING',
//   payload: true
// }
```

#### ***setError***(*error*)

Sets the status for the network processing for a Redux Store

| Parameter | Type(s) |                                            Description |
| :-------- | :-----: | -----------------------------------------------------: |
| status    |  bool   | A true/false value to describe current network status. |

```javascript
import createReduxCrud from 'redux-crud-essentials';

const { actionCreators: animalActionCreators } = createReduxCrud({ entityName: 'animals' });
console.log(animalActionCreators.setError(new Error()));
// {
//   type: 'animals/SET_IS_FETCHING',
//   payload: true
// }
```