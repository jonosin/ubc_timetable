import Link from 'next/link'
import UploadDialog from '../components/UploadDialog'
import { readSchedule } from '../lib/schedule/store'

export default async function Page() {
  const schedule = await readSchedule()
  const terms = Array.from(new Set(schedule.map(m => m.termLabel)))
  return (
    <main className="p-4 space-y-4">
      <UploadDialog />
      <div className="flex space-x-4">
        {terms.map(term => (
          <Link key={term} href={`/timetable/${encodeURIComponent(term)}`} className="underline">
            {term}
          </Link>
        ))}
      </div>
    </main>
  )
}
