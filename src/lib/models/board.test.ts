import { equals, filter } from 'ramda'
import Board from './board'
import Cell from './cell'

/**
 *  0, 1, 2, 3, 4
 *  5, 6, 7, 8, 9
 * 10,11,12,13,14
 * 15,16,17,18,19
 * 20,21,22,23,24
 */
const width = 5
const height = 5

describe('Board', () => {
  let board: Board

  beforeEach(() => {
    board = new Board(width, height)
  })

  describe('setup', () => {
    it('has the correct number of cells', () => {
      expect(board.cells.length).toEqual(width * height)
    })

    it('sets all cells to an initial value of "unknown"', () => {
      expect(filter(equals(Cell.Unknown), board.cells).length).toEqual(width * height)
    })

    it('has the configured number of rows', () => {
      expect(board.rows.length).toEqual(width)
    })

    it('has the configured number of columns', () => {
      expect(board.columns.length).toEqual(height)
    })

    it.todo('has the correct number of hints?')
  })

  describe('cells', () => {
    describe('rows', () => {
      it('reflects row updates in cells', () => {
        board.rows[1].cells[1] = Cell.Filled
        expect(board.cells[6]).toEqual(Cell.Filled)
      })
      it('reflects cell updates in affected row', () => {
        board.cells[13] = Cell.Unfilled
        expect(board.rows[2].cells[3]).toEqual(Cell.Unfilled)
      })
    })

    describe('columns', () => {
      it('reflects column updates in cells', () => {
        board.columns[3].cells[1] = Cell.Unfilled
        expect(board.cells[8]).toEqual(Cell.Unfilled)
      })
      it('reflects cell updates in affected row', () => {
        board.cells[4] = Cell.Filled
        expect(board.columns[4].cells[0]).toEqual(Cell.Filled)
      })
    })

    describe('rows/columns', () => {
      it('reflects row updates in affected column', () => {
        board.rows[4].cells[0] = Cell.Filled
        expect(board.columns[0].cells[4]).toEqual(Cell.Filled)
      })

      it('reflects column updates in affected row', () => {
        board.columns[4].cells[4] = Cell.Unfilled
        expect(board.rows[4].cells[4]).toEqual(Cell.Unfilled)
      })
    })
  })
})
