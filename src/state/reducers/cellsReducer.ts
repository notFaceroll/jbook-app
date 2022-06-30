import { Action } from "../actions";
import { ActionType } from "../action-types";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,

  // both empty because we don't
  // have any cells or data
  order: [],
  data: {},
};

const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        // return an obj with all props
        ...state,
        // modify the data prop
        data: {
          // spread all data props
          ...state.data,
          // select the cell by id
          [id]: {
            // spred cell id data
            ...state.data[id],
            // change the content
            content,
          },
        },
      };
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};

export default reducer;
