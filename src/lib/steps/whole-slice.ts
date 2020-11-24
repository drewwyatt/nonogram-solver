// func solveWholeSliceIfPossible(_ slice: SliceView) {
//     let filledCount = slice.hints.reduce(0, +)
//     let requiredGaps = slice.hints.count - 1
//     guard slice.dimensionLength - requiredGaps == filledCount else {
//         return
//     }

//     let filledSegments = slice.hints.map { Array(repeating: Slot.filled, count: $0) }
//     let allSlots = Array(filledSegments.joined(separator: [.unfilled]))
//     zip(slice.indices, allSlots.indices).forEach { sliceIndex, slotIndex in
//         slice[sliceIndex] = allSlots[slotIndex]
//     }
// }

import { compose, flatten, intersperse, map, repeat, sum } from 'ramda'
import Cell from '~/models/cell'
import type { Hint } from '~/models/hint'
import type Step from './type'

const toCompletedRow = compose(
  flatten,
  intersperse(Cell.Unfilled),
  map(repeat(Cell.Filled)),
) as (hint: Hint) => Cell[]

const step: Step = slice => {
  const filledCount = sum(slice.hint)
  const gaps = slice.hint.length - 1
  if (slice.length - gaps === filledCount) {
    const solution = toCompletedRow(slice.hint)
    slice.cells.forEach((_, idx) => {
      slice.cells[idx] = solution[idx]
    })
  }
}

export default step
