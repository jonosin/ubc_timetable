'use client'
import React from 'react'
import { CourseMeeting } from '../lib/types'
import { colorFor } from '../lib/schedule/color'

const days: ('Mon'|'Tue'|'Wed'|'Thu'|'Fri')[] = ['Mon','Tue','Wed','Thu','Fri']

export default function CalendarGrid({ meetings }: { meetings: CourseMeeting[] }) {
  return (
    <div className="grid grid-cols-5 gap-2 h-[600px]">
      {days.map(d => (
        <div key={d} className="relative border">
          {meetings.filter(m => m.meetingDay === d).map(m => {
            const { base, light } = colorFor(m.subjectCode, m.courseNumber)
            const top = timeToY(m.meetingStart)
            const height = timeToY(m.meetingEnd) - top
            const isSub = m.sectionType !== 'Lecture'
            return (
              <div key={m.id} className="absolute left-1 right-1 rounded p-1 text-xs overflow-hidden"
                style={{ top: `${top}%`, height: `${height}%`, backgroundColor: isSub ? light : base, border: isSub ? '1px dashed #333' : undefined, color: 'black' }}>
                <div className="font-bold">{m.subjectCode} {m.courseNumber} {m.sectionType}</div>
                <div>{m.buildingRoom}</div>
                <div>{m.meetingStart}–{m.meetingEnd}</div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function timeToY(time: string) {
  const [h, m] = time.split(':').map(Number)
  return ((h - 8) * 60 + m) / (12 * 60) * 100
}
