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

  #axis: 'row' | 'column'
  #boardWidth: number
  #boardHeight: number
  #solved: boolean = false

  constructor(public index: number, axis: 'row' | 'column', boardInfo: BoardInfo) {
    this.#axis = axis
    this.#boardWidth = boardInfo.width
    this.#boardHeight = boardInfo.height
    this.cells = new Proxy(boardInfo.cells, {
      get: (target, prop) => {
        const key = this.#toIndexOrKeyFor(axis, boardInfo, prop)
        if (typeof key === 'number') {
          return target[key]
        }

        // this is gross
        switch (prop) {
          case 'length':
            return this.length
          case 'forEach':
            return this.#forEach
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

  get length(): number {
    return this.#axis === 'row' ? this.#boardWidth : this.#boardHeight
  }

  get solved(): boolean {
    if (!this.#solved) {
      this.#solved = this.cells.every(compose(not, equals(Cell.Unknown)))
    }

    return this.#solved
  }

  #forEach = (cb: (cell: Cell, index: number) => void): void => {
    for (let i = 0; i < this.length; i++) {
      cb(this.cells[i], i)
    }
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
