import CalendarGrid from '../../../components/CalendarGrid'
import { readSchedule, termCredits } from '../../../lib/schedule/store'

interface Props { params: { term: string } }

export default async function TermPage({ params }: Props) {
  const term = decodeURIComponent(params.term)
  const schedule = (await readSchedule()).filter(m => m.termLabel === term)
  const credits = termCredits(schedule)[term] || 0
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{term}</h1>
        <a href={`/api/ics/${encodeURIComponent(term)}`} className="px-2 py-1 border rounded">Export ICS</a>
      </div>
      <div>Credits: {credits}</div>
      <CalendarGrid meetings={schedule} />
    </div>
  )
}
