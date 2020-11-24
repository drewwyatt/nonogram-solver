import { repeat } from 'ramda'
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
