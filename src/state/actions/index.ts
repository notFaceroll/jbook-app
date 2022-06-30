import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

// Here we have interfaces that describes
// actions that will eventually be dispatched
// by one of the action-creators
// and processed by one of the reducers
export type Direction = "up" | "down";
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}
export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;
