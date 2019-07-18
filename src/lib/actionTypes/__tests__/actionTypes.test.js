import actionTypesFor from '..';

describe('The "actionTypesFor" factory function', () => {
  it('returns a correct actionTypes set when given an entity name.', () => {
    expect(actionTypesFor('person')).toEqual({
      CREATE: 'person/CREATE',
      READ: 'person/READ',
      DELETE: 'person/DELETE',
      UPDATE: 'person/UPDATE',
      ADD_SELECTED: 'person/ADD_SELECTED',
      REMOVE_SELECTED: 'person/REMOVE_SELECTED',
      SET_ERROR: 'person/SET_ERROR',
      SET_IS_FETCHING: 'person/SET_IS_FETCHING'
    });
  });

  it('returns a correct actionTypes set when given an entity name and a namespace value.', () => {
    expect(actionTypesFor('account', 'organization')).toEqual({
      CREATE: 'organization/account/CREATE',
      READ: 'organization/account/READ',
      DELETE: 'organization/account/DELETE',
      UPDATE: 'organization/account/UPDATE',
      ADD_SELECTED: 'organization/account/ADD_SELECTED',
      REMOVE_SELECTED: 'organization/account/REMOVE_SELECTED',
      SET_ERROR: 'organization/account/SET_ERROR',
      SET_IS_FETCHING: 'organization/account/SET_IS_FETCHING'
    });
  });
});
