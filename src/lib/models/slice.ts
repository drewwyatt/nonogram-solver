import Cell from './cell'
import { Hint } from './hint'

type BoardInfo = {
  cells: Cell[]
  hints: Hint[]
  width: number
}

class Slice {
  cells: Cell[]
  readonly hint: Hint

  constructor(public index: number, public axis: 'row' | 'column', boardInfo: BoardInfo) {
    this.cells = new Proxy(boardInfo.cells, {
      get: (target, prop) => {
        return target[this.#toIndexFor(axis, boardInfo, prop)]
      },
      set: (target, prop, value: Cell) => {
        const index = this.#toIndexFor(axis, boardInfo, prop)
        if (index < 0 || index >= boardInfo.cells.length) {
          return false
        }

        target[index] = value
        return true
      },
    })
    this.hint = boardInfo.hints[index]
  }

  #toIndexFor = (axis: 'row' | 'column', { width }: BoardInfo, sliceIndex: unknown) =>
    axis === 'row'
      ? this.#toSliceIndex(sliceIndex) + width * this.index
      : this.#toSliceIndex(sliceIndex) * width + this.index

  #toSliceIndex = (prop: unknown) => {
    const index = Number(prop)
    if (Number.isNaN(index)) {
      throw new Error('TODO')
    }

    return index
  }
}

export default Slice
