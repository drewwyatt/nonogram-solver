import { repeat } from 'ramda'
import Cell from './cell'
import hint, { Hint } from './hint'

class Board {
  rowHints: Hint[]
  columnHints: Hint[]
  cells: Cell[]

  constructor(
    public width: number,
    public height: number,
    hints: { row?: Hint[]; column?: Hint[] } = {},
  ) {
    this.rowHints = this.#hintsAreValidForSize(width, hints.row)
      ? hints.row
      : this.#toDefaultHints(width)
    this.columnHints = this.#hintsAreValidForSize(height, hints.column)
      ? hints.column
      : this.#toDefaultHints(height)
    this.cells = repeat(Cell.Unknown, width * height)
  }

  #hintsAreValidForSize = (size: number, hints: Hint[] | undefined): hints is Hint[] =>
    hints?.length === size

  #toDefaultHints = (size: number) => repeat(hint(0), size)
}

export default Board
