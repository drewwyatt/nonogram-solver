import { repeat } from 'ramda'
import Cell from '~/models/cell'
import hint from '~/models/hint'

//    5 5 5 5 5
//  ┌───────────┐
// 5│ █ █ █ █ █ │
// 5│ █ █ █ █ █ │
// 5│ █ █ █ █ █ │
// 5│ █ █ █ █ █ │
// 5│ █ █ █ █ █ │
//  └───────────┘

export const rows = repeat(hint(5), 5)
export const columns = repeat(hint(5), 5)
export const solution = repeat(Cell.Filled, 25)
