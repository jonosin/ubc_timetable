import crypto from 'crypto'
import { CourseMeeting, MeetingDay, SectionType } from '../types'

const termMap: Record<number, string> = {
  2025: 'Term 1 — Winter 2025',
  2026: 'Term 2 — Winter 2026'
}

function termLabel(start: string) {
  const year = new Date(start).getFullYear()
  return termMap[year] || `Term ? — ${year}`
}

function inferSectionType(sectionId: string): SectionType {
  if (/^L/i.test(sectionId)) return 'Lecture'
  if (/^B|^R/i.test(sectionId)) return 'Lab'
  if (/^D|^T/i.test(sectionId)) return 'Discussion'
  return 'Other'
}

function parseDay(day: string): MeetingDay {
  const map: Record<string, MeetingDay> = {
    Mon: 'Mon',
    Tue: 'Tue',
    Wed: 'Wed',
    Thu: 'Thu',
    Fri: 'Fri'
  }
  return map[day as MeetingDay]
}

function toId(term: string, code: string, section: string, day: string, start: string) {
  return crypto.createHash('md5').update([term, code, section, day, start].join('|')).digest('hex')
}

export interface RawRow {
  subjectCode: string
  courseNumber: string
  courseTitle: string
  credits: number
  sectionId: string
  deliveryMode: 'In Person' | 'Online' | 'Hybrid'
  meetingDays: string
  startTime: string
  endTime: string
  buildingRoom: string
  startDate: string
  endDate: string
}

export function normalize(row: RawRow): CourseMeeting[] {
  const days = row.meetingDays.split(/\s+/).map(parseDay)
  const term = termLabel(row.startDate)
  return days.map(day => ({
    id: toId(term, row.subjectCode + row.courseNumber, row.sectionId, day, row.startTime),
    termLabel: term,
    subjectCode: row.subjectCode,
    courseNumber: row.courseNumber,
    courseTitle: row.courseTitle,
    credits: row.credits,
    sectionId: row.sectionId,
    sectionType: inferSectionType(row.sectionId),
    meetingDay: day,
    meetingStart: row.startTime,
    meetingEnd: row.endTime,
    buildingRoom: row.buildingRoom,
    deliveryMode: row.deliveryMode,
    startDateISO: row.startDate,
    endDateISO: row.endDate
  }))
}

export { termLabel }
