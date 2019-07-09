import createReduxCrud from '..';

const testState = {};

beforeEach(() => {
  testState.fruits = {
    entities: {
      1: {id: 1, name: 'pear', color: 'greem'},
      2: {id: 2, name: 'apple', color: 'red'},
      3: {id: 3, name: 'banana', color: 'yellow'}
    },
    selectedIds: []
  };
});

describe('About the Redux CRUD factory actions/reducer usage.', () => {
  const createEssentialsFor = createReduxCrud('nimbus9');

  test('That the CREATE action works together with the target reducer on an object input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {entitiesReducers}
    } = createEssentialsFor('fruits');
    expect(
      entitiesReducers(
        testState.fruits.entities,
        actions.create({
          id: 4,
          name: 'orange',
          color: 'orange'
        })
      )
    ).toEqual({
      1: {id: 1, name: 'pear', color: 'greem'},
      2: {id: 2, name: 'apple', color: 'red'},
      3: {id: 3, name: 'banana', color: 'yellow'},
      4: {id: 4, name: 'orange', color: 'orange'}
    });
  });

  test('That the CREATE action works together with the target reducer on an array input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {entitiesReducers}
    } = createEssentialsFor('fruits');
    expect(
      entitiesReducers(
        testState.fruits.entities,
        actions.create([
          {
            id: 4,
            name: 'orange',
            color: 'orange'
          },
          {
            id: 5,
            name: 'kiwi',
            color: 'brown'
          }
        ])
      )
    ).toEqual({
      1: {id: 1, name: 'pear', color: 'greem'},
      2: {id: 2, name: 'apple', color: 'red'},
      3: {id: 3, name: 'banana', color: 'yellow'},
      4: {id: 4, name: 'orange', color: 'orange'},
      5: {id: 5, name: 'kiwi', color: 'brown'}
    });
  });

  test('That the UPDATE action works together with the target reducer on an object input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {entitiesReducers}
    } = createEssentialsFor('fruits');
    expect(
      entitiesReducers(
        testState.fruits.entities,
        actions.update({
          id: 1,
          name: 'pear',
          color: 'green'
        })
      )
    ).toEqual({
      1: {id: 1, name: 'pear', color: 'green'},
      2: {id: 2, name: 'apple', color: 'red'},
      3: {id: 3, name: 'banana', color: 'yellow'}
    });
  });

  test('That the UPDATE action works together with the target reducer on an array input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {entitiesReducers}
    } = createEssentialsFor('fruits');
    expect(
      entitiesReducers(
        testState.fruits.entities,
        actions.update([
          {
            id: 1,
            name: 'pear',
            color: 'green'
          },
          {
            id: 2,
            name: 'apple',
            color: 'yellow'
          }
        ])
      )
    ).toEqual({
      1: {id: 1, name: 'pear', color: 'green'},
      2: {id: 2, name: 'apple', color: 'yellow'},
      3: {id: 3, name: 'banana', color: 'yellow'}
    });
  });

  test('That the DELETE action works together with the target reducer on an object input.', () => {
    const {
      actionCreators: actionsFor,
      reducers: {entitiesReducers}
    } = createEssentialsFor('fruits');
    expect(
      entitiesReducers(
        testState.fruits.entities,
        actionsFor.nimbus9.fruits.delete({
          id: 1,
          name: 'pear',
          color: 'greem'
        })
      )
    ).toEqual({
      2: {id: 2, name: 'apple', color: 'red'},
      3: {id: 3, name: 'banana', color: 'yellow'}
    });
  });

  test('That the DELETE action works together with the target reducer on an array input.', () => {
    const {
      actionCreators: actionsFor,
      reducers: {entitiesReducers}
    } = createEssentialsFor('fruits');
    expect(
      entitiesReducers(
        testState.fruits.entities,
        actionsFor.nimbus9.fruits.delete([
          {
            id: 1,
            name: 'pear',
            color: 'greem'
          },
          {
            id: 2,
            name: 'apple',
            color: 'red'
          }
        ])
      )
    ).toEqual({
      3: {id: 3, name: 'banana', color: 'yellow'}
    });
  });

  test(`That the ADD_SELECTED action works together with the target reducer on an object input.
  `, () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {selectedIdsReducers}
    } = createEssentialsFor('fruits');
    expect(
      selectedIdsReducers(
        [],
        actions.addSelected({id: 1, name: 'pear', color: 'greem'})
      )
    ).toEqual([1]);
  });

  test(`That the ADD_SELECTED action works together with the target reducer on an object input.
  `, () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {selectedIdsReducers}
    } = createEssentialsFor('fruits');
    expect(
      selectedIdsReducers(
        [1, 2],
        actions.addSelected({id: 3, name: 'banana', color: 'yellow'})
      )
    ).toEqual([1, 2, 3]);
    expect(
      selectedIdsReducers(
        [1, 2],
        actions.addSelected({id: 3, name: 'banana', color: 'yellow'}, 'start')
      )
    ).toEqual([3, 1, 2]);
  });

  test(`That the ADD_SELECTED action works together with the target reducer on an array input.
  `, () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {selectedIdsReducers}
    } = createEssentialsFor('fruits');
    expect(
      selectedIdsReducers(
        [1, 2],
        actions.addSelected([
          {
            id: 3,
            name: 'banana',
            color: 'yellow'
          },
          {
            id: 4,
            name: 'orange',
            color: 'orange'
          }
        ])
      )
    ).toEqual([1, 2, 3, 4]);
    expect(
      selectedIdsReducers(
        [1, 2],
        actions.addSelected(
          [
            {
              id: 3,
              name: 'banana',
              color: 'yellow'
            },
            {
              id: 4,
              name: 'orange',
              color: 'orange'
            }
          ],
          'start'
        )
      )
    ).toEqual([3, 4, 1, 2]);
  });

  test(`That the REMOVE_SELECTED action works together with the target reducer on an object input.
  `, () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {selectedIdsReducers}
    } = createEssentialsFor('fruits');
    expect(
      selectedIdsReducers(
        [1, 2, 3],
        actions.removeSelected({id: 3, name: 'banana', color: 'yellow'})
      )
    ).toEqual([1, 2]);
  });

  test(`That the REMOVE_SELECTED action works together with the target reducer on an array input.
  `, () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers: {selectedIdsReducers}
    } = createEssentialsFor('fruits');
    expect(
      selectedIdsReducers(
        [1, 2, 3, 4],
        actions.removeSelected([
          {
            id: 3,
            name: 'banana',
            color: 'yellow'
          },
          {
            id: 4,
            name: 'orange',
            color: 'orange'
          }
        ])
      )
    ).toEqual([1, 2]);
  });
});

describe('About the Redux CRUD factory selector usage.', () => {
  const createEssentialsFor = createReduxCrud('nimbus9');

  test('That the ALL selector works as intended with the target reducer', () => {
    const {selectors: ofFruitsSelect} = createEssentialsFor('fruits');
    expect(ofFruitsSelect.all(testState)).toEqual([
      {id: 1, name: 'pear', color: 'greem'},
      {id: 2, name: 'apple', color: 'red'},
      {id: 3, name: 'banana', color: 'yellow'}
    ]);
  });
});
