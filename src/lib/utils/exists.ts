const exists = <T>(maybeNullish: T): maybeNullish is NonNullable<T> =>
  typeof maybeNullish !== 'undefined' && maybeNullish !== null

export default exists
