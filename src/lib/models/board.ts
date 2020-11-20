import { repeat } from 'ramda'
import Cell from './cell'
import hint, { Hint } from './hint'

class Board {
  public rowHints: Hint[]
  public columnHints: Hint[]
  public cells: Cell[]

  constructor(public width: number, public height: number) {
    this.rowHints = repeat(hint(0), width)
    this.columnHints = repeat(hint(0), height)
    this.cells = repeat(Cell.Blank, width * height)
  }
}

export default Board
