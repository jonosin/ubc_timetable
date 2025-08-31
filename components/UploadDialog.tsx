'use client'
import React, { useState } from 'react'
import { parsePdf } from '../lib/pdf/parsePdf'
import { mergeAndSave } from '../lib/schedule/store'
import RowFixer from './RowFixer'
import { CourseMeeting } from '../lib/types'

export default function UploadDialog() {
  const [review, setReview] = useState<CourseMeeting[]>([])

  async function handleFiles(list: FileList | null) {
    if (!list?.length) return
    const buf = Buffer.from(await list[0].arrayBuffer())
    const { meetings } = await parsePdf(buf)
    const { merged } = await mergeAndSave(meetings)
    const needsReview = merged.filter(m => !m.subjectCode)
    setReview(needsReview)
  }

  return (
    <div className="space-y-2">
      <input type="file" accept="application/pdf" onChange={e => handleFiles(e.target.files)} />
      {review.map(r => (
        <RowFixer key={r.id} meeting={r} onChange={() => {}} />
      ))}
    </div>
  )
}
