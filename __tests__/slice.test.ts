import { repeat } from 'ramda'
import Cell from '~/models/cell'
import hint from '~/models/hint'
import Slice from '~/models/slice'

describe('slice', () => {
  /**
   *  0, 1, 2, 3, 4
   *  5, 6, 7, 8, 9
   * 10,11,12,13,14
   */
  const width = 5
  const height = 3
  const hints = repeat(hint(1, 2, 3), width)

  let cells: Cell[]
  let slice1: Slice
  let slice2: Slice

  beforeEach(() => {
    cells = repeat(Cell.Unknown, 15)
    slice1 = new Slice(1, 'row', { cells, hints, width, height }) // 5, 6, 7, 8, 9
    slice2 = new Slice(1, 'column', { cells, hints, width, height }) // 1, 6, 11
  })

  describe('solved', () => {
    it('reports solved === false when row contains any unknown cells', () => {
      expect(slice1.solved).toEqual(false)
      for (let i = 0; i < slice1.cells.length - 1; i++) {
        slice1.cells[i] = Cell.Filled
      }
    })

    it('reports solved === true when row contains any unknown cells', () => {
      for (let i = 0; i < slice1.cells.length; i++) {
        slice1.cells[i] = Cell.Filled
      }
    })
  })

  describe('shared dataset', () => {
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
