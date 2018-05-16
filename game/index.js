import { Map } from "immutable";

let board = Map();

const move = function(turn, [row, col]) {
  return { type: "MOVE", position: [row, col], turn: turn };
};

export default function gameReducer(state = { winner: null, turn: "X", board }, action) {
  if (action.type === "MOVE") {
    state.board = state.board.setIn(action.position, state.turn);
    return state.turn === "X"
      ? { turn: "O", board: state.board }
      : { turn: "X", board: state.board };
  } else {
    return state;
  }
}

// Winner function
const winner = board => {
  const row0 = streak(board, [0, 0], [0, 1], [0, 2]);
  const row1 = streak(board, [1, 0], [1, 1], [1, 2]);
  const row2 = streak(board, [2, 0], [2, 1], [2, 2]);
  const col0 = streak(board, [0, 0], [1, 0], [2, 0]);
  const col1 = streak(board, [0, 1], [1, 1], [2, 1]);
  const col2 = streak(board, [0, 2], [1, 2], [2, 2]);
  const diag1 = streak(board, [0, 0], [1, 1], [2, 2]);
  const diag2 = streak(board, [2, 0], [1, 1], [0, 2]);

  const checkerArr = [row0, row1, row2, col0, col1, col2, diag1, diag2];

  const winningLetter = checkerArr.filter(letter => letter);

  if (winningLetter) return winningLetter;

  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c <= 2; c++) {
      if (board.getIn([r, c]) === "_") return null;
    }
  }
  return "draw";
};

// Streak helper function
const streak = (board, firstCoord, secondCoord, thirdCoord) => {
  const firstGet = board.getIn(firstCoord);
  const secondGet = board.getIn(secondCoord);
  const thirdGet = board.getIn(thirdCoord);

  if (firstGet === secondGet && firstGet === thirdGet) {
    return firstGet;
  } else {
    return undefined;
  }
};

export { move, winner };
