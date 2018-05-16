import { Map } from "immutable";

let board = Map();

const move = function(turn, [row, col]) {
  return { type: "MOVE", position: [row, col], turn: turn };
};

export default function gameReducer(state = { turn: "X", board }, action) {
  if (action.type === "MOVE") {
    state.board = state.board.setIn(action.position, state.turn);
    return state.turn === "X"
      ? { turn: "O", board: state.board }
      : { turn: "X", board: state.board };
  } else {
    return state;3
  }
}

export { move };
