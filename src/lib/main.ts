import Board from './models/board'
import Cell from './models/cell'
import Slice from './models/slice'

const MAX_LOOPS = 10 // extremely low because fixtures are simple (for now)

const solveSlice = (slice: Slice) => {
  for (let clue of slice.hint) {
    if (clue === 0) {
      // empty slice
      slice.cells.forEach((_, idx) => {
        slice.cells[idx] = Cell.Unfilled
      })
    }
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
