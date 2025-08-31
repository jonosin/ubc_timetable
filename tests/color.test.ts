import test from 'node:test'
import assert from 'node:assert'
import { colorFor } from '../lib/schedule/color'

test('color hashing stable', () => {
  const a1 = colorFor('ECON','326')
  const a2 = colorFor('ECON','326')
  const b = colorFor('MATH','200')
  assert.equal(a1.base, a2.base)
  assert.notEqual(a1.base, b.base)
})
