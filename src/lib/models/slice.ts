import { compose, equals, not } from 'ramda'
import Board from './board'
import Cell from './cell'
import { Hint } from './hint'

type BoardInfo = {
  cells: Cell[]
  hints: Hint[]
  height: number
  width: number
}

class Slice {
  cells: Cell[]
  readonly hint: Hint

  #solved: boolean = false

  constructor(public index: number, axis: 'row' | 'column', boardInfo: BoardInfo) {
    this.cells = new Proxy(boardInfo.cells, {
      get: (target, prop) => {
        const key = this.#toIndexOrKeyFor(axis, boardInfo, prop)
        if (typeof key === 'number') {
          return target[key]
        }

        // this is gross
        switch (prop) {
          case 'length':
            return axis === 'row' ? boardInfo.width : boardInfo.height
          default:
            return target[key]
        }
      },
      set: (target, prop, value: Cell) => {
        const index = this.#toIndexOrKeyFor(axis, boardInfo, prop)
        if (Number.isNaN(index) || index < 0 || index >= boardInfo.cells.length) {
          return false
        }

        target[index as number] = value
        return true
      },
    })
    this.hint = boardInfo.hints[index]
  }

  get solved(): boolean {
    if (!this.#solved) {
      this.#solved = this.cells.every(compose(not, equals(Cell.Unknown)))
    }

    return this.#solved
  }

  #toIndexOrKeyFor = (
    axis: 'row' | 'column',
    { width }: BoardInfo,
    prop: unknown,
  ): keyof BoardInfo['cells'] => {
    const sliceIndex = Number(prop)
    if (Number.isNaN(sliceIndex)) {
      return prop as keyof Board['cells']
    }

    return axis === 'row'
      ? sliceIndex + width * this.index
      : sliceIndex * width + this.index
  }
}

export default Slice
