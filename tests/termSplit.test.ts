import test from 'node:test'
import assert from 'node:assert'
import { termLabel } from '../lib/pdf/normalize'

test('term mapping', () => {
  assert.equal(termLabel('2025-09-02'), 'Term 1 — Winter 2025')
  assert.equal(termLabel('2026-01-10'), 'Term 2 — Winter 2026')
})
