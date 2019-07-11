import {actionTypesFor} from '..';

describe('"actionTypesFor" factory function', () => {
  it('returns a correct actionTypes set when given an entity name.', () => {
    expect(actionTypesFor('person')).toEqual({
      ADD_SELECTED: 'person/ADD_SELECTED',
      CREATE: 'person/CREATE',
      DELETE: 'person/DELETE',
      REMOVE_SELECTED: 'person/REMOVE_SELECTED',
      UPDATE: 'person/UPDATE'
    });
  });

  it('returns a correct actionTypes set when given an entity name and a namespace value.', () => {
    expect(actionTypesFor('account', 'organization')).toEqual({
      ADD_SELECTED: 'organization/account/ADD_SELECTED',
      CREATE: 'organization/account/CREATE',
      DELETE: 'organization/account/DELETE',
      REMOVE_SELECTED: 'organization/account/REMOVE_SELECTED',
      UPDATE: 'organization/account/UPDATE'
    });
  });
});
