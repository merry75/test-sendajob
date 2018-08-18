import { GET_LISTS, ADD_LIST } from "../constants";

export const getLists = () => ({
  type: GET_LISTS
});

export const addList = list => ({
  type: ADD_LIST,
  list
});

/* call from Component ListForm in "mapDispatchToProps" */
export function getListsAsync() {
  return dispatch => {
    dispatch(getLists());
  };
}

/* call from Component ListForm in "mapDispatchToProps" */
export function addListAsync(list) {
  return dispatch => {
    dispatch(addList(list));
  };
}
