import { repeat, sum, times } from 'ramda'
import { ImpossibleHintError, InvalidLengthError } from '~/errors/hint-errors'
import { Hint } from './hint'
import Cell from './cell'
import Slice from './slice'

type Config = {
  hints: { row: Hint[]; column: Hint[] }
}

class Board {
  cells: Cell[]
  rows: Slice[]
  columns: Slice[]

  #rowHints: Hint[]
  #columnHints: Hint[]

  constructor(public width: number, public height: number, { hints }: Config) {
    this.#assertValidHints(hints)
    this.#rowHints = hints.row
    this.#columnHints = hints.column

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

  #assertValidHints = (hints: Config['hints']) => {
    if (hints.row.length !== this.width) {
      throw new InvalidLengthError('row', this.width, hints.row.length)
    }

    if (hints.column.length !== this.height) {
      throw new InvalidLengthError('column', this.height, hints.column.length)
    }

    let impossibleHint = hints.row.find(this.#hintExceedsMaxSize(this.width))
    if (impossibleHint) {
      throw new ImpossibleHintError('row', this.width, impossibleHint)
    }

    impossibleHint = hints.column.find(this.#hintExceedsMaxSize(this.height))
    if (impossibleHint) {
      throw new ImpossibleHintError('column', this.height, impossibleHint)
    }
  }

  #hintExceedsMaxSize = (boardSize: number) => (hint: Hint) =>
    this.#toFootprint(hint) > boardSize

  #toFootprint = (hint: Hint) => sum(hint) + hint.length - 1
}

export default Board
