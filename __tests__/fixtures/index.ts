import Board from '~/models/board'
import * as filled from './filled'
import * as unfilled from './unfilled'

const toFixture = ({ rows, columns, solution }: typeof filled) => ({
  board: new Board(rows, columns),
  solution,
})

const fixtures = {
  filled: toFixture(filled),
  unfilled: toFixture(unfilled),
}

export default fixtures
