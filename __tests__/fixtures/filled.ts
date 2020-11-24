import { repeat } from 'ramda'
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
