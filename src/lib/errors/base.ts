import { exists } from '~/utils'

abstract class NonogramError extends Error {
  readonly baseError = 'NONOGRAM'

  constructor(public domain: string, name: string, message?: string) {
    super()
    this.name = this.#toNamespacedString(name)
    this.message = exists(message) ? this.#toNamespacedString(message) : this.name
  }

  #toNamespacedString = (str: string) => `[${this.baseError}][${this.domain}] ${str}`
}

export const isNonogramError = (error: unknown): error is NonogramError =>
  error instanceof NonogramError

export default NonogramError
