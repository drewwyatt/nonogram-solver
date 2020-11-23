import { repeat } from 'ramda'
import Cell from './cell'
import hint from './hint'
import Slice from './slice'

describe('slice', () => {
  /**
   *  0, 1, 2, 3, 4
   *  5, 6, 7, 8, 9
   * 10,11,12,13,14
   */
  const width = 5
  const hints = repeat(hint(1, 2, 3), width)

  let cells: Cell[]
  let slice1: Slice
  let slice2: Slice

  describe('shared dataset', () => {
    beforeEach(() => {
      cells = repeat(Cell.Unknown, 15)
      slice1 = new Slice(1, 'row', { cells, hints, width }) // 5, 6, 7, 8, 9
      slice2 = new Slice(1, 'column', { cells, hints, width }) // 1, 6, 11
    })

    it('starts the same', () => {
      expect(slice1.cells[1]).toEqual(cells[6])
      expect(slice2.cells[0]).toEqual(cells[0])
    })

    it('updates slice data', () => {
      slice1.cells[1] = Cell.Filled
      slice2.cells[0] = Cell.Unfilled

      expect(slice1.cells[1]).toEqual(Cell.Filled)
      expect(slice2.cells[0]).toEqual(Cell.Unfilled)
    })

    // TODO: this looks to be a fixture issue but is covered in board tests
    it.skip('updates the base dataset', () => {
      slice1.cells[1] = Cell.Filled
      slice2.cells[0] = Cell.Unfilled

      expect(slice1.cells[1]).toEqual(cells[6])
      expect(slice2.cells[0]).toEqual(cells[0])
    })

    it('updates the other slice', () => {
      slice1.cells[1] = Cell.Filled

      expect(slice1.cells[1]).toEqual(slice2.cells[1])
    })
  })
})

export {}
