import {Map} from 'immutable'

let board = Map()
const MOVE = 'MOVE'

const move1 = function(turn, [row, col]) {
  console.log('in moveCreator')
  return {type: MOVE, position: [row, col], turn: turn}
}


export default function gameReducer(state={turn:'X', board}, action) {
  switch(action.type) {
    case MOVE:
      state.board.setIn(action.position, state.turn)
      if (state.turn === 'X') {
        console.log('in switch', state.turn)
        return {turn: 'Y', board}
      } else {
        return {turn: 'X', board}
      }
    default:
      return state
  }
}

export {move1}
