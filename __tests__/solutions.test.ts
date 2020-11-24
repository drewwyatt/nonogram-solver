import solve from '~/main'
import fixtures from './fixtures'

describe('solutions', () => {
  Object.keys(fixtures).forEach(key => {
    test(key, () => {
      const fixture = fixtures[key as keyof typeof fixtures]
      expect(solve(fixture.board).cells).toEqual(fixture.solution)
    })
  })
})
