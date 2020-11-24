import Board from './models/board'
import Cell from './models/cell'
import Slice from './models/slice'
import solveWhole from './steps/whole-slice'

const MAX_LOOPS = 10 // extremely low because fixtures are simple (for now)

const solveSlice = (slice: Slice) => {
  if (slice.hint.length === 1 && slice.hint[0] === 0) {
    // empty slice
    slice.cells.forEach((_, idx) => {
      slice.cells[idx] = Cell.Unfilled
    })
  } else {
    solveWhole(slice)
  }
}

const solve = (board: Board): Board => {
  let loops = 0
  while (!board.solved && loops < MAX_LOOPS) {
    board.rows.forEach(solveSlice)
    board.columns.forEach(solveSlice)

    loops++
  }

  return board
}

export default solve
