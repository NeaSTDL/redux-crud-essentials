import {mockSave, mockRead, mockUpdate, mockDelete} from '../utils/db';

export const errorCreate = new Error('Create process failure.');
export const errorRead = new Error('Read process failure.');
export const errorUpdate = new Error('Update process failure.');
export const errorDelete = new Error('Delete process failure');

export const makeApi = ({error, process}) => async (data, isResolved) => {
  return isResolved ? Promise.resolve(process(data)) : Promise.reject(error);
};

export const apiCreate = makeApi({error: errorCreate, process: mockSave});
export const apiRead = makeApi({error: errorRead, process: mockRead});
export const apiUpdate = makeApi({error: errorUpdate, process: mockUpdate});
export const apiDelete = makeApi({error: errorDelete, process: mockDelete});
