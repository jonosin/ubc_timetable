import test from 'node:test'
import assert from 'node:assert'
import { parsePdf } from '../lib/pdf/parsePdf'

test('parsePdf extracts columns and times', async () => {
  const csv = 'ECON,326,Intro,3,L02,In Person,Tue,14:00,15:30,BUCH B208,2025-09-02,2025-12-03'
  const { meetings } = await parsePdf(Buffer.from(csv))
  assert.equal(meetings[0].meetingStart, '14:00')
  assert.equal(meetings[0].meetingEnd, '15:30')
  assert.equal(meetings[0].subjectCode, 'ECON')
})
