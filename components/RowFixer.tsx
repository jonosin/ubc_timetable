'use client'
import React from 'react'
import { CourseMeeting } from '../lib/types'

export default function RowFixer({ meeting, onChange }: { meeting: CourseMeeting, onChange: (m: CourseMeeting) => void }) {
  const update = (field: keyof CourseMeeting, value: string) => {
    onChange({ ...meeting, [field]: value } as CourseMeeting)
  }
  return (
    <div className="grid grid-cols-4 gap-2 border p-2">
      <input value={meeting.subjectCode} onChange={e => update('subjectCode', e.target.value)} className="border p-1" />
      <input value={meeting.courseNumber} onChange={e => update('courseNumber', e.target.value)} className="border p-1" />
      <input value={meeting.meetingStart} onChange={e => update('meetingStart', e.target.value)} className="border p-1" />
      <input value={meeting.meetingEnd} onChange={e => update('meetingEnd', e.target.value)} className="border p-1" />
    </div>
  )
}
