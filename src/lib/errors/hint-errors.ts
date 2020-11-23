import NonogramError from './base'

abstract class HintError extends NonogramError {
  constructor(name: string, message: string) {
    super('Hint', name, message)
  }
}

export class InvalidFormatError extends HintError {
  constructor(value: unknown) {
    super(
      'Invalid Format',
      `Hints must be integers >= 0, found: "${JSON.stringify(value)}"`,
    )
  }
}

export class InvalidLengthError extends HintError {
  constructor(rowOrColumn: 'row' | 'column', expected: number, received: number) {
    super(
      'Invalid Length',
      `${rowOrColumn} size is ${expected}, received ${received} hints`,
    )
  }
}
