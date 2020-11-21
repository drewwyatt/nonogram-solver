import { InvalidFormat } from '~/errors/hint-errors'

export type Hint = number[] & { __type: 'hint' }

const hint = (...numbers: number[]) => {
  const illegal = numbers.filter(n => n < 0)
  if (illegal.length) {
    throw new InvalidFormat(illegal)
  }

  return numbers as Hint
}
export default hint
