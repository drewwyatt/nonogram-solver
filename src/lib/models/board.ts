import { repeat, times } from 'ramda'
import { InvalidLength } from '~/errors/hint-errors'
import hint, { Hint } from './hint'
import { exists } from '~/utils'
import Cell from './cell'
import Slice from './slice'

type Config = {
  hints?: { row: Hint[]; column: Hint[] }
}

class Board {
  cells: Cell[]
  rows: Slice[]
  columns: Slice[]

  #rowHints: Hint[]
  #columnHints: Hint[]

  constructor(public width: number, public height: number, config: Config = {}) {
    this.#assertValidHints({ width, height }, config.hints)
    this.#rowHints = config.hints?.row ?? this.#toDefaultHints(width)
    this.#columnHints = config.hints?.column ?? this.#toDefaultHints(height)
    this.cells = repeat(Cell.Unknown, width * height)
    this.rows = times(
      idx => new Slice(idx, 'row', { cells: this.cells, hints: this.#rowHints, width }),
      height,
    )
    this.columns = times(
      idx =>
        new Slice(idx, 'column', { cells: this.cells, hints: this.#columnHints, width }),
      width,
    )
  }

  #assertValidHints = (
    { width, height }: { width: number; height: number },
    hints: Config['hints'],
  ) => {
    if (exists(hints)) {
      if (hints.row.length !== width) {
        throw new InvalidLength('row', width, hints.row.length)
      }

      if (hints.column.length !== height) {
        throw new InvalidLength('column', height, hints.column.length)
      }
    }
  }

  #toDefaultHints = (size: number) => repeat(hint(0), size)
}

export default Board
