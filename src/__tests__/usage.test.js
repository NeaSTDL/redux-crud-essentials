import createReduxCrud from '..';

const testState = {};

beforeEach(() => {
  testState.fruits = {
    entities: {
      1: {id: 1, name: 'pear', color: 'greem'},
      2: {id: 2, name: 'apple', color: 'red'},
      3: {id: 3, name: 'banana', color: 'yellow'}
    }
  };
});

describe('About the Redux CRUD factory actions/reducer usage.', () => {
  const createEssentialsFor = createReduxCrud('nimbus9');

  test('That the CREATE action works together with the target reducer on an object input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers
    } = createEssentialsFor('fruits');
    expect(
      reducers(
        testState.fruits,
        actions.create({
          id: 4,
          name: 'orange',
          color: 'orange'
        })
      )
    ).toEqual({
      entities: {
        1: {id: 1, name: 'pear', color: 'greem'},
        2: {id: 2, name: 'apple', color: 'red'},
        3: {id: 3, name: 'banana', color: 'yellow'},
        4: {id: 4, name: 'orange', color: 'orange'}
      }
    });
  });

  test('That the CREATE action works together with the target reducer on an array input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers
    } = createEssentialsFor('fruits');
    expect(
      reducers(
        testState.fruits,
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
      entities: {
        1: {id: 1, name: 'pear', color: 'greem'},
        2: {id: 2, name: 'apple', color: 'red'},
        3: {id: 3, name: 'banana', color: 'yellow'},
        4: {id: 4, name: 'orange', color: 'orange'},
        5: {id: 5, name: 'kiwi', color: 'brown'}
      }
    });
  });

  test('That the UPDATE action works together with the target reducer on an object input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers
    } = createEssentialsFor('fruits');
    expect(
      reducers(
        testState.fruits,
        actions.update({
          id: 1,
          name: 'pear',
          color: 'green'
        })
      )
    ).toEqual({
      entities: {
        1: {id: 1, name: 'pear', color: 'green'},
        2: {id: 2, name: 'apple', color: 'red'},
        3: {id: 3, name: 'banana', color: 'yellow'}
      }
    });
  });

  test('That the CREATE action works together with the target reducer on an array input.', () => {
    const {
      actionCreators: {
        nimbus9: {fruits: actions}
      },
      reducers
    } = createEssentialsFor('fruits');
    expect(
      reducers(
        testState.fruits,
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
      entities: {
        1: {id: 1, name: 'pear', color: 'green'},
        2: {id: 2, name: 'apple', color: 'yellow'},
        3: {id: 3, name: 'banana', color: 'yellow'}
      }
    });
  });

  test('That the DELETE action works together with the target reducer on an object input.', () => {
    const {actionCreators: actionsFor, reducers} = createEssentialsFor(
      'fruits'
    );
    expect(
      reducers(
        testState.fruits,
        actionsFor.nimbus9.fruits.delete({
          id: 1,
          name: 'pear',
          color: 'greem'
        })
      )
    ).toEqual({
      entities: {
        2: {id: 2, name: 'apple', color: 'red'},
        3: {id: 3, name: 'banana', color: 'yellow'}
      }
    });
  });

  test('That the DELETE action works together with the target reducer on an array input.', () => {
    const {actionCreators: actionsFor, reducers} = createEssentialsFor(
      'fruits'
    );
    expect(
      reducers(
        testState.fruits,
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
      entities: {
        3: {id: 3, name: 'banana', color: 'yellow'}
      }
    });
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
