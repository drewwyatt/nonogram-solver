import { propEq, repeat, sum, times } from 'ramda'
import { ImpossibleHintError } from '~/errors/hint-errors'
import { Hint } from './hint'
import Cell from './cell'
import Slice from './slice'

class Board {
  cells: Cell[]
  rows: Slice[]
  columns: Slice[]

  readonly width: number
  readonly height: number

  #rowHints: Hint[]
  #columnHints: Hint[]

  constructor(rows: Hint[], columns: Hint[]) {
    this.#assertValidHints(rows, columns)
    this.#rowHints = rows
    this.#columnHints = columns

    this.width = columns.length
    this.height = rows.length

    this.cells = repeat(Cell.Unknown, this.width * this.height)
    this.rows = times(
      idx =>
        new Slice(idx, 'row', {
          cells: this.cells,
          hints: this.#rowHints,
          width: this.width,
          height: this.height,
        }),
      this.height,
    )
    this.columns = times(
      idx =>
        new Slice(idx, 'column', {
          cells: this.cells,
          hints: this.#columnHints,
          width: this.width,
          height: this.height,
        }),
      this.width,
    )
  }

  get solved(): boolean {
    return (
      this.rows.every(propEq('solved', true)) &&
      this.columns.every(propEq('solved', true))
    )
  }

  #assertValidHints = (rows: Hint[], columns: Hint[]) => {
    let impossibleHint = rows.find(this.#hintExceedsMaxSize(columns.length))
    if (impossibleHint) {
      throw new ImpossibleHintError('row', rows.length, impossibleHint)
    }

    impossibleHint = columns.find(this.#hintExceedsMaxSize(rows.length))
    if (impossibleHint) {
      throw new ImpossibleHintError('column', columns.length, impossibleHint)
    }
  }

  #hintExceedsMaxSize = (boardSize: number) => (hint: Hint) =>
    this.#toFootprint(hint) > boardSize

  #toFootprint = (hint: Hint) => sum(hint) + hint.length - 1
}

export default Board
