export type Hint = number[] & { __type: 'hint' }

class InvalidHintError extends Error {
  constructor(value: unknown) {
    super(`Hints must be integers >= 0, found: "${JSON.stringify(value)}"`)
  }
}

const hint = (...numbers: number[]) => {
  const illegal = numbers.filter(n => n < 0)
  if (illegal.length) {
    throw new InvalidHintError(illegal)
  }

  return numbers as Hint
}
export default hint
