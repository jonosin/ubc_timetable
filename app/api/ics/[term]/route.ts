import { NextRequest, NextResponse } from 'next/server'
import { readSchedule } from '../../../../lib/schedule/store'
import { generateICS } from '../../../../lib/export/ics'

export async function GET(_: NextRequest, { params }: { params: { term: string } }) {
  const term = decodeURIComponent(params.term)
  const schedule = (await readSchedule()).filter(m => m.termLabel === term)
  const ics = generateICS(term, schedule)
  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': `attachment; filename="${term}.ics"`
    }
  })
}
