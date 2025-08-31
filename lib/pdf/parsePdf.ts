import { getDocument } from 'pdfjs-dist'
import { Tesseract } from 'tesseract.js'
import { z } from 'zod'
import { normalize, RawRow } from './normalize'
import { CourseMeeting } from '../types'

const RowSchema = z.object({
  subjectCode: z.string(),
  courseNumber: z.string(),
  courseTitle: z.string(),
  credits: z.number(),
  sectionId: z.string(),
  deliveryMode: z.string(),
  meetingDays: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  buildingRoom: z.string(),
  startDate: z.string(),
  endDate: z.string()
})

export async function parsePdf(buffer: Buffer) {
  let text = await extractWithPdfjs(buffer)
  if (!text.trim()) text = await extractWithOcr(buffer)
  const rows = parseRows(text)
  const meetings: CourseMeeting[] = []
  const invalid: RawRow[] = []
  for (const r of rows) {
    try {
      const parsed = RowSchema.parse(r)
      meetings.push(...normalize(parsed))
    } catch {
      invalid.push(r)
    }
  }
  return { meetings, invalid }
}

async function extractWithPdfjs(buffer: Buffer) {
  try {
    const pdf = await getDocument({ data: buffer }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((it: any) => it.str).join('\n')
    }
    return text
  } catch {
    return ''
  }
}

async function extractWithOcr(buffer: Buffer) {
  try {
    const res = await Tesseract.recognize(buffer)
    return res.data.text
  } catch {
    return ''
  }
}

function parseRows(text: string): RawRow[] {
  const lines = text.trim().split(/\n+/)
  return lines.filter(l => l.trim()).map(line => {
    const [subjectCode, courseNumber, courseTitle, credits, sectionId, deliveryMode, meetingDays, startTime, endTime, buildingRoom, startDate, endDate] = line.split(/,\s*/)
    return {
      subjectCode,
      courseNumber,
      courseTitle,
      credits: Number(credits),
      sectionId,
      deliveryMode: deliveryMode as any,
      meetingDays,
      startTime,
      endTime,
      buildingRoom,
      startDate,
      endDate
    }
  })
}
