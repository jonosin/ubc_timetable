import { CourseMeeting } from '../types'

const VTIMEZONE = `BEGIN:VTIMEZONE\nTZID:America/Vancouver\nBEGIN:DAYLIGHT\nTZOFFSETFROM:-0800\nTZOFFSETTO:-0700\nTZNAME:PDT\nDTSTART:19700308T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZOFFSETFROM:-0700\nTZOFFSETTO:-0800\nTZNAME:PST\nDTSTART:19701101T020000\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\nEND:STANDARD\nEND:VTIMEZONE`

export function generateICS(name: string, meetings: CourseMeeting[]) {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ubc timetable//',
    `X-WR-CALNAME:${name}`,
    VTIMEZONE
  ]
  for (const m of meetings) {
    const start = m.startDateISO.replace(/-/g, '') + 'T' + m.meetingStart.replace(':', '') + '00'
    const end = m.startDateISO.replace(/-/g, '') + 'T' + m.meetingEnd.replace(':', '') + '00'
    lines.push('BEGIN:VEVENT')
    lines.push(`UID:${m.id}`)
    lines.push(`SUMMARY:${m.subjectCode} ${m.courseNumber} ${m.sectionType}`)
    lines.push(`DTSTART;TZID=America/Vancouver:${start}`)
    lines.push(`DTEND;TZID=America/Vancouver:${end}`)
    lines.push(`LOCATION:${m.buildingRoom}`)
    lines.push('END:VEVENT')
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}
