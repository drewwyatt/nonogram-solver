import { repeat } from 'ramda'
import Cell from '~/models/cell'
import hint from '~/models/hint'

//    0 0 0 0 0
//  ┌───────────┐
// 0│           │
// 0│           │
// 0│           │
// 0│           │
// 0│           │
//  └───────────┘

export const rows = repeat(hint(0), 5)
export const columns = repeat(hint(0), 5)
export const solution = repeat(Cell.Unfilled, 25)
