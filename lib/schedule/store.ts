import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { CourseMeeting } from '../types'

const scheduleFile = path.join(process.cwd(), 'data/schedule.json')
const changeFile = path.join(process.cwd(), 'data/changes.json')

export async function readSchedule(): Promise<CourseMeeting[]> {
  try {
    const data = await fs.readFile(scheduleFile, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function writeSchedule(meetings: CourseMeeting[]) {
  await fs.mkdir(path.dirname(scheduleFile), { recursive: true })
  await fs.writeFile(scheduleFile, JSON.stringify(meetings, null, 2))
}

function key(m: CourseMeeting) {
  return `${m.termLabel}|${m.subjectCode}|${m.courseNumber}|${m.sectionId}|${m.meetingDay}|${m.meetingStart}`
}

export async function mergeAndSave(incoming: CourseMeeting[]) {
  const existing = await readSchedule()
  const map = new Map(existing.map(m => [key(m), m]))
  const changes: string[] = []
  for (const meet of incoming) {
    const k = key(meet)
    if (map.has(k)) {
      const prev = map.get(k)!
      const diff: string[] = []
      for (const field of Object.keys(meet) as (keyof CourseMeeting)[]) {
        if (meet[field] !== prev[field]) diff.push(field)
      }
      if (diff.length) {
        map.set(k, meet)
        changes.push(`Updated ${k}: ${diff.join(', ')}`)
      }
    } else {
      map.set(k, meet)
      changes.push(`Added ${k}`)
    }
  }
  const merged = Array.from(map.values())
  await writeSchedule(merged)
  if (changes.length) await appendChanges(changes)
  return { merged, changes }
}

async function appendChanges(entries: string[]) {
  await fs.mkdir(path.dirname(changeFile), { recursive: true })
  const prev = await fs.readFile(changeFile, 'utf8').catch(() => '[]')
  const arr = JSON.parse(prev)
  arr.push(...entries)
  await fs.writeFile(changeFile, JSON.stringify(arr, null, 2))
}

export function termCredits(meetings: CourseMeeting[]) {
  const map: Record<string, number> = {}
  for (const m of meetings) {
    map[m.termLabel] = (map[m.termLabel] || 0) + m.credits
  }
  return map
}
