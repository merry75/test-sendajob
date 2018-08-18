import { GET_LISTS, ADD_LIST } from '../constants';

const initialState = { lists: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    /* Case works when add new data */
    case ADD_LIST: {
      return { ...state, lists: [...state.lists, action.list] };
    }
    /* Case works when get all data */
    case GET_LISTS: {
      return state;
    }
    /* By default shows all data or returns all data */
    default:
      return state;
  }
};
