enum Cell {
  /**
   * Initial state, can be filled or marked empty
   */
  Blank,
  Filled,
  /**
   * A "confirmed" empty cell (cannot be filled)
   */
  Empty,
}

export default Cell
