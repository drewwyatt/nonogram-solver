import { equals, filter, repeat } from 'ramda'
import Board from '~/models/board'
import Cell from '~/models/cell'
import hint, { Hint } from '~/models/hint'

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
  const subject = (
    row: Hint[] = repeat(hint(0), width),
    column: Hint[] = repeat(hint(0), height),
  ) => new Board(row, column)

  describe('setup', () => {
    it('has the correct number of cells', () => {
      expect(subject().cells.length).toEqual(width * height)
    })

    it('sets all cells to an initial value of "unknown"', () => {
      expect(filter(equals(Cell.Unknown), subject().cells).length).toEqual(width * height)
    })

    it('has the configured number of rows', () => {
      expect(subject().rows.length).toEqual(width)
    })

    it('has the configured number of columns', () => {
      expect(subject().columns.length).toEqual(height)
    })

    it('does not throw if a hint is exactly the right size', () => {
      expect(() =>
        subject([
          ...repeat(hint(0), width - 1),
          hint(1, 1, 1), // 3 blocks + 2 empty spaces = 5
        ]),
      ).not.toThrowError()
    })

    it('throws if a hint is impossible (larger than the slice)', () => {
      expect(() =>
        subject([
          ...repeat(hint(0), width - 1),
          hint(1, 1, 1, 1), // 4 blocks + 3 empty spaces = 7
        ]),
      ).toThrowError()
    })
  })

  describe('cells', () => {
    let board: Board
    beforeEach(() => {
      board = subject()
    })

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

  describe('solved', () => {
    let board: Board
    beforeEach(() => {
      board = subject()
    })

    it('reports solved === false when any rows or columns are unsolved', () => {
      expect(board.solved).toEqual(false)
      for (let i = 0; i < board.cells.length - 1; i++) {
        board.cells[i] = Cell.Filled
      }
      expect(board.solved).toEqual(false)
    })

    it('reports solved === true when all rows and columns are solved', () => {
      expect(board.solved).toEqual(false)
      for (let i = 0; i < board.cells.length; i++) {
        board.cells[i] = Cell.Filled
      }
      expect(board.solved).toEqual(true)
    })
  })
})
