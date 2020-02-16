import { createTypeConstants } from '../factories';

describe('createTypeConstants', () => {
  it('creates map of types based on resource name', () => {
    const resourceName = 'products';
    const verbs = ['fetch'];
    const variations = ['one'];
    const expected = {
      FETCH_ONE_REQUESTED: 'products/FETCH_ONE_REQUESTED',
      FETCH_ONE_SUCCEEDED: 'products/FETCH_ONE_SUCCEEDED',
      FETCH_ONE_FAILED: 'products/FETCH_ONE_FAILED',
    };
    const actual = createTypeConstants(resourceName, verbs, variations);
    expect(actual).toEqual(expected);
  });

  it('creates map of types based on resource name and defaults', () => {
    const resourceName = 'products';
    const expected = {
      FETCH_ONE_REQUESTED: 'products/FETCH_ONE_REQUESTED',
      FETCH_ONE_SUCCEEDED: 'products/FETCH_ONE_SUCCEEDED',
      FETCH_ONE_FAILED: 'products/FETCH_ONE_FAILED',

      FETCH_MANY_REQUESTED: 'products/FETCH_MANY_REQUESTED',
      FETCH_MANY_SUCCEEDED: 'products/FETCH_MANY_SUCCEEDED',
      FETCH_MANY_FAILED: 'products/FETCH_MANY_FAILED',

      UPDATE_ONE_REQUESTED: 'products/UPDATE_ONE_REQUESTED',
      UPDATE_ONE_SUCCEEDED: 'products/UPDATE_ONE_SUCCEEDED',
      UPDATE_ONE_FAILED: 'products/UPDATE_ONE_FAILED',

      UPDATE_MANY_REQUESTED: 'products/UPDATE_MANY_REQUESTED',
      UPDATE_MANY_SUCCEEDED: 'products/UPDATE_MANY_SUCCEEDED',
      UPDATE_MANY_FAILED: 'products/UPDATE_MANY_FAILED',

      CREATE_ONE_REQUESTED: 'products/CREATE_ONE_REQUESTED',
      CREATE_ONE_SUCCEEDED: 'products/CREATE_ONE_SUCCEEDED',
      CREATE_ONE_FAILED: 'products/CREATE_ONE_FAILED',

      CREATE_MANY_REQUESTED: 'products/CREATE_MANY_REQUESTED',
      CREATE_MANY_SUCCEEDED: 'products/CREATE_MANY_SUCCEEDED',
      CREATE_MANY_FAILED: 'products/CREATE_MANY_FAILED',

      DELETE_ONE_REQUESTED: 'products/DELETE_ONE_REQUESTED',
      DELETE_ONE_SUCCEEDED: 'products/DELETE_ONE_SUCCEEDED',
      DELETE_ONE_FAILED: 'products/DELETE_ONE_FAILED',

      DELETE_MANY_REQUESTED: 'products/DELETE_MANY_REQUESTED',
      DELETE_MANY_SUCCEEDED: 'products/DELETE_MANY_SUCCEEDED',
      DELETE_MANY_FAILED: 'products/DELETE_MANY_FAILED',
    };
    const actual = createTypeConstants(resourceName);
    expect(actual).toEqual(expected);
  });
});
